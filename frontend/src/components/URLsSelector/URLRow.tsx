import { FC, useState } from "react";
import { BsPlusCircleDotted } from "react-icons/bs";

export const URLRow: FC<{ onUrlAdded: (url: string) => void }> = ({
  onUrlAdded,
}) => {
  const [value, setValue] = useState("");
  const disabled = value.length === 0;

  return (
    <div className="flex gap-x-2 items-center">
      <input
        className="bg-[#fff] border-solid w-52 focus:border-blue-600 border-[1px] outline-none rounded-md p-1 duration-75"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <BsPlusCircleDotted
        className={`${
          !disabled ? "cursor-pointer hover:text-blue-500" : "opacity-50"
        } h-5 w-5 text-blue-600 duration-100`}
        onClick={() => {
          onUrlAdded(value);
          setValue("");
        }}
      />
    </div>
  );
};
