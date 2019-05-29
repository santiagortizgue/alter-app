import React, { Component } from 'react';
import { style, classes } from "typestyle";
import './Guilds.scss';

import { observer } from 'mobx-react';
import stores from '../../stores/Stores';

interface GuildProps {
}

interface GuildState {

}

@observer class Guilds extends Component<GuildProps, GuildState> {

    constructor(props: any) {
        super(props);

        //props.history.push('/auth');
    }

    componentDidMount() {
        stores.guildStore.readGuilds();
    }

    componentWillUnmount() {
        stores.guildStore.stopGuilds();
    }

    render() {

        return (
            <section className="Guilds">

                <div className="Guilds-score">
                    {stores.guildStore.guilds.map((guild: any) => {

                        let guildStyle = style({
                            color: `rgb(${guild.color})`,
                            borderColor: `rgb(${guild.color})`,
                        });

                        return (<div className="Guilds-each">
                            <h3 className={classes(guildStyle)} >{guild.points}</h3>
                            <h5>{guild.name}</h5>
                        </div>)
                    })}
                </div>

                <div className="Guilds-own">
                    <h3>Your Games</h3>

                    <div className="Guilds-contGames">



                    </div>
                </div>

                <div className="Guilds-others">

                    <h3>Other Games</h3>

                    <div className="Guilds-contOthers">
                    </div>

                </div>

            </section>
        );
    }
}

export default Guilds;


