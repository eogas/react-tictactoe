import React, { useState } from 'react';

export function MoveList(props) {
    const [isReversed, setIsReversed] = useState(false);

    const renderMove = (step, moveIndex) => {
        const label = moveIndex ?
            'Go to move #' + moveIndex :
            'Go to game start';

        let moveClass = '';

        if (moveIndex === props.currentStep) {
            moveClass = 'current-move';
        }

        let coords = '';
        const whoMoved = moveIndex % 2 ? 'X' : 'O';

        if (step.moveLocation !== null) {
            const y = Math.floor(step.moveLocation / 3);
            const x = step.moveLocation % 3;

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

    let moves = props.steps.map((step, moveIndex) => renderMove(step, moveIndex));

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
