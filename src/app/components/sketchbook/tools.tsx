// tools.tsx
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
}

export const SketchbookTools = ({
  currentTool,
  onToolChange,
  onUndo,
  onRedo,
}: SketchbookToolsProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-96 z-10">
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
        <button
          onClick={() => onToolChange("pen")}
          className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
            currentTool === "pen" ? "bg-gray-600" : "bg-[#2E2F32]"
          }`}
        >
          <Image src={pencil} alt="pencil" className="w-6 h-6" />
        </button>
        <button
          onClick={() => onToolChange("brush")}
          className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
            currentTool === "brush" ? "bg-gray-600" : "bg-[#2E2F32]"
          }`}
        >
          <Image src={brush} alt="brush" className="w-6 h-6" />
        </button>
        <button
          onClick={() => onToolChange("eraser")}
          className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
            currentTool === "eraser" ? "bg-gray-600" : "bg-[#2E2F32]"
          }`}
        >
          <Image src={eraser} alt="eraser" className="w-6 h-6" />
        </button>
        <button
          onClick={() => onToolChange("text")}
          className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
            currentTool === "text" ? "bg-gray-600" : "bg-[#2E2F32]"
          }`}
        >
          <Image src={text} alt="text" className="w-6 h-6" />
        </button>
        <button
          onClick={() => onToolChange("square")}
          className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-200 transition-colors ${
            currentTool === "square" ? "bg-gray-600" : "bg-[#2E2F32]"
          }`}
        >
          <Image src={square} alt="square" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
