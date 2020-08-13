import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './Board';
import { MoveList } from './MoveList';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moveLocation: null
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick(i) {
        // Discard anything after the current step number, in case we're currently
        // viewing an older state
        const history = this.state.history.slice(0, this.state.stepNumber + 1);

        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinState(squares).winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
                moveLocation: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    handleReverse() {
        this.setState({
            reverseMoveList: !this.state.reverseMoveList
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
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
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winningRow={winState.winningRow}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <MoveList
                        steps={history}
                        currentStep={this.state.stepNumber}
                        jumpTo={(step) => this.jumpTo(step)}/>
                </div>
            </div>
        );
    }
}

const isDraw = (squares) => !squares.includes(null);

function calculateWinState(squares) {
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
