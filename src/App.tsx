import React, { useEffect } from 'react';
import './App.scss';
import { Switch, Route, BrowserRouter, withRouter, Redirect, } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/redux-store';
import { compose } from 'redux';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import createSuspense from './hoc/suspense';
import { setToken } from './API/api'
import { getIsAuthSel } from './selectors/profile';


const LoginLazy = React.lazy(() => import('./components/auth/Login'))
const ProfileLazy = React.lazy(() => import('./components/profile/ProfileContainer'))
const UsersLazy = React.lazy(() => import('./components/users/Users'))
const RegisterLazy = React.lazy(() => import('./components/auth/register'))
const ProfileWithSuspense = createSuspense(ProfileLazy)
const LoginWithSuspense = createSuspense(LoginLazy)
const UsersWithSuspense = createSuspense(UsersLazy)
const RegisterWithSuspense = createSuspense(RegisterLazy)


const App = () => {
  const auht = useSelector(getIsAuthSel)
  const dispatch = useDispatch()
  const setAuth = (auth: boolean) => {
    dispatch(setAuth(auth))
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      setToken(token)
    }
  }, [])
  return (
    <div className="wrapper" >
      <Header />
      <div className="wrapper__body">
        <Navbar />
        <div className='wrapper__content'>
          <Switch>
            <Route path="/" exact><Redirect to="/profile" /></Route>
            <Route path="/profile/:userId?" render={() => <ProfileWithSuspense />} />
            <Route path="/users" render={() => <UsersWithSuspense />} />
            <Route path="/login" render={() => <LoginWithSuspense />} />
            <Route path="/register" render={() => <RegisterWithSuspense />} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

const MainApp = () => {
  return <BrowserRouter>
    <Provider store={store} >
      <AppConteiner />
    </Provider>
  </BrowserRouter>
}



const AppConteiner = compose<React.ComponentType>(
  withRouter)(App)

export default MainApp;
