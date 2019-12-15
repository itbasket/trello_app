import * as React from 'react';
import './Card.css';

interface Item {
    id: string;
    name: string;
}

interface CardProps {
    item: Item;
}

export class Card extends React.Component<any, any> {
    
    render() {
        const { item } = this.props;
        return <div className='card'>
            <p>{item.name}</p>
        </div>
    }
}