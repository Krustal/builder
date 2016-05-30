import React from 'react';
import Barbarian from '../constants/classes/barbarian.js';
import logo from '../styles/logo.css';
import typography from '../styles/theme/typography.scss';

import CharacterOverview from './character/overview.jsx';
import Stats from './character/stats.jsx';
import DeadStatus from './character/dead_status.jsx';

/* TODO: DON'T MERGE THIS, IT WILL ADD REDUX DEVTOOLS TO PROD */
import DevTools from './dev_tools.jsx';

var classes = {
  barbarian: Barbarian
};

export default class CharacterSheet extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let state = this.props.store.getState();
    let overlayStatus = '';
    if(state.character.isDead()) {
      overlayStatus = (<DeadStatus />);
    } else {
      overlayStatus = "";
    }
    return (
      <form action>
        <div className={logo.main} />
        <CharacterOverview store={this.props.store} />
        <Stats store={this.props.store} />
        {overlayStatus}
        <DevTools />
      </form>
    );
  }
}
CharacterSheet.childContextTypes = {
  store: React.PropTypes.object
};
