import { useEffect, useState } from "react";
// "use client";
import { fetchModels } from "#/lib/helpers/request-helpers/makeServerRequest";

type ChatModelsProps = {
  data: Promise<Response>;
  // models: string[] | null;
};

// export const SuspendedChatModels = async ({ data }: ChatModelsProps) => {
//   const models = await data
//   // const [models, setModels] = useState<string[] | null>(null);
//   // useEffect(() => {
//   //   fetchModels().then((res) => !!res && setModels(res.data.map((model) => model.id)));
//   // }, []);

export async function SuspendedChatModels({ data }: { data: Promise<Response> }) {
  const models = await data.then((res) => res.json());
  console.log("models ", models);
  return <pre>{JSON.stringify(models)}</pre>;
  // return !!models ? (
  //   <select className="select w-full max-w-xs">
  //     {models.map((model, i) => (
  //       <option key={i}>{model}</option>
  //     ))}
  //   </select>
  // ) : (
  //   <div>No models found</div>
  // );
}
export default SuspendedChatModels;
