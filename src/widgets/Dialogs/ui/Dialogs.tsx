'use client'

import { ComponentProps, FC } from "react";
import classNames from "classnames";
import { Dialog, DialogSkeleton, useDialogs } from "@/entities/Dialog";

type Dialog = ComponentProps<typeof Dialog>;

interface DialogsProps {
  className?: string;
};

export const Dialogs: FC<DialogsProps> = (props) => {
  const {
    className,
  } = props;

  const { data: dialogs, isLoading } = useDialogs();

  return (
    <div className={classNames("dark:bg-COLOR_1 bg-white pt-2 pb-2 pl-2", className)}>
      {isLoading && (
        <div />
      )}

      {!isLoading && dialogs && dialogs.map(({
        messages, users: [{ fullName }], id,
      }, i) => {
        const currentMessage = messages.at(-1);
        const countUnreadMessages = messages.filter((el) => !el.isReaded).length;

        return (
          <div key={id}>
            <Dialog
              userId={String(id)}
              userName={fullName}
              userEmojiAvatar={'👨'}
              countUnreadMessages={countUnreadMessages}
              lastMessage={currentMessage?.text || ''}
              lastMessageTime={'12:00'}
            />
          </div>
        )
      })}
    </div>
  )
}