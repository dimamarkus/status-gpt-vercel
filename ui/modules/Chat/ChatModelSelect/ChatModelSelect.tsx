import { OpenAiModel } from "#/app/chat/lib/types";
import { fetchModels } from "#/lib/helpers/requests/makeServerRequest";
import { FC, useEffect, useState } from "react";

interface Props {
  selectedModel: OpenAiModel;
  onModelChange: (model: OpenAiModel) => void;
}

export const ChatModelSelect: FC<Props> = ({ onModelChange, selectedModel }) => {
  const [models, setModels] = useState<string[]>([]);
  useEffect(() => {
    fetchModels().then(async (res) => {
      if (res) {
        const response = await res.json()
        const models = response.data.map((model) => model.id);
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
      Model
      <select
        className="w-full outline-0"
        placeholder={"Select a model" || ""}
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
