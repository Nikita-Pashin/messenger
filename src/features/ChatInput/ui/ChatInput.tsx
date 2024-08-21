'use client'

import { useDialogs } from "@/entities/Dialog";
import { useMessages } from "@/entities/Message/hooks/useMessages";
import { useSendMessages } from "@/entities/Message/hooks/useSendMessages";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";

interface ChatInputProps {
  className?: string;
  chatId: string,
}

export const ChatInput: FC<ChatInputProps> = ({ className, chatId }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');

  const { refetch: refetchMessages } = useMessages({ chatId });
  const { refetch: refetchDialogs } = useDialogs();

  const { mutate, isPending } = useSendMessages();

  const sendMessage = (text: string) => {
    mutate({ text, chatId: Number(chatId) });
    setValue('');
  }

  useEffect(() => {
    if (isPending) {
      return;
    }

    refetchMessages();
    refetchDialogs();
  }, [isPending])

  const onChange = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  useEffect(() => {
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (key === 'Enter' && isFocus) {
        sendMessage(value);
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [isFocus, value]);

  return (
    <input
      type="text"
      className={classNames("bg-COLOR_2 text-white p-2 rounded-xl", className)}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      style={{ width: 'calc(100% - (256px + 16px + 16px))' }}
    />
  );
};
