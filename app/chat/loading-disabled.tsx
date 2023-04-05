import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import styles from "#/ui/atoms/layouts/ChatLayout/ChatLayout.module.scss";
import ChatLayout from "#/ui/modules/Chat/ChatLayout/ChatLayout";
import clsx from "clsx";

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
    <div className={clsx(styles.root, "dark:border-none dark:bg-base-300")}>
      <div>
        <div className={`h-full rounded-lg bg-slate-100 ${shimmer} flex flex-row`}>
          <div className={`m-4 mt-8 mr-0 h-16 w-16 rounded-md bg-slate-300 ${shimmer}`} />
          <div className="my-4 w-1/2">
            <div className={`ml-5 h-3 w-10 bg-slate-200 ${shimmer}`} />
            <div className={`m-4 mt-1 h-16 rounded-lg bg-slate-200 ${shimmer}`} />
          </div>
        </div>
        <BaseButton
          className={`btn-primary btn h-8 w-full rounded-lg bg-blue-100 ${shimmer}`}
          disabled
        />
      </div>
      <aside className="hidden md:flex">{sidebar}</aside>
    </div>
  );
}
