'use client';

import { redirect } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { login } from "../../model/login";

export const LoginForm = () => {
  const [valueLogin, setValueLogin] = useState('Nick2');
  const [valuePassword, setValuePassword] = useState('root2');

  const { mutate, isSuccess } = login();

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
    <div>
      <div>
        <input value={valueLogin} onChange={onChangeLogin} />
      </div>
      <div>
        <input value={valuePassword} onChange={onChangePassword} />
      </div>
      <button type="button" onClick={onClick}>
        Войти
      </button>
    </div>
  );
};
