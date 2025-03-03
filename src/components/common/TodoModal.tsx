import { useContextmenuStore } from "@/store/contextmenu";
import { useModalStore } from "@/store/modal";
import { formatDate } from "@/utils/date-utils";
import { useEffect, useRef } from "react";

const TodoModal = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { isModal, hideModal } = useModalStore();
  const { startDate, endDate } = useContextmenuStore();

  useEffect(() => {
    if (!ref.current || !isModal) return;

    ref.current.focus();
  }, [ref, isModal]);

  if (!isModal) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-xs"
        onClick={hideModal}
      />
      <div className="w-lg rounded-3xl z-10 bg-white py-5 px-8">
        <div className="flex justify-end">
          <button className="text-xl cursor-pointer" onClick={hideModal}>X</button>
        </div>
        <div className="mt-4 mb-5">
          <input 
            ref={ref}
            className="text-[26px] font-bold text-gray-700 placeholder:text-gray-300 outline-none"
            placeholder="일정 제목"
          />
        </div>
        <div className="flex gap-2">
          <input type="date" defaultValue={formatDate(startDate!)} />
          <input type="date" defaultValue={formatDate(endDate!)} />
        </div>
        <div className="mt-8 flex justify-end gap-1">
          <button 
            className="py-[5px] px-[9px] border-[1px] border-gray-200 text-sm rounded-md cursor-pointer"
            onClick={hideModal}
          >
            취소
          </button>
          <button 
            className="py-[5px] px-[9px] border-[1px] border-gray-200 text-sm rounded-md bg-blue-400 text-white cursor-pointer"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
};

export default TodoModal;
