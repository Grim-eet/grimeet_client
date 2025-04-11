export const SketchbookCard = () => {
  return (
    <>
      <div className="w-52 h-60 rounded-2xl">
        <div className="w-52 h-44 bg-white rounded-2xl"></div>
        <div className="flex flex-row justify-center items-center w-52 h-16 rounded-b-2xl gap-2">
          <div className="w-10 h-10 bg-white rounded-full"></div>
          <div className="flex flex-col justify-start items-start w-32 gap-1">
            <h2 className="text-sm font-bold text-center text-white">
              스케치북 제목
            </h2>
            <h3 className="text-xs font-bold text-center text-gray-500">
              작성 일자
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-6">
            <button>:</button>
            <div className="text-xs text-gray-500">publish</div>
          </div>
        </div>
      </div>
    </>
  );
};
