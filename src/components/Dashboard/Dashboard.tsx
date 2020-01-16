import * as React from 'react';
import { Board } from '../Board';
import { getFromLocalStorage } from '../../utils';
import { RouteChildrenProps } from 'react-router-dom';
import './Dashboard.css';
import { connect } from 'react-redux';
import { AppState, increaseCount, decreaseCount } from '../../store';

const { REACT_APP_API_KEY } = process.env;
const TOKEN_STORAGE_KEY = 'TOKEN';

interface DashboardState {
  boards: Array<any>;
  token: any;
  myCount?: number;
}

interface DashboardProps extends RouteChildrenProps {
  onIncrease?: () => void,
  onDecrease?: () => void
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  public state: DashboardState = {
    boards: [],
    token: ''
  }

  private getBoards = async () => {
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

  public componentDidMount() {
    this.setState({
      token: getFromLocalStorage(TOKEN_STORAGE_KEY)
    })
    this.getBoards();
}

  public render() {
    return (this.state.boards.map(board => {
        return (
          <div className="board-wrapper" key={board.id}>
            <Board 
              item={board} 
              token={this.state.token}
            />
          </div>
        );
      })
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    myCount: state.count
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrease: () => dispatch(increaseCount),
    onDecrease: () => dispatch(decreaseCount)
  }
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export { ConnectedDashboard as Dashboard}