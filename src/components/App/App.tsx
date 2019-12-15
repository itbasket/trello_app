import * as React from 'react';
import { Route, Link, RouteComponentProps, Redirect, Switch, RouteChildrenProps } from 'react-router-dom';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';
import { routes, AppRoute, ROUTES_URLS } from './routes';
import './App.css';
import { OAuth } from '../OAuth/OAuth';
import { ProtectedRoute } from '../ProtectedRoute';


const { REACT_APP_API_KEY, REACT_APP_APP_NAME, REACT_APP_REDIRECT_URL, REACT_APP_SCOPE } = process.env;
const TOKEN_STORAGE_KEY = 'TOKEN';

interface AppState {
  token: string;
  userProfile: any;
}

export class App extends React.Component<any, AppState> {
  public state = {
    token: '',
    userProfile: undefined
  }

  private async setToken(token: string) {
    this.setState({
      token
    });
    setToLocalStorage(TOKEN_STORAGE_KEY, token);
  }

  private async getToken() {
    if (this.state.token) {
      return;
    }

    const token = getFromLocalStorage(TOKEN_STORAGE_KEY);
    if (!token) {
      return this.navigateToLogin();
    }

    const url = `https://api.trello.com/1/members/me?key=${REACT_APP_API_KEY}&token=${token}`;
    const response = await fetch(url);

    if (response.ok === true && response.status === 200) {
      const userProfile = await response.json();
      this.setProfile(userProfile);
      this.setToken(token);
      return this.navigateToDashboard();
    }

    return this.navigateToLogin();
  }

  private navigateToLogin() {
    this.props.history.push(ROUTES_URLS.LOGIN);
  }

  private navigateToDashboard() {
    this.props.history.push(ROUTES_URLS.DASHBOARD);
  }

  private setProfile(userProfile: any) {
    this.setState({userProfile});
  }

  private isLoggedIn() {
    return !!this.state.token;
  }

  private renderHeader() {
    const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;
    
    return <header className='navbar text-light bg-primary'> 
      <div className='navbar-text'>
        {
          routes.map((route: AppRoute, i: number) => route.isHidden ? null : <Link key={i} to={route.path}>{route.title}</Link>)
        }
      </div>
    </header>
  }

  private renderContent = () => {
    return <main>
        <Switch>
        {routes.map(this.renderRoute)}
        <Route path="/oauth" render={(props: RouteChildrenProps) => <OAuth {...props} onSetToken={this.setToken} />} />
        <Redirect to="/404" />
      </Switch>
    </main>
  }

  private renderRoute = (route: AppRoute, i: number) => {
    if (route.isProtected) {
      return <ProtectedRoute 
        exact={route.exact}
        key={i} path={route.path}
        render={(props) => route.render({ ...props })} 
        isAuthenticated={this.isLoggedIn()} />
    } else {
      return <Route
        exact={route.exact}
        key={i} path={route.path}
        render={(props) => route.render({ ...props })} />
    }
  }

  public componentDidMount() {
    this.getToken();
  }

  public render() {
    return <div>
      {this.renderHeader()}
      {this.renderContent()}
    </div>
  }


}

