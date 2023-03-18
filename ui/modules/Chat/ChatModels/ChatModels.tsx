"use client";
import { FC, useEffect, useState } from "react";
import { fetchModels } from "#/lib/helpers/request-helpers/makeServerRequest";

export const ChatModels = () => {
  const [models, setModels] = useState<string[]>([]);
  useEffect(() => {
    fetchModels().then((res) => !!res && setModels(res.data.map((model) => model.id)));
  }, []);

  return !!models ? (
    <select className="select w-full max-w-xs">
      {models.map((model, i) => (
        <option key={i}>{model}</option>
      ))}
    </select>
  ) : (
    <div>No models found</div>
  );
};
export default ChatModels;
