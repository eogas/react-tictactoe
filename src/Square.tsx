import React from 'react';

export interface Props {
    inWinningRow: boolean,
    value: string | null,
    onClick: () => void
}

export function Square(props: Props) {
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
