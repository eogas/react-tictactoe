import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
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

class Board extends React.Component {
    renderSquare(i) {
        return (<Square
            inWinningRow={this.props.winningRow.includes(i)}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moveLocation: null
            }],
            stepNumber: 0,
            xIsNext: true,
            reverseMoveList: false
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

        const moves = history.map((step, move) => {
            const label = move ?
                'Go to move #' + move :
                'Go to game start';
            
            let moveClass = '';

            if (move === this.state.stepNumber) {
                moveClass = 'current-move';
            }

            let coords = '';
            const whoMoved = move % 2 ? 'X' : 'O';

            if (step.moveLocation !== null) {
                const y = Math.floor(step.moveLocation / 3);
                const x = step.moveLocation % 3;

                coords = `${whoMoved} (${x}, ${y})`;
            }
            
            return (
                <li key={move} className="move">
                    <button
                        className={moveClass}
                        onClick={() => this.jumpTo(move)}
                    >
                        {label}
                    </button>
                    <span className='coords'>{coords}</span>
                </li>
            );
        });

        if (this.state.reverseMoveList) {
            moves.reverse();
        }

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
                    <button
                        onClick={() => this.handleReverse()}
                    >
                        Reverse
                    </button>
                    <ol>{moves}</ol>
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
