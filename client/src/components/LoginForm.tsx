import React from 'react';

import { Context } from '../index';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const { store } = React.useContext(Context);

  return (
    <div>
      <input
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
        type="text"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
        type="password"
        placeholder="Password"
      />
      <button onClick={() => store.login(email, password)}>Login</button>
      <button onClick={() => store.registration(email, password)}>
        Registration
      </button>
    </div>
  );
};
