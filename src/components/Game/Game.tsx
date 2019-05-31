import React, { Component } from 'react';
import { style, classes } from "typestyle";

import './Game.scss';

import stores from '../../stores/Stores';
import { observer } from 'mobx-react';

import Comment from '../Comment/Comment';

interface GameProps {
    match?: any
}

interface GameState {
    game?: any,
    comments?: any[],
    listenerComments?: ()=>void
}

@observer class Game extends Component<GameProps, GameState> {
    constructor(props: any) {
        super(props);

        this.state = {
            game: null,
            comments: [],
            listenerComments: ()=>{}
        }
    }

    getId() {
        return this.props.match.params.id;
    }

    componentDidMount() {
        stores.guildStore.readGuilds();
        stores.gameStore.findGame(this.getId());
        stores.gameStore.findComments(this.getId());
    }

    componentWillUnmount() {
        stores.gameStore.cleanListenerComments(this.state.listenerComments);
        stores.guildStore.cleanGuilds();
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
                                return (<Comment key={doc.id} doc={doc} />)
                            })}
                        </div>

                        <input type="text" onKeyPress={(e: any) => {
                            if (e.which == 13 || e.keyCode == 13) {
                                stores.gameStore.writeComment(e.target.value, stores.authStore.user.uid);
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

