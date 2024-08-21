'use client'

import { Dialog, useDialogs } from "@/entities/Dialog"
import classNames from "classnames";
import { ComponentProps, FC } from "react"

type Dialog = ComponentProps<typeof Dialog>;

// const dialogs: Dialog[] = [
//   {
//     userId: '1',
//     userName: 'Friend',
//     userEmojiAvatar: '👨',
//     countUnreadMessages: 1,
//     lastMessageTime: '12:00',
//     lastMessage: 'Го по пивку?',
//   },
//   {
//     userId: '2',
//     userName: 'Colleague',
//     userEmojiAvatar: '👨‍💼',
//     countUnreadMessages: 0,
//     lastMessageTime: '12:00',
//     lastMessage: 'Го по пивку?',
//   },
//   {
//     userId: '3',
//     userName: 'Enemy',
//     userEmojiAvatar: '😡',
//     countUnreadMessages: 3,
//     lastMessageTime: '12:00',
//     lastMessage: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
//   },
// ];

interface DialogsProps {
  className?: string;
}

export const Dialogs: FC<DialogsProps> = (props) => {
  const {
    className,
  } = props;

  const { data: dialogs } = useDialogs();
  console.log(dialogs);

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