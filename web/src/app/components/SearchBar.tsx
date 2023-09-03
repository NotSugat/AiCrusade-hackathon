import { cn } from "@/lib/utils";
import { BiSearchAlt } from "react-icons/bi";

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const SearchBar = ({
  formStyle,
  iconStyle,
  inputStyle,
  placeHolderText,
}: {
  formStyle?: string;
  iconStyle?: string;
  inputStyle?: string;
  placeHolderText?: string;
}) => {
  return (
    <form
      className={cn(
        " flex items-center gap-2 rounded-full border-2  border-[var(--text-primary)] bg-[#E6E9E3]  pl-4  ",
        formStyle,
      )}
    >
      <BiSearchAlt size={24} className={cn("fill-[#333]", iconStyle)} />
      <input
        type="text"
        placeholder={placeHolderText ? placeHolderText : "Search..."}
        className={cn(
          "h-8 w-full rounded-br-full rounded-tr-full bg-transparent py-4 text-[#333] outline-none",
          inputStyle,
        )}
      />
    </form>
  );
};

export default SearchBar;
