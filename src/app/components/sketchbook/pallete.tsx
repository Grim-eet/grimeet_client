"use client";
import { KonvaEventObject } from "konva/lib/Node";
import { SketchbookTools } from "./tools";
import { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Line, Text as KonvaText, Rect } from "react-konva";
import React from "react";
import { Socket, io } from "socket.io-client";
import { throttle } from "lodash";

import pencil from "../../../../public/images/pencil.png";
import eraser from "../../../../public/images/eraser.png";
import brush from "../../../../public/images/brush.png";
import square from "../../../../public/images/square.png";
import text from "../../../../public/images/text.png";

interface ILine {
  tool: string;
  points: Array<number>;
  color?: string;
  strokeWidth?: number;
}

interface IText {
  tool: string;
  text: string;
  x: number;
  y: number;
  color?: string;
  fontSize?: number;
}

interface IRect {
  tool: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  strokeWidth?: number;
}

interface History {
  currentIdx: number;
  elements: Array<ILine | IText | IRect>;
}

interface BaseEmitData {
  type: "painting" | "startPaint" | "undo" | "redo" | "addText" | "addRect";
  tool: string;
  position: {
    x: number;
    y: number;
  };
  color?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

interface UndoRedoEmitData extends Omit<BaseEmitData, 'tool' | 'position'> {
  type: 'undo' | 'redo';
}

type EmitMouseData = BaseEmitData | UndoRedoEmitData;

const INIT_HISTORY: History = {
  currentIdx: 0,
  elements: [],
};

const CURSOR_MAP = {
  pen: {
    url: pencil.src,
    hotspot: [0, 24],
  },
  eraser: {
    url: eraser.src,
    hotspot: [0, 24],
  },
  brush: {
    url: brush.src,
    hotspot: [0, 24],
  },
  square: {
    url: square.src,
    hotspot: [0, 24],
  },
  text: {
    url: text.src,
    hotspot: [0, 24],
  },
};

export const Palette = () => {

  const [tool, setTool] = React.useState<keyof typeof CURSOR_MAP>("pen");
  const [color, setColor] = useState("#df4b26");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [brushPressure, setBrushPressure] = useState(0.5);
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isTextInputVisible, setIsTextInputVisible] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [rectStart, setRectStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [history, setHistory] = useState<History>(INIT_HISTORY);

  const elements = history.elements.slice(0, history.currentIdx);
  const isPainting = React.useRef(false);
  const stageRef = useRef<any>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const emitMessage = async (message: EmitMouseData) => {
    try {
      await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error emitting message:', error);
    }
  };

  const throttleEmitMessage = useCallback(throttle(emitMessage, 16), []);

  const handleStartPaint = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;

    if (tool === "text") {
      setIsTextInputVisible(true);
      setTextPosition(point);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
      return;
    }

    if (tool === "square") {
      setRectStart(point);
      return;
    }

    isPainting.current = true;

    const element: ILine = {
      tool,
      points: [point.x, point.y, point.x, point.y],
      color: tool === "eraser" ? undefined : color,
      strokeWidth: tool === "brush" ? strokeWidth * brushPressure : strokeWidth,
    };

    emitMessage({
      type: 'startPaint',
      tool,
      position: point,
      color,
      strokeWidth,
    });
  };

  const handlePainting = (e: KonvaEventObject<MouseEvent>) => {
    if (
      !isPainting.current ||
      (tool !== "pen" && tool !== "brush" && tool !== "eraser")
    )
      return;

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;

    // Brush pressure simulation
    if (tool === "brush") {
      const newPressure = Math.min(1, brushPressure + 0.05);
      setBrushPressure(newPressure);
    }

    throttleEmitMessage({
      type: 'painting',
      tool,
      position: point,
      color,
      strokeWidth: tool === "brush" ? strokeWidth * brushPressure : strokeWidth,
    });
  };

