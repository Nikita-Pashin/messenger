'use client'

import { ComponentProps, FC, useState } from "react";
import classNames from "classnames";
import { Dialog, useDialogs } from "@/entities/Dialog";
import { Dictionary } from "@/shared/i18n";
import { useProfile } from "@/entities/Profile";

type Dialog = ComponentProps<typeof Dialog>;

interface DialogsProps {
  className?: string;
  d: Dictionary,
};

export const Dialogs: FC<DialogsProps> = (props) => {
  const {
    className,
    d,
  } = props;

  const isSSR = typeof window === 'undefined';
  const defaultActiveDialog = isSSR ? null : Number(new URL(window.location.href).pathname.split('/')[1]);

  const { data: dialogs, isLoading } = useDialogs();
  const profile = useProfile();
  const [activeDialog, setActiveDialog] = useState<null | number>(defaultActiveDialog);

  const showLoading = profile.isLoading || isLoading;

  return (
    <div className={classNames("dark:bg-COLOR_1 bg-white", className)}>
      {showLoading && (
        <div className="bold text-center text-xl text-black dark:text-white mt-2">{d['Dialogs.Loading chats']}...</div>
      )}

      {!showLoading && dialogs && !dialogs.length && (
        <div className="bold text-center text-xl text-black dark:text-white mt-2">{d["Dialogs.You don't have any dialogues yet"]}...</div>
      )}

      {!showLoading && dialogs && dialogs.map(({
        messages, users: [{ fullName }], id,
      }) => {
        const currentMessage = messages.at(-1);
        const countUnreadMessages = messages.filter((el) => !el.isReaded && el.from !== profile.data?.id).length;

        return (
          <div key={id} onClick={() => setActiveDialog(id)}>
            <Dialog
              userId={String(id)}
              userName={fullName}
              userEmojiAvatar={'👨'}
              countUnreadMessages={countUnreadMessages}
              lastMessage={currentMessage?.text || ''}
              lastMessageTime={'12:00'}
              isActive={activeDialog === id}
            />
          </div>
        )
      })}
    </div>
  )
}