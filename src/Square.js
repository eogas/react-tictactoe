import React from 'react';

export function Square(props) {
    let className = 'square';

    if (props.inWinningRow) {
        className = className + ' winning-square';
    }

    return (
        <button
            className={className}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
