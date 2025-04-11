import pencil from "../../../../public/images/pencil.png";
import eraser from "../../../../public/images/eraser.png";
import brush from "../../../../public/images/brush.png";
import Image from "next/image";
import text from "../../../../public/images/text.png";
import square from "../../../../public/images/square.png";

export const SketchbookTools = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-96">
      <div className="flex items-center justify-center space-x-2 bg-gray-900 rounded-xl p-2 shadow-md">
        <button className="w-10 h-10 flex items-center justify-center bg-[#2E2F32] rounded-xl hover:bg-gray-200 transition-colors">
          x
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-[#2E2F32] rounded-xl hover:bg-gray-200 transition-colors">
          <Image src={pencil} alt="pencil" className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-[#2E2F32] rounded-xl hover:bg-gray-200 transition-colors">
          <Image src={brush} alt="brush" className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-[#2E2F32] rounded-xl hover:bg-gray-200 transition-colors">
          <Image src={eraser} alt="eraser" className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-[#2E2F32] rounded-xl hover:bg-gray-200 transition-colors">
          <Image src={text} alt="text" className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-[#2E2F32] rounded-xl hover:bg-gray-200 transition-colors">
          <Image src={square} alt="square" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
