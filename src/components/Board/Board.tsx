import * as React from 'react';
import { List } from '../List';
import './Board.css';

const { REACT_APP_API_KEY } = process.env;

interface BoardItem {
    id: string;
    name: string;
}

interface BoardProps {
    item: BoardItem;
    token: string;
}

interface ListItem {
    id: string;
    name: string;
}

interface BoardState {
    lists: Array<ListItem>;
}

export class Board extends React.Component<BoardProps, BoardState> {
    public state: BoardState = {
        lists: []
    }

    private getLists() {
        const { item, token } = this.props;
        fetch(`https://trello.com//1/boards/${item.id}/lists?cards=none&card_fields=all&filter=open&fields=all&key=${REACT_APP_API_KEY}&token=${token}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        lists: result
                    });
                }
            );
    }

    public componentDidMount() {
        this.getLists();
    }

    render() {
        const { item, token } = this.props;
        return <div className='board'>
            <p>{item.name}</p>
            <div>
                {this.state.lists.map(list => {
                    return (
                    <div key={list.id}>
                        <List
                            item={list}
                            token={token} 
                            
                        />
                    </div>
                    );
                })}
            </div>
        </div>
    }
}