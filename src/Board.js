import React from 'react';
import { Square } from './Square';

export function Board(props) {
    const renderSquare = (i) => {
        return (<Square
            inWinningRow={props.winningRow.includes(i)}
            value={props.squares[i]}
            onClick={() => props.onClick(i)} />);
    }

    const renderRowSquares = (rowNumber) => {
        return (
            [0, 1, 2]
            .map((column) => (rowNumber * 3) + column)
            .map((squareIndex) => renderSquare(squareIndex))
        );
    };

    const renderRows = () => {
        let squares = [0, 1, 2].map((rowNum) => renderRowSquares(rowNum));

        return squares.map((row) => (
            <div className="board-row">
                {row}
            </div>
        ));
    };

    return (<div>{renderRows()}</div>);
}
