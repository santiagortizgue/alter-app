import React, { Component } from 'react';
import { style, classes } from "typestyle";
import { Link } from 'react-router-dom';

import './Guilds.scss';

import { observer } from 'mobx-react';
import stores from '../../stores/Stores';
import GameCard from '../GameCard/GameCard';

interface GuildProps {
}

interface GuildState {
    context?: number,
}

@observer class Guilds extends Component<GuildProps, GuildState> {

    constructor(props: any) {
        super(props);

        this.state = {
            context: 0,
        }

    }

    componentDidMount() {
        stores.guildStore.readGuilds();
        stores.gamesStore.setListenerGames(stores.authStore.user.uid);
    }

    componentWillUnmount() {
        stores.gamesStore.cleanListenerGames();
        stores.gamesStore.cleanGames();
        stores.guildStore.stopGuilds();
    }

    onDragOver = (e: any) => {
        e.preventDefault();
    }

    onDrop = (e: any) => {
        e.preventDefault();

        let id = e.dataTransfer.getData("id");

        
    }

    getGuildContext() {
        switch (this.state.context) {
            case 0:

                return (
                    <div className="Guilds-own">

                        <div className="Guilds-section">

                            <div><h3>Your Matches</h3></div>
                            <div><h4 onClick={(e: any) => {
                                e.preventDefault();
                                this.setState({ context: 1 });
                            }} className="hvr-underline-from-left">Other Matches</h4></div>

                        </div>

                        <div className="Guilds-cont">
                            <div className="Guilds-matches scroll">
                                {stores.gamesStore.ourGames && stores.gamesStore.ourGames.map((game: any) => {
                                    return <GameCard key={game.idGame} game={game} />;
                                })}
                            </div>

                            <div className="Guilds-options">
                                <input className="Guilds-search" placeholder="Search by name" type="text" />
                                <Link to="/newmatch">
                                    <div className="Guilds-create"><h4>Create Match</h4></div>
                                </Link>
                                <div onDragOver={(e: any) => this.onDragOver(e)} onDrop={(e: any) => this.onDrop(e)} className="Guilds-delete"><h4>Delete Match</h4></div>
                            </div>
                        </div>
                    </div>
                )
                break;

            case 1:
                return (
                    <div className="Guilds-others">

                        <div className="Guilds-section">
                            <div><h3>Other Matches</h3></div>
                            <div><h4 onClick={(e: any) => {
                                e.preventDefault();
                                this.setState({ context: 0 });
                            }} className="hvr-underline-from-left">Your Matches</h4></div>
                        </div>

                        <div className="Guilds-cont">
                            <div className="Guilds-matches scroll">
                                {stores.gamesStore.otherGames && stores.gamesStore.otherGames.map((game: any) => {
                                    return <GameCard key={game.idGame} game={game} />;
                                })}
                            </div>

                            <div className="Guilds-options">
                                <input className="Guilds-search" placeholder="Search by name" type="text" />
                            </div>
                        </div>

                    </div>
                )
                break;
        }
    }

    render() {

        return (
            <section className="Guilds">

                <div className="Guilds-score">
                    {stores.guildStore.guilds.map((guild: any) => {

                        let hoverStyle = style({
                            $nest: {
                                '&:hover': {
                                    color: `rgb(${guild.color})`,
                                    borderColor: `rgb(${guild.color})`,
                                }
                            }
                        });

                        return (<div key={guild.id} className="Guilds-each">
                            <h3 className={classes(hoverStyle)} >{guild.points}</h3>
                            <h5>{guild.name}</h5>
                        </div>)
                    })}
                </div>

                {this.getGuildContext()}

            </section>
        );
    }
}

export default Guilds;


