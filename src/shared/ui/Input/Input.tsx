'use client'

import classNames from "classnames";
import { ChangeEvent, FC, FocusEvent, useState } from "react";
import s from '@/styles/Input.module.scss';

type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
} & JSX.IntrinsicElements['input'];

export const Input: FC<InputProps> = (props) => {
  const {
    onChange,
    value,
    label,
    className,
    disabled,
    ...restProps
  } = props;

  const [isFocus, setIsFocus] = useState(false);
  const putLabelInField = !isFocus && !value;

  const onFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    setIsFocus(true);

    props.onFocus?.(e);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    setIsFocus(false);

    props.onBlur?.(e);
  };

  return (
    <div className={classNames(className, 'relative')}>
      <label
        className={classNames(s.label, putLabelInField ? s.labelInField : s.labelOnInput, 'bg-white text-COLOR_13 dark:bg-COLOR_12', isFocus && 'text-COLOR_8 dark:text-COLOR_3')}
      >
        {label}
      </label>
      <input 
        {...restProps}
        disabled={disabled} 
        onBlur={onBlur} 
        onFocus={onFocus} 
        className={classNames(s.input, 'bg-white w-full dark:text-white dark:bg-COLOR_12 border-COLOR_9 hover:border-COLOR_8 focus:border-COLOR_8 dark:border-COLOR_14 dark:hover:border-COLOR_3 dark:focus:border-COLOR_3')} 
        value={value} onChange={onChange}
      />
    </div>
  );
};
