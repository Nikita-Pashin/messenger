'use client'

import { Dialog, useDialogs } from "@/entities/Dialog"
import classNames from "classnames";
import { ComponentProps, FC } from "react"

type Dialog = ComponentProps<typeof Dialog>;

interface DialogsProps {
  className?: string;
}

export const Dialogs: FC<DialogsProps> = (props) => {
  const {
    className,
  } = props;

  const { data: dialogs, isLoading } = useDialogs();
  
  if (isLoading || typeof dialogs === 'undefined') {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className={classNames("bg-COLOR_1 pt-2 pb-2 pl-2", className)}>
      {dialogs.map(({
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