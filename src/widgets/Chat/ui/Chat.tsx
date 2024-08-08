'use client';

import { ComponentProps, FC } from "react";
import { Message } from "@/entities/Message";
import classNames from "classnames";
import { ChatInput } from "@/features/ChatInput";

type MessageProps = ComponentProps<typeof Message>;

const messages: MessageProps[] = [
  {
    text: 'text',
    time: '12:00',
    status: 'pending',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'delivered',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'delivered',
    isMine: false,
  },
  {
    text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
    time: '12:00',
    status: 'delivered',
    isMine: false,
  },
  {
    text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
    time: '12:00',
    status: 'delivered',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
  {
    text: 'text',
    time: '12:00',
    status: 'readed',
    isMine: true,
  },
];

interface ChatProps {
  className?: string;
}

export const Chat: FC<ChatProps> = (props) => {
  const {
    className,
  } = props;

  return (
    <div className={classNames("bg-COLOR_5 pl-4 pr-4", className)}>
      <div>
        {messages.map(({
          isMine, status, text, time,
        }, i) => (
          <div className={`flex pt-1 ${isMine ? 'justify-end' : 'justify-start'}`} key={i}>
            <Message
              isMine={isMine}
              status={status}
              text={text}
              time={time}
            />
          </div>
        ))}
      </div>

      <div className="relative">
        <ChatInput className="fixed w-80 bottom-4 right-4" />
      </div>
    </div>
  );
};