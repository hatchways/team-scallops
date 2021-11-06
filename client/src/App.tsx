import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import List from './pages/ProfileList/List';
import Dashboard from './pages/Dashboard/Dashboard';
import Messages from './pages/Messages/Messages';
import NavBar from './components/NavBar/NavBar';
import Booking from './pages/Booking/Booking';
import LandingPage from './pages/landingPage/LandingPage';
import SitterDetails from './pages/SitterDetails/SitterDetails';
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedError from './components/UnauthorizedError/UnauthorizedError';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { ActiveConversationProvider } from './context/useActiveConversationContext';
import { ConversationProvider } from './context/useConversationContext';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <ActiveConversationProvider>
              <ConversationProvider>
                <SocketProvider>
                  <NavBar />
                  <Switch>
                    <Route path="/search" component={List} />

                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/landing-page" component={LandingPage} />
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute exact path="/my-jobs" component={Booking} />
                    <ProtectedRoute exact path="/my-sitters" component={Booking} />
                    <ProtectedRoute exact path="/messages" component={Messages} />
                    <ProtectedRoute exact path="/dashboard">
                      <Dashboard />
                    </ProtectedRoute>
                    <Route path="/sitter/detail/:id" component={SitterDetails} />
                    <Route exact path="/unauthorized" component={UnauthorizedError} />
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
