import React from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from './index';
import LoginForm from './components/LoginForm';

function App() {
  const { store } = React.useContext(Context);

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

  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `User ${store.user.email} is authorized`
          : 'AUTHORIZE FOR PROCEED'}
      </h1>
      <button onClick={() => store.logout()}>Logout</button>
    </div>
  );
}

export default observer(App);
