import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import MyJobs from './pages/MyJobs/MyJobs';
import MySitters from './pages/MySitters/MySitters';
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
      <Router>
        <SnackBarProvider>
          <AuthProvider>
            <ActiveConversationProvider>
              <ConversationProvider>
                <SocketProvider>
                  <NavBar />
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/landing-page" component={LandingPage} />
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute exact path="/my-jobs" component={MyJobs} />
                    <ProtectedRoute exact path="/my-sitters" component={MySitters} />
                    <ProtectedRoute exact path="/messages" component={Messages} />
                    <ProtectedRoute exact path="/dashboard">
                      <Dashboard />
                    </ProtectedRoute>
                    <Route path="/sitter/detail/:id" component={SitterDetails} />
                    <ProtectedRoute path="/booking" component={Booking} />
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
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