  const handleStopPaint = () => {
    isPainting.current = false;
    setBrushPressure(0.5); // Reset brush pressure

    if (tool === "square" && rectStart) {
      const stage = stageRef.current;
      const point = stage?.getPointerPosition();
      if (!point) return;

      const width = point.x - rectStart.x;
      const height = point.y - rectStart.y;

      emitMessage({
        type: "addRect",
        tool,
        position: rectStart,
        dimensions: { width, height },
        color,
        strokeWidth,
      });

      setRectStart(null);
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) {
      setIsTextInputVisible(false);
      return;
    }

    emitMessage({
      type: "addText",
      tool: "text",
      position: textPosition,
      text: textInput,
      color,
      fontSize,
    });

    setTextInput("");
    setIsTextInputVisible(false);
  };

  const handleUndo = () => {
    emitMessage({ type: "undo" });
  };

  const handleRedo = () => {
    emitMessage({ type: "redo" });
  };

  useEffect(() => {
    const socketServer = async () => {
      try {
        await fetch("/api/socket/io", { method: "GET" });
      } catch (error) {
        console.error(error);
      }
    };

    socketServer();
    const initSocket = () => {
      const socketInstance = io("http://localhost:3000", {
        path: "/api/socket/io",
        addTrailingSlash: false,
      });

      socketInstance.on("connect", () => setIsConnected(true));
      socketInstance.on("disconnect", () => setIsConnected(false));
      socketInstance.on("connect_error", (err) =>
        console.log(`connect_error due to ${err.message}`)
      );

      socketInstance.on("message", (res) => {
        const data = res as EmitMouseData;

        if (data.type === "startPaint") {
          setHistory((history) => {
            const elements = history.elements.slice(0, history.currentIdx);
            return {
              ...history,
              currentIdx: history.currentIdx + 1,
              elements: [
                ...elements,
                {
                  tool: data.tool,
                  points: [
                    data.position.x,
                    data.position.y,
                    data.position.x,
                    data.position.y,
                  ],
                  color: data.color,
                  strokeWidth: data.strokeWidth,
                },
              ],
            };
          });
        }

        if (data.type === "painting") {
          setHistory((prevHistory) => {
            if (prevHistory.currentIdx === 0) return prevHistory;

            const elementIndexToUpdate = prevHistory.currentIdx - 1;
            const lastElement = prevHistory.elements[elementIndexToUpdate];

            if (
              lastElement.tool !== "pen" &&
              lastElement.tool !== "brush" &&
              lastElement.tool !== "eraser"
            ) {
              return prevHistory;
            }

            const updatedElements = prevHistory.elements.map(
              (element, index) => {
                if (index === elementIndexToUpdate) {
                  return {
                    ...element,
                    points: [
                      ...(element as ILine).points,
                      data.position.x,
                      data.position.y,
                    ],
                    strokeWidth: data.strokeWidth,
                  };
                }
                return element;
              }
            );

            return {
              ...prevHistory,
              elements: updatedElements,
            };
          });
        }

        if (data.type === "addText") {
          setHistory((history) => ({
            ...history,
            currentIdx: history.currentIdx + 1,
            elements: [
              ...history.elements.slice(0, history.currentIdx),
              {
                tool: "text",
                text: data.text || "",
                x: data.position.x,
                y: data.position.y,
                color: data.color,
                fontSize: data.fontSize,
              },
            ],
          }));
        }

        if (data.type === "addRect") {
          setHistory((history) => ({
            ...history,
            currentIdx: history.currentIdx + 1,
            elements: [
              ...history.elements.slice(0, history.currentIdx),
              {
                tool: "square",
                x: data.position.x,
                y: data.position.y,
                width: data.dimensions?.width || 0,
                height: data.dimensions?.height || 0,
                color: data.color,
                strokeWidth: data.strokeWidth,
              },
            ],
          }));
        }

        if (data.type === "undo") {
          setHistory((history) => ({
            ...history,
            currentIdx: Math.max(0, history.currentIdx - 1),
          }));
        }

        if (data.type === "redo") {
          setHistory((history) => ({
            ...history,
            currentIdx: Math.min(
              history.elements.length,
              history.currentIdx + 1
            ),
          }));
        }
      });

      setSocket(socketInstance);
    };

    initSocket();

    return () => {
      if (socket) socket.disconnect();
      throttleEmitMessage.cancel();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key.toLowerCase() === 'z') {
          e.preventDefault();
          handleUndo();
        } else if (e.key.toLowerCase() === 'y') {
          e.preventDefault();
          handleRedo();
        }
      } else if (e.key === "Enter" && isTextInputVisible) {
        handleTextSubmit();
      } else if (e.key === "Escape" && isTextInputVisible) {
        setIsTextInputVisible(false);
        setTextInput("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTextInputVisible, textInput]);


  if (!isConnected) {
    return (
      <div className="flex justify-center items-center h-screen">
        Connecting to server...
      </div>
    );
  }

  const handleToolChange = (newTool: keyof typeof CURSOR_MAP) => {
    setTool(newTool);
  };

  return (
    <>
      <div className="bg-white flex-1 w-full relative">
        <SketchbookTools
          currentTool={tool}
          onToolChange={handleToolChange}
          onUndo={handleUndo}
          onRedo={handleRedo}
          color={color}
          onColorChange={setColor}
          strokeWidth={strokeWidth}
          onStrokeWidthChange={setStrokeWidth}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
        />

        {isTextInputVisible && (
          <div
            className="absolute z-50"
            style={{
              left: `${textPosition.x}px`,
              top: `${textPosition.y}px`,
              transform: "translate(10px, 10px)",
            }}
          >
            <input
              ref={textInputRef}
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onBlur={handleTextSubmit}
              className="p-2 border rounded shadow-lg"
              style={{
                color,
                fontSize: `${fontSize}px`,
              }}
              autoFocus
            />
          </div>
        )}

        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleStartPaint}
          onMouseMove={handlePainting}
          onMouseUp={handleStopPaint}
          onMouseLeave={handleStopPaint}
          className="z-0"
          style={{
            cursor: `url(${CURSOR_MAP[tool].url}) ${CURSOR_MAP[tool].hotspot[0]} ${CURSOR_MAP[tool].hotspot[1]}, auto`,
          }}
        >
          <Layer>
            {elements.map((element, i) => {
              if (
                element.tool === "pen" ||
                element.tool === "brush" ||
                element.tool === "eraser"
              ) {
                return (
                  <Line
                    key={`line-${i}`}
                    points={element.points}
                    stroke={element.color}
                    strokeWidth={element.strokeWidth}
                    tension={element.tool === "brush" ? 0.5 : 0}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      element.tool === "eraser"
                        ? "destination-out"
                        : "source-over"
                    }
                  />
                );
              } else if (element.tool === "text") {
                return (
                  <KonvaText
                    key={`text-${i}`}
                    text={element.text}
                    x={element.x}
                    y={element.y}
                    fontSize={element.fontSize}
                    fill={element.color}
                  />
                );
              } else if (element.tool === "square") {
                return (
                  <Rect
                    key={`rect-${i}`}
                    x={element.x}
                    y={element.y}
                    width={element.width}
                    height={element.height}
                    stroke={element.color}
                    strokeWidth={element.strokeWidth}
                  />
                );
              }
              return null;
            })}
            {rectStart && tool === "square" && (
              <Rect
                x={rectStart.x}
                y={rectStart.y}
                width={
                  (stageRef.current?.getPointerPosition()?.x || 0) - rectStart.x
                }
                height={
                  (stageRef.current?.getPointerPosition()?.y || 0) - rectStart.y
                }
                stroke={color}
                strokeWidth={strokeWidth}
                dash={[5, 5]}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </>
  );
};
