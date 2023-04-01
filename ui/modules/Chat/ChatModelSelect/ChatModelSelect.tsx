import { FC, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { OpenAiModel } from "#/app/chat/lib/types";
import { fetchModels } from "#/lib/helpers/request-helpers/makeServerRequest";

interface Props {
  selectedModel: OpenAiModel;
  onModelChange: (model: OpenAiModel) => void;
}

export const ChatModelSelect: FC<Props> = ({ onModelChange, selectedModel }) => {
  const { t } = useTranslation("chat");
  const [models, setModels] = useState<string[]>([]);
  useEffect(() => {
    fetchModels().then((res) => {
      if (res) {
        const models = res.data.map((model) => model.id);
        const sortedModels = models.sort((a, b) => {
          // sort by model name
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        });
        setModels(sortedModels);
      }
    });
  }, []);

  return (
    <label>
      {t("Model")}

      <select
        className="w-full outline-0"
        placeholder={t("Select a model") || ""}
        value={selectedModel}
        onChange={(e) => {
          onModelChange(models.find((model) => model === e.target.value) as OpenAiModel);
        }}
      >
        {models.map((model) => (
          <option key={model} value={model} className="dark:bg-[#343541] dark:text-white">
            {model}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ChatModelSelect;
