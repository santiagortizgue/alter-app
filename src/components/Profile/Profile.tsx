import React, { Component } from 'react';
import { style, classes } from "typestyle";


import './Profile.scss';

import { observer } from 'mobx-react';

import stores from '../../stores/Stores';

interface ProfileProps {
}

interface ProfileState {
}

@observer class Profile extends Component<ProfileProps, ProfileState> {

  constructor(props: any) {
    super(props);

    this.state = {
    }

  }

  componentDidMount() {
    stores.guildStore.readGuilds();
  }

  componentWillUnmount() {
    stores.guildStore.stopGuilds();
  }

  render() {

    if (!stores.authStore.user) {
      return <div className="Loading"><p>Loading User info...</p></div>;
    }

    if (stores.guildStore.guilds.length == 0) {
      return <div className="Loading"><p>Loading User guild...</p></div>;
    }

    return (
      <section className="Profile">

        <div className="Profile-cont">

          <div className="Profile-info">

            <h1 className="Profile-title">INFO</h1>

            <div className="Profile-input">

              <h3>Display Name</h3>
              <input disabled value={stores.authStore.user.displayName} />
            </div>

            <div className="Profile-input">
              <h3>Email</h3>
              <input disabled value={stores.authStore.user.email} />
            </div>

            <div className="Profile-gameInfo">

              <div className="Profile-gameLeft">

                <h3>Games</h3>
                <input disabled value={stores.authStore.user.games} />
              </div>

              <div className="Profile-gameRight">

                <h3>Victories</h3>
                <input disabled value={stores.authStore.user.victories} />
              </div>

            </div>

          </div>

          <div className="Profile-guilds">
            <h1 className="Profile-title">GUILD</h1>

            <div className="Profile-contGuild">

              {stores.guildStore.guilds.map((guild: any) => {
                let hoverStyle = style({
                  $nest: {
                    '&:hover': {
                      color: `rgb(${guild.color})`,
                    }
                  }
                });
              
                let selectedStyle = style({
                  color: `rgb(${guild.color})`,
                  borderColor: `rgb(${guild.color})`,
                });
            
                //classes(class, class) write multiple classes
            
                if (stores.authStore.user.guild == guild.id) {
                  return (<h3 key={guild.id}
                    className={classes("Profile-guild", selectedStyle)}>{guild.name}</h3>)
                } else {
                  return (<h3 key={guild.id}
                    className={classes("Profile-guild", hoverStyle)}
                    onClick={(e: any) => {
                      e.preventDefault();
                      //update user guild
                      stores.authStore.updateTeam(guild.id);
                    }}
                  >{guild.name}</h3>)
                }
              })}
              
            </div>

            <h3 onClick={(e: any) => {
              e.preventDefault();
            }} className="Profile-update hvr-underline-from-center">UPDATE</h3>
          </div>

        </div>

      </section>
    );
  }
}

export default Profile;