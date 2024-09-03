'use client';

import { ChangeEvent, useState } from "react";

export default function Auth() {
  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const onChangeLogin = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValueLogin(value);
  };

  const onChangePassword = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(value);
  };

  const onClick = () => {
    fetch('api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login: 'Nick2', password: 'root2' }),
      headers: {
        'content-type': 'application/json',
      }
    })
  };

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
