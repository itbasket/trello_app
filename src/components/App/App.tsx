import * as React from 'react';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';
import { Boards } from '../Boards';
import './App.css';

const { REACT_APP_API_KEY, REACT_APP_APP_NAME, REACT_APP_REDIRECT_URL, REACT_APP_SCOPE } = process.env;
const TOKEN_STORAGE_KEY = 'TOKEN';

interface Board {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface AppState {
  token: string;
  boards: Array<any>;
  user: string;
}

export class App extends React.Component<any, AppState> {
  public state = {
    token: '',
    boards: [],
    user: ''
  }

  private async setToken(token: string) {
    this.setState({
      token
    });
    await setToLocalStorage(TOKEN_STORAGE_KEY, token);
    await this.getUser();
    await this.getBoards();
  }

  private getBoards = () => {
    fetch(`https://trello.com/1/members/me/boards?token=${this.state.token}&key=${REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                boards: result
              })
            }
        );
  }

  private async getToken() {
    const token = await getFromLocalStorage(TOKEN_STORAGE_KEY);
    return token;
  }

  private getTokenFromUrl() {
    return window.location.hash.split('=')[1];
  }

  private getUser() {
    fetch(`https://trello.com/1/members/me?fields=all&key=${REACT_APP_API_KEY}&token=${this.state.token}`)
      .then(res => res.json())
      .then(
          (result) => {
            this.setState({
              user: result.username
            });
          }
      );
  }

  private isLoggedIn() {
    return !!this.state.token;
  }

  private renderHeader() {
    const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;
    
    return <header className='navbar text-light bg-primary'> 
      <div className='navbar-text'>
        {
          this.isLoggedIn() ? `Hello, ${this.state.user}` : <a className='login-link' href={requestUrl}>Login with Trello account</a>
        }
      </div>
    </header>
  }

  private renderContent() {
    return <main>
      {
        this.isLoggedIn() ? <Boards boards={this.state.boards} token={this.state.token} /> : <h2>Please login</h2>
      }
    </main>
  }

  public componentDidMount() {
    //const savedToken = await this.getToken();
    const newToken = this.getTokenFromUrl();
    this.setToken(newToken);
    // this.setState({
    //   boards: getBoards(this.state.token, REACT_APP_API_KEY);
    // });
    
  }

  public render() {
    return <div>
      {this.renderHeader()}
      {this.renderContent()}
    </div>
  }


}

