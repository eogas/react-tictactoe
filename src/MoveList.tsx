import React, { useState } from 'react';
import {
    Row,
    Button,
    ListGroup
} from 'react-bootstrap';

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

        let moveClass = 'light';

        if (moveIndex === props.currentStep) {
            moveClass = 'dark';
        }

        let coords = '';
        const whoMoved = moveIndex % 2 ? 'X' : 'O';

        if (moveLocation !== null) {
            const y = Math.floor(moveLocation / 3);
            const x = moveLocation % 3;

            coords = `${whoMoved} (${x}, ${y})`;
        }

        return (
            <ListGroup.Item
                action
                variant={moveClass}
                onClick={() => props.jumpTo(moveIndex)}>
                {label}
                <span className='coords'>{coords}</span>
            </ListGroup.Item>
        );
    };

    let moves = props.moveLocations.map(
        (moveLocation, moveIndex) => renderMove(moveLocation, moveIndex));

    if (isReversed) {
        moves.reverse();
    }

    return (<>
        <Row>
            <Button
                onClick={() => setIsReversed(!isReversed)}
            >
                Reverse
            </Button>
        </Row>
        <Row className="my-2">
            <ListGroup>{moves}</ListGroup>
        </Row>
    </>);
}
