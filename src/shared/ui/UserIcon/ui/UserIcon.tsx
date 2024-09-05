import { stringToHexColor } from "@/shared/helpers/stringToHexColor/stringToHexColor";
import { FC } from "react";

export interface UserIconProps {
  name: string,
  emojy?: string | null,
  size?: number;
}

export const UserIcon: FC<UserIconProps> = (props) => {
  const {
    emojy,
    name,
    size = 14,
  } = props;

  const hex = stringToHexColor(name)

  return (
    <div className={`rounded-full h-${size} w-${size} flex justify-center items-center`} style={{ backgroundColor: hex }}>
      {emojy ? (
        <span className="text-2xl">
          {emojy}
        </span>
      ) : (
        <span className="text-2xl">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
};
