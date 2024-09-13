'use client'

import { Dictionary } from "@/shared/i18n";
import { Input } from "@/shared/ui/Input/Input";
import { ChangeEvent, FC, useState } from "react";

interface FindUserInputProps {
  setFocus: (isFocus: boolean) => void;
  d: Dictionary;
  className?: string;
}

export const FindUserInput: FC<FindUserInputProps> = (props) => {
  const {
    d,
    setFocus,
    className,
  } = props;

  const [value, setValue] = useState('');

  const onChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const onFocus = () => {
    setFocus(true);
  };

  return (
    <div className={className}>
      <Input value={value} onChange={onChange} label={d['Search']} onFocus={onFocus} />
    </div>
  );
};
