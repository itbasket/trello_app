import * as React from 'react';

interface Item {
    name: string
}

interface BoardProps {
    item: Item
}

export class Board extends React.Component<BoardProps, any> {


    render() {
        const { item } = this.props;
        return <div>
            <h1>{item.name}</h1>
        </div>
    }
}