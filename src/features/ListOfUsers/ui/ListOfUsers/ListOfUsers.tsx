import { UserIcon } from "@/shared/ui/UserIcon";
import { useUsers } from "../../model/useUsers/useUsers";
import { Dictionary } from "@/shared/i18n";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Modal } from '@mui/material'
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useSendMessages } from "@/entities/Message/hooks/useSendMessages";
import { redirect } from "next/navigation";
import Link from "next/link";

interface ListOfUsersProps {
  d: Dictionary;
}

export const ListOfUsers: FC<ListOfUsersProps> = (props) => {
  const {
    d,
  } = props;

  const { data, isLoading } = useUsers();
  const { mutate, data: sendData, isSuccess } = useSendMessages();

  const [currentUser, setCurrentUser] = useState<null | any>(null);
  const [value, setValue] = useState('');
  const [open, isOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      isOpen(false);
      // @ts-ignore
      redirect(`/${sendData.newMessage.chatId}`);
    }
  }, [isSuccess]);

  const onClick = (user: any) => {
    setCurrentUser(user);
    isOpen(true);
  };

  const onClose = () => {
    isOpen(false);
    setValue('');
  };

  const onClickBtn = () => {
    if (!value) {
      return;
    }

    mutate({ text: value, toUserId: currentUser.id });
  };

  const onChange = ({ currentTarget: { value: v } }: ChangeEvent<HTMLInputElement>) => {
    setValue(v);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {isLoading && (
        <div className="bold text-center text-xl text-black dark:text-white mt-2">{d['ListOfUsers.Loading users']}...</div>
      )}

      {!isLoading && data && data.map((user) => {
        const {
          id,
          fullName,
          chats,
        } = user;

        let currentOnClick = () => onClick(user);

        if (chats.length) {
          return (
            <div key={id} className="flex-grow">
              <Link href={`/${chats[0].id}`} className="cursor-pointer flex flex-col justify-center items-center h-24 w-16 hover:bg-COLOR_16 rounded-md">
                <UserIcon name={fullName} className="h-14 w-14" />
    
                <div className="mt-1 text-black dark:text-white text-xs break-all line-clamp-1 text-center">
                  {fullName}
                </div>
              </Link>
            </div>
          )
        }

        return (
          <div key={id} className="flex-grow">
            <div onClick={currentOnClick} className="cursor-pointer flex flex-col justify-center items-center h-24 w-16 hover:bg-COLOR_16 rounded-md">
              <UserIcon name={fullName} className="h-14 w-14" />
  
              <div className="mt-1 text-black dark:text-white text-xs break-all line-clamp-1 text-center">
                {fullName}
              </div>
            </div>
          </div>
        )
      })}

      <Modal
        open={open}
        onClose={onClose}
      >
        <div className="absolute bg-white right-1/2 translate-x-1/2 translate-y-1/2 bottom-1/2 p-3 rounded-md w-72">
          <div className="flex items-center gap-2">
            <UserIcon name={currentUser?.fullName || ''} className="h-10 w-10" />

            <span>
              {currentUser?.fullName}
            </span>
          </div>

          <Input value={value} onChange={onChange} label="Напишите первое сообщение" className="mt-8" />

          <Button className="mt-4" onClick={onClickBtn}>Отправить</Button>
        </div>
      </Modal>
    </div>
  );
};
