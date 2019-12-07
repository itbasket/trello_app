import * as React from 'react';
import { Board } from '../Board';

interface BoardsProps {
    boards: Array<any>
}

export class Boards extends React.Component<BoardsProps, any> {
    

    public render() {
        const { boards } = this.props;
        return (boards.map(board => {
            return (
              <div className="col-6" key={board.id}>
                <Board 
                  item={board} 
                />
              </div>
            );
          })
        )
    }
}