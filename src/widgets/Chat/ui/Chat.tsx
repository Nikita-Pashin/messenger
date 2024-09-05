'use client';

import { FC, useMemo, useRef } from "react";
import { Message } from "@/entities/Message";
import classNames from "classnames";
import { ChatInput } from "@/features/ChatInput";
import { useMessages } from "@/entities/Message/hooks/useMessages";

interface ChatProps {
  className?: string;
  chatId: string,
}

type UserType = NonNullable<ReturnType<typeof useMessages>['data']>['users'][0];

export const Chat: FC<ChatProps> = (props) => {
  const {
    className,
    chatId,
  } = props;

  const { data, isLoading } = useMessages({ chatId });
  const chatRef = useRef<HTMLDivElement | null>(null);

  const scrollToLastMessage = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollIntoView({ behavior: 'instant' });
    }
  };

  const onSendMessage = () => {
    scrollToLastMessage(chatRef.current);
  };

  const usersMap = useMemo(() => {
    const obj: Record<PropertyKey, UserType> = {};

    if (data) {
      for (const user of data?.users) {
        obj[user.id] = user;
      }
    }

    return obj;
  }, [data?.users]);
  
  if (isLoading || !data) {
    return null;
  }

  return (
    <div className={classNames("bg-COLOR_5 pl-4 pr-4", className)}>
      <div>
        {data.messages.map(({
          text, isReaded, from
        }, i) => {
          const currentUser = usersMap[from];
          const isMine = data.users[0].id === from;
          // debugger;
          // console.log('usersMap', usersMap);
          // console.log('usersMap[from]', usersMap[from]);
          // console.log('isMine', isMine);

          return (
            <div className={`flex pt-1 ${isMine ? 'justify-end' : 'justify-start'}`} key={i}>
              <Message
                isMine={isMine}
                status={isReaded ? 'readed' : 'delivered'}
                text={text}
                time={'12:00'}
                userName={currentUser.fullName}
                userEmojiAvatar={currentUser.avatarEmoji}
              />
            </div>
          )
        })}

        <div ref={(e) => {
          chatRef.current = e;
          scrollToLastMessage(e);
        }} />
      </div>

      <div className="relative">
        <ChatInput onSendMessage={onSendMessage} chatId={chatId} className="fixed w-80 bottom-4 right-4" />
      </div>
    </div>
  );
};
