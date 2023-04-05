import { XMarkIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

export const Search: FC<Props> = ({ searchTerm, onSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    onSearch("");
  };

  return (
    <form className="relative flex items-center">
      <input
        className="w-full flex-1 rounded-md bg-white/75 px-4 py-3 pr-10 text-[12px] leading-3 dark:bg-white/5"
        type="text"
        placeholder={"Search conversations..." || ""}
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
    </form>
  );
};

export default Search;
