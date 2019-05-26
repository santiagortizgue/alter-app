import React, { Component } from 'react';
import './Game.scss';

import stores from '../../stores/Stores';
import { observer } from 'mobx-react';

interface GameProps {
    match?: any
}

interface GameState {
    game?: any
}

@observer class Game extends Component<GameProps, GameState> {
    constructor(props: any) {
        super(props);

        this.state = {
            game: null
        }
    }

    getId() {
        return this.props.match.params.id;
    }

    componentDidMount() {
        stores.gameStore.findGame(this.getId());
    }

    componentWillUnmount() {
        stores.gameStore.cleanGame();
    }

    render() {

        if (!this.state.game) {
            if (stores.gameStore.game) {
                this.setState({
                    game: stores.gameStore.game
                });
            }
            return <div className="Loading"><p>Loading Game...</p></div>;
        }

        return (
            <section className="Game">

                <div className="Game-cont">

                    <div className="Game-left">

                        <div id="canvasGame">

                        </div>

                    </div>

                    <div className="Game-right">

                        <div className="Game-score">
                            <div className="Game-playerA">
                                <h2>0</h2>
                                <h4>Player A</h4>
                            </div>

                            <div className="Game-div"></div>

                            <div className="Game-playerB">
                                <h2>0</h2>
                                <h4>Player B</h4>
                            </div>
                        </div>

                        <div className="Game-comments scroll">
                            {stores.gameStore.comments.map((doc: any) => {
                                return (<Comment key={doc.id} data={doc.data} user={doc.user} />)
                            })}
                        </div>

                        <input type="text" onKeyPress={ (e: any) => {
                            if(e.which == 13 || e.keyCode == 13){
                                stores.gameStore.writeComment(e.target.value, "Autor");
                                e.target.value = "";
                            }
                        }} placeholder="Your comment..." id="inputComment" />

                    </div>

                </div>

            </section>
        );
    }
}

export default Game;

const Comment = function (props: any) {
    return (
        <div className="Game-comment">
            <h5> {props.user} </h5>
            <p> {props.data} </p>
        </div>
    );
}