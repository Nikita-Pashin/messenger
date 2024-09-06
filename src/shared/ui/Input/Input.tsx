'use client'

import classNames from "classnames";
import { ChangeEvent, FC, useState } from "react";
import s from './input.module.scss';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Input: FC<InputProps> = (props) => {
  const {
    onChange,
    value,
    label = 'label',
    className,
    disabled,
  } = props;

  const [isFocus, setIsFocus] = useState(false);
  const putLabelInField = !isFocus && !value;

  return (
    <div className={classNames(className, 'relative')}>
      <label
        className={classNames(s.label, putLabelInField ? s.labelInField : s.labelOnInput, 'bg-white text-COLOR_13 dark:bg-COLOR_12', isFocus && 'text-COLOR_8 dark:text-COLOR_3')}
      >
        {label}
      </label>
      <input 
        disabled={disabled} 
        onBlur={() => setIsFocus(false)} 
        onFocus={() => setIsFocus(true)} 
        className={classNames(s.input, 'bg-white dark:text-white dark:bg-COLOR_12 border-COLOR_9 hover:border-COLOR_8 focus:border-COLOR_8 dark:border-COLOR_14 dark:hover:border-COLOR_3 dark:focus:border-COLOR_3')} 
        value={value} onChange={onChange}
      />
    </div>
  );
};
