import { UserIcon } from "@/shared/ui/UserIcon";
import Link from "next/link";
import { FC } from "react";
import type { DialogComponentProps } from "../../model/types";
import classNames from "classnames";

export const Dialog: FC<DialogComponentProps> = (props) => {
  const {
    countUnreadMessages,
    lastMessage,
    lastMessageTime,
    userEmojiAvatar,
    userName,
    userId,
    isActive,
  } = props;

  return (
    <Link href={`/${userId}`} className="w-full block">
      <div className={classNames("bg-slate-500 hover:bg-COLOR_16 dark:hover:bg-COLOR_2 p-2 rounded-xl flex gap-2", isActive && "bg-COLOR_8 hover:bg-COLOR_8")}>
        <div className="basis-14">
          <UserIcon className="h-14 w-14" name={userName} emojy={userEmojiAvatar} size={14} />
        </div>

        <div className="flex flex-col justify-center items-start basis-full">
          <div className="flex w-full justify-between items-center gap-1">
            <span className={classNames("text-black dark:text-white font-medium text-left break-all line-clamp-1", isActive && "text-white")}>
              {userName}
            </span>

            <span className={classNames("text-xs", isActive ? "text-white" : "text-COLOR_4")}>
              {lastMessageTime}
            </span>
          </div>
          
          <div className="flex w-full justify-between gap-1">
            <span className={classNames("font-normal text-left break-all line-clamp-1 text-COLOR_6", isActive ? "text-white" : "text-COLOR_4")}>
              {lastMessage}
            </span>

            {!!countUnreadMessages && (
              <span className="text-white min-w-6 h-6 text-center rounded-full bg-COLOR_8 dark:bg-COLOR_3">
                {countUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};