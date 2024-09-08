'use client';

import { redirect } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { login } from "../../model/login";
import { Input } from "@/shared/ui/Input/Input";
import classNames from "classnames";
import { Button } from "@/shared/ui/Button/Button";
import { Dictionary } from "@/shared/i18n";
import { AppLink } from "@/shared/ui/AppLink/AppLink";

interface LoginFormProps {
  d: Dictionary
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const {
    className,
    d,
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

  const onClickSignup = () => {
    redirect('/signup');
  }

  useEffect(() => {
    if (isSuccess) {
      redirect('/');
    }
  }, [isSuccess]);

  return (
    <div className={classNames(className, 'bg-white dark:bg-COLOR_12 p-8 rounded-md')}>
      <Input disabled={isPending} label={d["LoginForm.login"]} value={valueLogin} onChange={onChangeLogin} required />
      <Input disabled={isPending} label={d['LoginForm.password']} className="mt-6" value={valuePassword} onChange={onChangePassword} required />
      <Button disabled={isPending} className="mt-6" onClick={onClick}>
        {d["LoginForm.entry"]}
      </Button>
      <AppLink href={isPending ? '' : '/auth/signup'} className="mt-3 block text-center" onClick={onClickSignup}>
        {d["LoginForm.signup"]}
      </AppLink>
    </div>
  );
};
