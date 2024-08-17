'use client'

import classNames from "classnames";
import { FC, useEffect, useState } from "react";

interface ChatInputProps {
  className?: string;
}

export const ChatInput: FC<ChatInputProps> = ({ className }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');

  const sendMessage = () => {
    setValue('');
    console.log('sendMessage');
  }

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
      console.log(key, isFocus)
      if (key === 'Enter' && isFocus) {
        sendMessage();
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [isFocus]);

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
