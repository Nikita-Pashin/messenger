import { stringToHexColor } from "@/shared/helpers/stringToHexColor/stringToHexColor";
import classNames from "classnames";
import { FC } from "react";

export interface UserIconProps {
  name: string,
  emojy?: string | null,
  size?: number;
  className?: string;
}

export const UserIcon: FC<UserIconProps> = (props) => {
  const {
    emojy,
    name,
    className,
  } = props;

  const hex = stringToHexColor(name)

  return (
    <div className={classNames(className, 'rounded-full flex justify-center items-center')} style={{ backgroundColor: hex }}>
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
