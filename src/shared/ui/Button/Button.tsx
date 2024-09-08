import classNames from 'classnames';
import { ComponentProps, FC, MouseEvent, ReactNode } from 'react';
import { Button as BtnBase } from 'sparkles-ui-base';
import s from './Button.module.scss';

type ButtonProps = ComponentProps<typeof BtnBase>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    onClick,
    ...restProps
  } = props;

  return (
    <BtnBase {...restProps} className={classNames(className, s.button, "text-white block bg-COLOR_8 dark:bg-COLOR_3 dark:hover:bg-COLOR_3 transition-all duration-100 ease-linear w-full h-10 hover:bg-COLOR_11")} {...(onClick ? { onClick } : {})}>{children}</BtnBase>
  );
};
