import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import './index.css';

import { Board } from './Board';
import { MoveList } from './MoveList';

interface Props {}

interface GameState {
    squares: Array<string | null>,
    moveLocation: number | null
}

function Game(props: Props) {
    const defaultState: GameState = {
        squares: Array(9).fill(null),
        moveLocation: null
    };

    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([defaultState]);

    const handleClick = (i: number) => {
        // Discard anything after the current step number, in case we're currently
        // viewing an older state
        const visibleHistory = history.slice(0, stepNumber + 1);

        const current = visibleHistory[visibleHistory.length - 1];
        const squares = current.squares.slice();

        if (calculateWinState(squares).winner || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        setStepNumber(visibleHistory.length);
        setXIsNext(!xIsNext);
        setHistory(visibleHistory.concat([{
            squares: squares,
            moveLocation: i
        }]));
    }

    const jumpTo = (step: number) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const current = history[stepNumber];
    const winState = calculateWinState(current.squares);
    const tieGame = isDraw(current.squares);

    let status;
    if (winState.winner) {
        status = 'Winner: ' + winState.winner;
    }
    else if (tieGame) {
        status = 'It\'s a draw!';
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Board
                        squares={current.squares}
                        winningRow={winState.winningRow}
                        onClick={(i) => handleClick(i)}
                    />
                </Col>
                <Col md="auto">
                    <h5>{status}</h5>
                    <MoveList
                        moveLocations={history.map((step) => step.moveLocation)}
                        currentStep={stepNumber}
                        jumpTo={(step) => jumpTo(step)}/>
                </Col>
            </Row>
        </Container>
    );
}

const isDraw = (squares: Array<string | null>) => !squares.includes(null);

function calculateWinState(squares: Array<string | null>) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winningRow: lines[i]
            };
        }
    }

    return {
        winner: null,
        winningRow: []
    };
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
