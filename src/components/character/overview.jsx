import React from 'react';

import components from '../../styles/components.css';
import TextInput from '../form/text_input.jsx';

export default class CharacterOverview extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.props;
    const state = store.getState();
    const changeName = ((name) => store.dispatch({ type: 'NAME_CHANGE', name }));
    const changeLevel = ((level) => store.dispatch({ type: 'LEVEL_CHANGE', level }));
    return (
      <div className={components.characterOverview}>
        <TextInput variant="major" length={30} value={state.character.name} updateCB={changeName}>name</TextInput>
        <TextInput variant="major" length={30} value={state.character.race} updateCB={() => console.log('[Warning] Not Implemented')}>race</TextInput>
        <TextInput variant="major" length={30} value={this.props.gameClass} updateCB={() => console.log('[Warning] Not Implemented')}>class</TextInput>
        <TextInput variant="major" length={30} value={state.character.level} updateCB={changeLevel}>level</TextInput>
      </div>
    );
  }
}
