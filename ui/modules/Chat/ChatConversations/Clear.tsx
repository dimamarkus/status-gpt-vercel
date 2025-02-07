import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { SidebarButton } from "../../../atoms/buttons/SidebarButton/SidebarButton";

interface Props {
  onClear: () => void;
}

export const Clear: FC<Props> = ({ onClear }) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const handleClear = () => {
    onClear();
    setIsConfirming(false);
  };

  return isConfirming ? (
    <div className="flex w-full cursor-pointer items-center rounded-lg py-3 px-3 hover:bg-gray-500/10">
      <TrashIcon width={18} height={18} />

      <div className="ml-3 flex-1 text-left text-[12.5px] leading-3 text-red-500">
        Are you sure?
      </div>

      <div className="flex w-[40px]">
        <CheckIcon
          className="ml-auto mr-1 min-w-[20px] text-red-400 hover:text-red-500"
          width={18}
          height={18}
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
        />

        <XMarkIcon
          className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100"
          width={18}
          height={18}
          onClick={(e) => {
            e.stopPropagation();
            setIsConfirming(false);
          }}
        />
      </div>
    </div>
  ) : (
    <SidebarButton
      text="Clear Conversations"
      icon={<TrashIcon width={18} height={18} />}
      onClick={() => setIsConfirming(true)}
    />
  );
};

export default Clear;
