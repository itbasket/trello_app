import * as React from 'react';
import { Card } from '../Card';

const { REACT_APP_API_KEY } = process.env;

interface ListItem {
    id: string;
    name: string;
}

interface ListProps {
    item: any;
    token: string;
}

interface CardItem {
    id: string;
    name: string;
}

interface ListState {
    cards: Array<CardItem>;
}

export class List extends React.Component<ListProps, ListState> {
    public state: ListState = {
        cards: []
    }

    private getCards() {
        const { item, token } = this.props;
        fetch(`https://trello.com//1/lists/${item.id}/cards?key=${REACT_APP_API_KEY}&token=${token}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
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
                    <div key={card.id}>
                        <Card 
                            item={card} 
                        />
                    </div>
                    );
                })}
            </div>
        </div>
    }
}

