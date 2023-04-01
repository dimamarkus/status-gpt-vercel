import { XMarkIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { useTranslation } from "next-i18next";

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

export const Search: FC<Props> = ({ searchTerm, onSearch }) => {
  const { t } = useTranslation("sidebar");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    onSearch("");
  };

  return (
    <div className="relative mt-4 flex items-center">
      <input
        className="w-full flex-1 rounded-md border border-neutral-600 bg-base-200 px-4 py-3 pr-10 text-[12px] leading-3"
        type="text"
        placeholder={t("Search conversations...") || ""}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {searchTerm && (
        <XMarkIcon
          className="absolute right-4 cursor-pointer text-blue-300 hover:text-blue-500"
          onClick={clearSearch}
          width={18}
          height={18}
        />
      )}
    </div>
  );
};
