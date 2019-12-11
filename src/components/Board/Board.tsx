import * as React from 'react';
import { Card } from '../Card';

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
        const cards = fetch(`https://trello.com//1/boards/${item.id}/cards?key=${REACT_APP_API_KEY}&token=${token}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                return result;
            }
        );
    return cards;
    }

    private async setCards() {
        this.setState({
            cards: await this.getCards()
        });
    }

    public componentDidMount() {
        this.setCards();
    }

    render() {
        const { item } = this.props;
        console.log(this.state.cards);
        return <div>
            <h1>{item.name}</h1>
            <div>
                {this.state.cards.map(card => {
                    console.log(card);
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