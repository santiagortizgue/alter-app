import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import './GameCard.scss';

import stores from '../../stores/Stores';

interface GameCardProps {
    game?: any
}

interface GameCardState {
    autor?: any,
    listenerAutor?: any
}

@observer export default class GameCard extends Component<GameCardProps, GameCardState> {
    constructor(props: any) {
        super(props);

        this.state = {
            autor: null,
            listenerAutor: null
        }

        this.getAutor = this.getAutor.bind(this);
    }

    componentDidMount() {
        stores.gameStore.findGameCard(this.props.game.autor, this.getAutor);
    }

    componentWillUnmount() {
        stores.gameStore.cleanListenerGameCard(this.state.listenerAutor);
    }

    getAutor(a: any, listener: any): void {
        this.setState({
            autor: a,
            listenerAutor: listener
        });
    }

    onDragStart = (e: any, id: string) => {
        e.preventDefault();

        e.dataTransfer.setData("id", id);
    }

    render() {

        if (this.state.autor == null) {
            return (<div className="GameCard">
                <h5 > {this.props.game.name} </h5>
                <h5> Loading... </h5>
            </div>);
        }

        return (
            <Link to={`/game/${this.props.game.idGame}`}>
                <div draggable onDragStart={(e: any)=> this.onDragStart(e, this.props.game.id)} className="GameCard">
                    <h5 > {this.props.game.name} </h5>
                    <p> {this.state.autor.displayName} </p>
                </div>
            </Link>
        );
    }
}
