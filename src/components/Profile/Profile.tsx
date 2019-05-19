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
      <div className="Profile">

              
            </div>
    );
  }
}

export default Profile;
