import React, { Component } from 'react';
import './Home.scss';

import { observer } from 'mobx-react';

interface HomeProps {
}

interface HomeState {
  songs?: any;
}

@observer export class Home extends Component<HomeProps, HomeState> {

  constructor(props: any) {
    super(props);

    this.state = {
      songs: null
    }

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {

    return (
      <div className="Home">

        <p>This is the home</p>

      </div>
    );
  }
}

export default Home;
