import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import { SidebarButton } from "./SidebarButton";

interface Props {
  onClearConversations: () => void;
}

export const ClearConversations: FC<Props> = ({ onClearConversations }) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const { t } = useTranslation("sidebar");

  const handleClearConversations = () => {
    onClearConversations();
    setIsConfirming(false);
  };

  return isConfirming ? (
    <div className="flex w-full cursor-pointer items-center rounded-lg py-3 px-3 hover:bg-gray-500/10">
      <TrashIcon width={18} height={18} />

      <div className="ml-3 flex-1 text-left text-[12.5px] leading-3 text-white">
        {t("Are you sure?")}
      </div>

      <div className="flex w-[40px]">
        <CheckIcon
          className="ml-auto mr-1 min-w-[20px] text-neutral-400 hover:text-neutral-100"
          width={18}
          height={18}
          onClick={(e) => {
            e.stopPropagation();
            handleClearConversations();
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
      text={t("Clear conversations")}
      icon={<TrashIcon width={18} height={18} />}
      onClick={() => setIsConfirming(true)}
    />
  );
};
