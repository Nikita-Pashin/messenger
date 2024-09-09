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
  const [loginMessage, setLoginMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');
  
  const { mutate, isSuccess, isPending, error } = login();

  const clearErrors = () => {
    setLoginMessage('');
    setPasswordMessage('');
    setFormMessage('');
  };
  
  const onChangeLogin = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    const re = /^[A-Za-z0-9]+$/;

    if (value === "" || re.test(value)) {
      setValueLogin(value);
      setLoginMessage('');
    } else {
      setLoginMessage(d['LoginForm.Only numbers and latin letters']);
    }
  };

  const onChangePassword = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    const re = /^[A-Za-z0-9]+$/;

    if (value === "" || re.test(value)) {
      setValuePassword(value);
      setPasswordMessage('');
    } else {
      setPasswordMessage(d['LoginForm.Only numbers and latin letters']);
    }
  };

  const onClick = () => {
    if (!valueLogin || !valuePassword) {
      setFormMessage(d['SignupForm.Fill in all fields']);
      return;
    }

    clearErrors();
    mutate({ login: valueLogin, password: valuePassword });
  };

  const onClickSignup = () => {
    redirect('/signup');
  };

  useEffect(() => {
    if (isSuccess) {
      redirect('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error?.message.includes('404')) {
      setFormMessage(d['LoginForm.User not found']);
    }
  }, [error?.message]);

  return (
    <div className={classNames(className, 'bg-white dark:bg-COLOR_12 p-8 rounded-md')}>
      <Input disabled={isPending} label={d["LoginForm.login"]} value={valueLogin} onChange={onChangeLogin} required />
      {loginMessage && (
        <div className="text-COLOR_15 mt-3 text-center">{loginMessage}</div>
      )}

      <Input disabled={isPending} label={d['LoginForm.password']} className="mt-6" value={valuePassword} onChange={onChangePassword} required />
      {passwordMessage && (
        <div className="text-COLOR_15 mt-3 text-center">{passwordMessage}</div>
      )}

      {formMessage && (
        <div className="text-COLOR_15 mt-3 text-center">{formMessage}</div>
      )}

      <Button disabled={isPending} className="mt-6" onClick={onClick}>
        {d["LoginForm.entry"]}
      </Button>
      <AppLink href={isPending ? '#' : '/auth/signup'} className="mt-3 block text-center" onClick={onClickSignup}>
        {d["LoginForm.signup"]}
      </AppLink>
    </div>
  );
};
