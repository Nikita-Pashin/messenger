'use client';

import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import classNames from "classnames";
import { redirect } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSignup } from "../model/useSignup";
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
  const [loginMessage, setLoginMessage] = useState('');
  const [fullnameMessage, setFullnameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const { mutate, isPending, isSuccess, error } = useSignup();

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

  const onChangeFullname = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    const re = /^[A-Za-zА-Яа-я0-9]+$/;

    if (value === "" || re.test(value)) {
      setFullname(value);
      setFullnameMessage('');
    } else {
      setFullnameMessage(d['LoginForm.Only numbers, Latin letters and Cyrillic']);
    }
  };

  const onClick = () => {
    if (!valueLogin || !valuePassword || !fullname) {
      setFormMessage(d['SignupForm.Fill in all fields']);
      return;
    }

    mutate({ login: valueLogin, password: valuePassword, fullname });
  };

  useEffect(() => {
    if (isSuccess) {
      redirect('/auth');
    }
  }, [isSuccess]);

  useEffect(() => {
    const isConflict = error?.message.includes('409');

    if (isConflict) {
      setFormMessage(d['LoginForm.This login is not available']);
    };
  }, [error?.message])

  return (
    <div className={classNames(className, 'bg-white dark:bg-COLOR_12 p-8 rounded-md')}>
      <Input disabled={isPending} label={d['LoginForm.login']} value={valueLogin} onChange={onChangeLogin} required />
      {loginMessage && (
        <div className="text-COLOR_15 mt-3 text-center">{loginMessage}</div>
      )}

      <Input disabled={isPending} label={d['LoginForm.fullname']} className="mt-6" value={fullname} onChange={onChangeFullname} required />
      {fullnameMessage && (
        <div className="text-COLOR_15 mt-3 text-center">{fullnameMessage}</div>
      )}

      <Input disabled={isPending} label={d['LoginForm.password']} className="mt-6" value={valuePassword} onChange={onChangePassword} required />
      {passwordMessage && (
        <div className="text-COLOR_15 mt-3 text-center">{passwordMessage}</div>
      )}

      {formMessage && (
        <div className="text-COLOR_15 mt-3 text-center">{formMessage}</div>
      )}

      <Button disabled={isPending} className="mt-6" onClick={onClick}>
        {d['LoginForm.signup']}
      </Button>
      <AppLink href={isPending ? '#' : '/auth'} className="block mt-3 text-center">
        {d['LoginForm.I already have an account']}
      </AppLink>
    </div>
  );
};
