import * as React from 'react';
import { Board } from '../Board';
import './Boards.css';

interface BoardsProps {
  boards: Array<any>;
  token: string;
}

interface BoardsState {
  user: object;
}

export class Boards extends React.Component<BoardsProps, BoardsState> {

  public render() {
    const { boards, token } = this.props;
    return (boards.map(board => {
        return (
          <div className="board-wrapper" key={board.id}>
            <Board 
              item={board} 
              token={token}
            />
          </div>
        );
      })
    )
  }
}