import { stringToHexColor } from "@/shared/helpers/stringToHexColor/stringToHexColor";
import { FC } from "react";

interface UserIconProps {
  name: string,
  emojy: string,
}

export const UserIcon: FC<UserIconProps> = (props) => {
  const {
    emojy,
    name,
  } = props;

  const hex = stringToHexColor(name)

  return (
    <div className="rounded-full h-14 w-14 flex justify-center items-center" style={{ backgroundColor: hex }}>
      <span className="text-2xl">
        {emojy}
      </span>
    </div>
  );
};
