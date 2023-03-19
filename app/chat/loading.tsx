import Button from "#/ui/atoms/buttons/Button/Button";
import ChatLayout from "#/ui/atoms/layouts/ChatLayout/ChatLayout";

export default function Loading() {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;
  const sidebar = (
    <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
      <div className={`space-y-3 rounded-lg p-3`}>
        <div className={`my-2 h-2 bg-blue-300 lg:h-10 ${shimmer}`}></div>
        <div className={`my-2 h-4 w-full bg-blue-200 ${shimmer}`}></div>
        <div className={`my-2 h-4 w-full bg-blue-200 ${shimmer}`}></div>
        <div className={`my-2 h-4 w-full bg-blue-200 ${shimmer}`}></div>
        <div className={`my-2 h-4 w-full bg-blue-200 ${shimmer}`}></div>
        <div className={`my-2 h-4 w-full bg-blue-200 ${shimmer}`}></div>
      </div>
    </div>
  );

  return (
    <ChatLayout sidebar={sidebar}>
      <div className={`h-full rounded-lg bg-neutral-100 ${shimmer} flex flex-row`}>
        <div className={`m-4 mr-0 h-16 w-16 rounded-md bg-neutral-300 ${shimmer}`} />
        <div className={`m-4 h-16 w-1/2 rounded-lg bg-neutral-200 ${shimmer}`} />
      </div>
      <Button className={`btn-primary btn h-8 w-full rounded-lg bg-blue-100 ${shimmer}`} disabled />
    </ChatLayout>
  );
}
