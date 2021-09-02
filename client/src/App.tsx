import React from 'react';
import { observer } from 'mobx-react-lite';

import LoginForm from './components/LoginForm';

import { Context } from './index';
import { IUser } from './models/IUser';
import { UserService } from './services/UserService';

function App() {
  const { store } = React.useContext(Context);
  const [users, setUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `User ${store.user.email} is authorized`
          : 'AUTHORIZE FOR PROCEED'}
      </h1>
      <h2>
        {store.user.isActivated
          ? 'Account is activated by email'
          : 'Account not activated'}
      </h2>
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={getUsers}>Show users list</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default observer(App);
