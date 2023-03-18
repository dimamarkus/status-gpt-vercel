import ChatLayout from "#/ui/layouts/ChatLayout/ChatLayout";

export default function Loading() {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;
  const sidebar = (
    <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
      <div className={`space-y-3 rounded-lg bg-blue-300 p-3 ${shimmer}`}>
        <div className="h-12 bg-blue-50 lg:h-10"></div>
        <div className="h-4 w-full bg-blue-200"></div>
        <div className="h-4 w-full bg-blue-200"></div>
        <div className="h-4 w-full bg-blue-200"></div>
        <div className="h-4 w-full bg-blue-200"></div>
      </div>
    </div>
  );
  return (
    <ChatLayout sidebar={sidebar}>
      <div className="col-span-full space-y-3 lg:col-span-4">
        <div className={`h-8 rounded-lg bg-blue-50 ${shimmer}`} />
        <div className={`h-[72px] rounded-lg bg-blue-100 ${shimmer}`} />
      </div>
    </ChatLayout>
  );
}
