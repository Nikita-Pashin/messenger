'use client';

import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import classNames from "classnames";
import { redirect } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { signup } from "../model/signup";
import { Dictionary } from "@/shared/i18n";
import { AppLink } from "@/shared/ui/AppLink/AppLink";

interface SignupProps {
  className?: string;
  d: Dictionary,
}

export const Signup: FC<SignupProps> = (props) => {
  const {
    className,
    d,
  } = props;

  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [fullname, setFullname] = useState('');

  const { mutate, isSuccess, isPending } = signup();

  const onChangeLogin = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValueLogin(value);
  };

  const onChangePassword = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(value);
  };

  const onChangeFullname = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFullname(value);
  };

  const onClick = () => {
    mutate({ login: valueLogin, password: valuePassword, fullname });
  };

  useEffect(() => {
    if (isSuccess) {
      redirect('/');
    }
  }, [isSuccess]);

  return (
    <div className={classNames(className, 'bg-white dark:bg-COLOR_12 p-8 rounded-md')}>
      <Input disabled={isPending} label={d['LoginForm.login']} value={valueLogin} onChange={onChangeLogin} required />
      <Input disabled={isPending} label={d['LoginForm.fullname']} className="mt-6" value={valuePassword} onChange={onChangePassword} required />
      <Input disabled={isPending} label={d['LoginForm.password']} className="mt-6" value={fullname} onChange={onChangeFullname} required />
      <Button disabled={isPending} className="mt-6" onClick={onClick}>
        {d['LoginForm.signup']}
      </Button>
      <AppLink href={isPending ? '#' : '/auth'} className="block mt-3 text-center">
        {d['LoginForm.I already have an account']}
      </AppLink>
    </div>
  );
};
