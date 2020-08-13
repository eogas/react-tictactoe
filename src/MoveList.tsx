import React, { useState } from 'react';

interface Props {
    currentStep: number,
    jumpTo: (move: number) => void,
    moveLocations: Array<number | null>
}

export function MoveList(props: Props) {
    const [isReversed, setIsReversed] = useState(false);

    const renderMove = (moveLocation: number | null, moveIndex: number) => {
        const label = moveIndex ?
            'Go to move #' + moveIndex :
            'Go to game start';

        let moveClass = '';

        if (moveIndex === props.currentStep) {
            moveClass = 'current-move';
        }

        let coords = '';
        const whoMoved = moveIndex % 2 ? 'X' : 'O';

        if (moveLocation !== null) {
            const y = Math.floor(moveLocation / 3);
            const x = moveLocation % 3;

            coords = `${whoMoved} (${x}, ${y})`;
        }
        
        return (
            <li key={moveIndex} className="move">
                <button
                    className={moveClass}
                    onClick={() => props.jumpTo(moveIndex)}
                >
                    {label}
                </button>
                <span className='coords'>{coords}</span>
            </li>
        );
    };

    let moves = props.moveLocations.map(
        (moveLocation, moveIndex) => renderMove(moveLocation, moveIndex));

    if (isReversed) {
        moves.reverse();
    }

    return (<>
        <button
            onClick={() => setIsReversed(!isReversed)}
        >
            Reverse
        </button>
        <ol>{moves}</ol>
    </>);
}
