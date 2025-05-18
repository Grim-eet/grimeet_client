import pencil from "../../../../public/images/pencil.png";
import eraser from "../../../../public/images/eraser.png";
import brush from "../../../../public/images/brush.png";
import Image from "next/image";
import text from "../../../../public/images/text.png";
import square from "../../../../public/images/square.png";

interface SketchbookToolsProps {
  currentTool: string;
  onToolChange: (tool: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  color?: string;
  onColorChange?: (color: string) => void;
  strokeWidth?: number;
  onStrokeWidthChange?: (width: number) => void;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
}

export const SketchbookTools = ({
  currentTool,
  onToolChange,
  onUndo,
  onRedo,
  color = "#df4b26",
  onColorChange = () => {},
  strokeWidth = 5,
  onStrokeWidthChange = () => {},
  fontSize = 16,
  onFontSizeChange = () => {},
}: SketchbookToolsProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-auto z-10">
      <div className="flex items-center justify-center space-x-2 bg-gray-900 rounded-xl p-2 shadow-md">
        <button
          onClick={onUndo}
          className="w-10 h-10 flex items-center justify-center bg-[#2E2F32] rounded-xl hover:bg-gray-200 transition-colors"
        >
          Undo
        </button>
        <button
          onClick={onRedo}
          className="w-10 h-10 flex items-center justify-center bg-[#2E2F32] rounded-xl hover:bg-gray-200 transition-colors"
        >
          Redo
        </button>

        {/* Pen Tool */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToolChange("pen")}
            className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
              currentTool === "pen" ? "bg-gray-600" : "bg-[#2E2F32]"
            }`}
          >
            <Image src={pencil} alt="pencil" className="w-6 h-6" />
          </button>
          {currentTool === "pen" && (
            <div className="flex items-center space-x-2 bg-[#2E2F32] p-2 rounded-lg">
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-8 h-8 cursor-pointer"
              />
              <input
                type="range"
                min="1"
                max="20"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-white text-sm">{strokeWidth}</span>
            </div>
          )}
        </div>

        {/* Brush Tool */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToolChange("brush")}
            className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
              currentTool === "brush" ? "bg-gray-600" : "bg-[#2E2F32]"
            }`}
          >
            <Image src={brush} alt="brush" className="w-6 h-6" />
          </button>
          {currentTool === "brush" && (
            <div className="flex items-center space-x-2 bg-[#2E2F32] p-2 rounded-lg">
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-8 h-8 cursor-pointer"
              />
              <input
                type="range"
                min="1"
                max="30"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-white text-sm">{strokeWidth}</span>
            </div>
          )}
        </div>

        {/* Eraser Tool */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToolChange("eraser")}
            className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
              currentTool === "eraser" ? "bg-gray-600" : "bg-[#2E2F32]"
            }`}
          >
            <Image src={eraser} alt="eraser" className="w-6 h-6" />
          </button>
          {currentTool === "eraser" && (
            <div className="flex items-center space-x-2 bg-[#2E2F32] p-2 rounded-lg">
              <input
                type="range"
                min="5"
                max="50"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-white text-sm">{strokeWidth}</span>
            </div>
          )}
        </div>

        {/* Text Tool */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToolChange("text")}
            className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
              currentTool === "text" ? "bg-gray-600" : "bg-[#2E2F32]"
            }`}
          >
            <Image src={text} alt="text" className="w-6 h-6" />
          </button>
          {currentTool === "text" && (
            <div className="flex items-center space-x-2 bg-[#2E2F32] p-2 rounded-lg">
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-8 h-8 cursor-pointer"
              />
              <input
                type="range"
                min="8"
                max="72"
                value={fontSize}
                onChange={(e) => onFontSizeChange(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-white text-sm">{fontSize}</span>
            </div>
          )}
        </div>

        {/* Square Tool */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToolChange("square")}
            className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
              currentTool === "square" ? "bg-gray-600" : "bg-[#2E2F32]"
            }`}
          >
            <Image src={square} alt="square" className="w-6 h-6" />
          </button>
          {currentTool === "square" && (
            <div className="flex items-center space-x-2 bg-[#2E2F32] p-2 rounded-lg">
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-8 h-8 cursor-pointer"
              />
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-white text-sm">{strokeWidth}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
