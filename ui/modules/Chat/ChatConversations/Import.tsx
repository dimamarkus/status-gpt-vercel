import { cleanConversationHistory } from "#/app/chat/lib/helpers/converastion-helpers";
import { Conversation, ConversationsFolder } from "#/app/chat/lib/types";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { SidebarButton } from "../../../atoms/buttons/SidebarButton/SidebarButton";

interface Props {
  onImport: (data: { rootConversations: Conversation[]; folders: ConversationsFolder[] }) => void;
}

export const Import: FC<Props> = ({ onImport }) => {
  return (
    <>
      <input
        id="import-file"
        className="sr-only"
        tabIndex={-1}
        type="file"
        accept=".json"
        onChange={(e) => {
          if (!e.target.files?.length) return;

          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            let json = JSON.parse(e.target?.result as string);

            if (json && !json.folders) {
              json = { history: cleanConversationHistory(json), folders: [] };
            }

            onImport({ rootConversations: json.history, folders: json.folders });
          };
          reader.readAsText(file);
        }}
      />

      <SidebarButton
        text="Import conversations"
        icon={<DocumentArrowUpIcon width={18} height={18} />}
        onClick={() => {
          const importFile = document.querySelector("#import-file") as HTMLInputElement;
          if (importFile) {
            importFile.click();
          }
        }}
      />
    </>
  );
};

export default Import;
