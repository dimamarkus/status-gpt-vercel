import cn from "classnames";
import { Tab } from "#/ui/examples/tab";

export type Item = {
  text: string;
  slug?: string;
  segment?: string;
};

export const TabGroup = ({
  path,
  items,
  className,
}: {
  path: string;
  items: Item[];
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((item) => (
        <Tab key={path + item.slug} item={item} path={path} />
      ))}
    </div>
  );
};
