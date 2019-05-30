import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import './GameCard.scss';

import stores from '../../stores/Stores';

interface GameCardProps {
    game?: any
}

interface GameCardState {
    autor?: any
}

@observer export default class GameCard extends Component<GameCardProps, GameCardState> {
    constructor(props: any) {
        super(props);

        this.state = {
            autor: null,
        }

        this.getAutor = this.getAutor.bind(this);
    }

    componentDidMount() {
      stores.gameStore.findGameCard(this.props.game.autor, this.getAutor);
    }

    componentWillUnmount(){
        stores.gameStore.cleanListenerGameCard(this.props.game.autor);
    }

    getAutor(a: any): void{
        this.setState({autor: a});
    }

    render() {

        if (this.state.autor == null) {
            return (<div className="GameCard">
                <h5> Loading... </h5>
            </div>);
        }

        return (
            <Link to={`/game/${this.props.game.idGame}`}>
            <div className="GameCard">
                <h5 > {this.props.game.name} </h5>
                <p> {this.state.autor.displayName} </p>
            </div>
            </Link>
        );
    }
}
