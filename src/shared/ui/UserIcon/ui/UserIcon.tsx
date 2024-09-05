import { stringToHexColor } from "@/shared/helpers/stringToHexColor/stringToHexColor";
import { FC } from "react";

export interface UserIconProps {
  name: string,
  emojy?: string | null,
}

export const UserIcon: FC<UserIconProps> = (props) => {
  const {
    emojy,
    name,
  } = props;

  const hex = stringToHexColor(name)

  return (
    <div className="rounded-full h-14 w-14 flex justify-center items-center" style={{ backgroundColor: hex }}>
      {emojy ? (
        <span className="text-2xl">
          {emojy}
        </span>
      ) : (
        <span className="text-2xl">
          {name}
        </span>
      )}
    </div>
  );
};
