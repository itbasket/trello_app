import * as React from 'react';
import { Card } from '../Card';
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

interface CardItem {
    id: string;
    name: string;
}

interface BoardState {
    cards: Array<CardItem>;
}

export class Board extends React.Component<BoardProps, BoardState> {
    public state: BoardState = {
        cards: []
    }

    private getCards() {
        const { item, token } = this.props;
        fetch(`https://trello.com//1/boards/${item.id}/cards?key=${REACT_APP_API_KEY}&token=${token}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cards: result
                    });
                }
            );
    }

    public componentDidMount() {
        this.getCards();
    }

    render() {
        const { item } = this.props;
        return <div className='board'>
            <p>{item.name}</p>
            <div>
                {this.state.cards.map(card => {
                    return (
                    <div>
                        <Card 
                        key={card.id}
                        item={card} 
                        />
                    </div>
                    );
                })}
            </div>
        </div>
    }
}