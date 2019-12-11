import * as React from 'react';

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
        return <div>
            <h3>{item.name}</h3>
        </div>
    }
}