import * as React from 'react';
import { setToLocalStorage, getFromLocalStorage, getBoards } from '../../utils';
import { Boards } from '../Boards';

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
}

export class App extends React.Component<any, AppState> {
  public state = {
    token: '',
    boards: []
  }

  private async setToken(token: string) {
    this.setState({
      token,
      boards: await getBoards(token, REACT_APP_API_KEY)
    });
    await setToLocalStorage(TOKEN_STORAGE_KEY, token);
  }

  private async getToken() {
    const token = await getFromLocalStorage(TOKEN_STORAGE_KEY);
    return token;
  }

  private getTokenFromUrl() {
    return window.location.hash.split('=')[1];
  }

  private isLoggedIn() {
    return !!this.state.token;
  }

  private renderHeader() {
    const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;
    
    return <header> 
      {
        this.isLoggedIn() ? 'Hello user' : <a href={requestUrl}>Login with Trello account</a>
      }
    </header>
  }

  private renderContent() {
    return <main>
      {
        this.isLoggedIn() ? <Boards boards={this.state.boards} token={this.state.token}/> : <h2>Please login</h2>
      }
    </main>
  }

  public componentDidMount() {
    //const savedToken = await this.getToken();
    const newToken = this.getTokenFromUrl();
    this.setToken(newToken);
    /*this.setState({
      boards: getBoards(this.state.token, REACT_APP_API_KEY);
    });*/
    
  }

  public render() {
    
    return <div>
      {this.renderHeader()}
      {this.renderContent()}
    </div>
  }


}

