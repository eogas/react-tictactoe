import React from 'react';

export class MoveList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isReversed: false
        };
    }

    toggleReverse() {
        this.setState({
            isReversed: !this.state.isReversed
        });
    }

    renderMove(step, moveIndex) {
        const label = moveIndex ?
            'Go to move #' + moveIndex :
            'Go to game start';

        let moveClass = '';

        if (moveIndex === this.props.currentStep) {
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
                    onClick={() => this.props.jumpTo(moveIndex)}
                >
                    {label}
                </button>
                <span className='coords'>{coords}</span>
            </li>
        );
    }

    render() {
        let moves = this.props.steps.map((step, moveIndex) => this.renderMove(step, moveIndex));

        if (this.state.isReversed) {
            moves.reverse();
        }

        return (<>
            <button
                onClick={() => this.toggleReverse()}
            >
                Reverse
            </button>
            <ol>{moves}</ol>
        </>);
    }
}
