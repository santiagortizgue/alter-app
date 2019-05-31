import React, { Component } from 'react';
import { style, classes } from "typestyle";
import { Link } from 'react-router-dom';

import './CreateGame.scss';

import { observer } from 'mobx-react';
import stores from '../../stores/Stores';
import GameCard from '../GameCard/GameCard';

interface CreateGameProps {
    history?: any
}

interface CreateGameState {
    name?: string
}

@observer class CreateGame extends Component<CreateGameProps, CreateGameState> {

    constructor(props: any) {
        super(props);

        this.state = {
            name: ""
        }

        this.redirectGame = this.redirectGame.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    redirectGame(id: string): void{
        this.props.history.push(`/game/${id}`);
    }


    render() {

        return (
            <section className="CreateGame">

                <div className="CreateGame-cont">

                    <h1 className="CreateGame-title">New Match</h1>

                    <input onChange={(e: any) => this.setState({ name: e.target.value })} placeholder="Match Title" className="CreateGame-input" type="text" />
                    <h3 onClick={(e: any) => {
                        e.preventDefault();
                        if (this.state.name && this.state.name !== "") {
                            stores.gamesStore.createGame(stores.authStore.user.uid, this.state.name, this.redirectGame);
                        }
                    }} className="CreateGame-create hvr-underline-from-center">CREATE</h3>

                </div>

            </section>
        );
    }
}

export default CreateGame;


