"use client";

import type { Item } from "#/ui/examples/tab-group";
import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export const Tab = ({ path, item }: { path: string; item: Item }) => {
  const segment = useSelectedLayoutSegment();
  const href = item.slug ? path + "/" + item.slug : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  return (
    <Link
      href={href}
      title={item.title}
      className={clsx("rounded-lg px-3 py-1 text-sm font-medium", {
        "bg-transparent text-cyan-900 hover:bg-gray-500 hover:text-white": !isActive,
        "bg-accent text-white": isActive,
      })}
    >
      {item.text}
    </Link>
  );
};
