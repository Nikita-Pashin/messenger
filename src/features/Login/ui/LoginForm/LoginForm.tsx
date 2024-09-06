'use client';

import { redirect } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { login } from "../../model/login";
import { Input } from "@/shared/ui/Input/Input";
import classNames from "classnames";
import { Button } from "@/shared/ui/Button/Button";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const {
    className,
  } = props;

  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const { mutate, isSuccess, isPending } = login();

  const onChangeLogin = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValueLogin(value);
  };

  const onChangePassword = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(value);
  };

  const onClick = () => {
    mutate({ login: valueLogin, password: valuePassword });
  };

  useEffect(() => {
    if (isSuccess) {
      redirect('/')
    }
  }, [isSuccess]);

  return (
    <div className={classNames(className, 'bg-white dark:bg-COLOR_12 p-8 rounded-md')}>
      <Input disabled={isPending} label="First name" value={valueLogin} onChange={onChangeLogin} required />
      <Input disabled={isPending} label="Bio" className="mt-6" value={valuePassword} onChange={onChangePassword} required />
      <Button disabled={isPending} className="mt-6" onClick={onClick}>
        Войти
      </Button>
    </div>
  );
};
