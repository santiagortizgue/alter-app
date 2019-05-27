import React, { Component } from 'react';
import './Profile.scss';

import { observer } from 'mobx-react';

interface ProfileProps {
}

interface ProfileState {
  user?: any;
}

@observer class Profile extends Component<ProfileProps, ProfileState> {

  constructor(props: any) {
    super(props);

    this.state = {
        user: null
    }

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {

    return (
      <section className="Profile">

        <div className="Profile-info"></div>
        
        <div className="Profile-guild"></div>
              
      </section>
    );
  }
}

export default Profile;
