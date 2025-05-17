"use client";
import { KonvaEventObject } from "konva/lib/Node";
import { SketchbookTools } from "./tools";
import { useState, useRef, useEffect, use, useCallback } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
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
}

interface History {
  currentIdx: number;
  lines: Array<ILine>;
}

interface BaseEmitData {
  type: "painting" | "startPaint" | "undo" | "redo";
  tool: string;
  position: {
    x: number;
    y: number;
  };
}

interface UndoRedoEmitData extends Omit<BaseEmitData, "tool" | "position"> {
  type: "undo" | "redo";
}

type EmitMouseData = BaseEmitData | UndoRedoEmitData;

const INIT_HISTORY: History = {
  currentIdx: 0,
  lines: [],
};

const CURSOR_MAP = {
  pen: {
    url: pencil.src,
    hotspot: [0, 24], // 펜 끝이 클릭 위치
  },
  eraser: {
    url: eraser.src,
    hotspot: [0, 24], // 지우개 중심이 클릭 위치
  },
  brush: {
    url: brush.src,
    hotspot: [0, 24], // 브러쉬 중심
  },
  square: {
    url: square.src,
    hotspot: [0, 24], // 사각형 중심
  },
  text: {
    url: text.src,
    hotspot: [0, 24], // 텍스트 커서 위치
  },
};

export const Palette = () => {
  const [tool, setTool] = React.useState<keyof typeof CURSOR_MAP>("pen");
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [history, setHistory] = useState<History>(INIT_HISTORY);

  const lines = history.lines.slice(0, history.currentIdx);
  const isPainting = React.useRef(false);

  const emitMessage = async (message: EmitMouseData) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          ...message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res", response);
      console.log("emitMessage", message);
      console.log("his", history);
    } catch (error) {
      console.error("Error emitting message:", error);
    }
  };

  const throttleEmitMessage = useCallback(throttle(emitMessage, 16), []);

  const handleStartPaint = (e: KonvaEventObject<MouseEvent>) => {
    isPainting.current = true;
    const point = e.target.getStage()?.getPointerPosition();
    if (!point) return;

    emitMessage({
      type: "startPaint",
      tool,
      position: {
        x: point.x,
        y: point.y,
      },
    });
  };

  const handlePainting = (e: KonvaEventObject<MouseEvent>) => {
    if (!isPainting.current) return;
    const point = e.target.getStage()?.getPointerPosition();
    if (!point) return;

    throttleEmitMessage({
      type: "painting",
      tool,
      position: {
        x: point.x,
        y: point.y,
      },
    });
  };

  const handleStopPaint = () => {
    isPainting.current = false;
  };

  const handleUndo = () => {
    emitMessage({
      type: "undo",
    });
  };

  const handleRedo = () => {
    emitMessage({
      type: "redo",
    });
  };

  useEffect(() => {
    // Socket.IO 초기화 요청

    const socketServer = async () => {
      try {
        const res = await fetch("/api/socket/io", { method: "GET" });

        if (res.ok) {
          console.log("소켓 초기화 성공했습니다.");
          console.log(res.status);
        }
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

      socketInstance.on("connect", () => {
        setIsConnected(true);
      });

      socketInstance.on("disconnect", () => {
        setIsConnected(false);
      });

      socketInstance.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      socketInstance.on("message", (res) => {
        console.log(res);
        const data = res as EmitMouseData;

        if (data.type === "startPaint") {
          setHistory((history) => {
            const lines = history.lines.slice(0, history.currentIdx);
            console.log("lines", lines);
            return {
              ...history,
              currentIdx: history.currentIdx + 1,
              lines: [
                ...lines,
                {
                  tool: data.tool,
                  points: [
                    data.position.x,
                    data.position.y,
                    data.position.x,
                    data.position.y,
                  ],
                },
              ],
            };
          });
        }

        if (data.type === "painting") {
          setHistory((prevHistory) => {
            if (prevHistory.currentIdx === 0) {
              return prevHistory;
            }

            const lineIndexToUpdate = prevHistory.currentIdx - 1;

            const updatedLines = prevHistory.lines.map((line, index) => {
              if (index === lineIndexToUpdate) {
                return {
                  ...line,
                  points: [...line.points, data.position.x, data.position.y],
                };
              }
              return line;
            });

            return {
              ...prevHistory,
              lines: updatedLines,
            };
          });
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
            currentIdx: Math.min(history.lines.length, history.currentIdx + 1),
          }));
        }
      });

      setSocket(socketInstance);
    };
    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key.toLowerCase() === "z") {
          e.preventDefault();
          handleUndo();
        } else if (e.key.toLowerCase() === "y") {
          e.preventDefault();
          handleRedo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      throttleEmitMessage.cancel(); // throttle cleanup
    };
  }, []);

  // 연결 상태 표시
  if (!isConnected) {
    return <div>Connecting to server...</div>;
  }

  // if (!isConnected) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Connecting to server...
  //     </div>
  //   );
  // }

  // const historylines = lines.slice(0, historyIdx);

  // const handleUndo = () => {
  //   if (historyIdx === 0) {
  //     return;
  //   }
  //   setHistoryIdx(historyIdx - 1);
  // };
  // const handleRedo = () => {
  //   if (historyIdx === lines.length) {
  //     return;
  //   }
  //   setHistoryIdx(historyIdx + 1);
  // };

  // const handleMouseDown = (e) => {
  //   isPainting.current = true;
  //   const pos = e.target.getStage().getPointerPosition();
  //   setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  // };

  // const handleMouseMove = (e) => {
  //   // no drawing - skipping
  //   if (!isPainting.current) {
  //     return;
  //   }
  //   const stage = e.target.getStage();
  //   const point = stage.getPointerPosition();
  //   let lastLine = lines[lines.length - 1];
  //   // add point
  //   lastLine.points = lastLine.points.concat([point.x, point.y]);

  //   // replace last
  //   lines.splice(lines.length - 1, 1, lastLine);
  //   setLines(lines.concat());
  // };

  // const handleMouseUp = () => {
  //   isPainting.current = false;
  // };

  const handleToolChange = (newTool: keyof typeof CURSOR_MAP) => {
    setTool(newTool);
  };

  return (
    <>
      <div className="bg-white flex-1 w-full">
        {/* <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
          className="text-black"
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select> */}
        <div className="z-1000">
          <SketchbookTools
            currentTool={tool}
            onToolChange={handleToolChange}
            onUndo={handleUndo}
            onRedo={handleRedo}
          />
        </div>

        {/* <button onClick={handleUndo} className="text-black">
          Undo
        </button>
        <button onClick={handleRedo} className="text-black">
          Redo
        </button> */}
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleStartPaint}
          onMousemove={handlePainting}
          onMouseup={handleStopPaint}
          onMouseLeave={handleStopPaint}
          // onTouchStart={handleMouseDown}
          // onTouchMove={handleMouseMove}
          // onTouchEnd={handleMouseUp}
          className="z-0"
          style={{
            cursor: `url(${CURSOR_MAP[tool].url}) ${CURSOR_MAP[tool].hotspot[0]} ${CURSOR_MAP[tool].hotspot[1]}, auto`,
          }}
        >
          <Layer>
            <Text text="Just start drawing" x={5} y={30} />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};
