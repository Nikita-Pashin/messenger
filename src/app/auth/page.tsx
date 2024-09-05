'use client';

import { login } from "@/features/Auth/model/login";
import { redirect } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function Auth() {
  const [valueLogin, setValueLogin] = useState('Nick2');
  const [valuePassword, setValuePassword] = useState('root2');

  const { mutate, mutateAsync, isSuccess } = login();

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
