import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import Messages from './pages/Messages/Messages';
import MyJobs from './pages/MyJobs/MyJobs';
import MySitters from './pages/MySitters/MySitters';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';

import './App.css';
import { ActiveConversationProvider } from './context/useActiveConversationContext';
import { ConversationProvider } from './context/useConversationContext';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <ActiveConversationProvider>
              <ConversationProvider>
                <SocketProvider>
                  <NavBar />
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route path="/profile" component={Profile} />
                    <Route exact path="/my-jobs" component={MyJobs} />
                    <Route exact path="/my-sitters" component={MySitters} />
                    <Route exact path="/messages" component={Messages} />
                    <Route exact path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route path="*">
                      <Redirect to="/login" />
                    </Route>
                  </Switch>
                </SocketProvider>
              </ConversationProvider>
            </ActiveConversationProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
