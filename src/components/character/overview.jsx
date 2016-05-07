import React from 'react';


import components from '../../styles/components.css';
import TextInput from '../form/text_input.jsx';
import NameProp from './name_prop.jsx';
import LevelProp from './level_prop.jsx';
import RaceProp from './race_prop.jsx';

const CharacterOverview = ({ gameClass }) => (
  <div className={components.characterOverview}>
    <NameProp variant="major" length={30}>Name</NameProp>
    <RaceProp variant="major">Race</RaceProp>
    <TextInput variant="major" length={30} value={gameClass} updateCB={() => console.log('[Warning] Not Implemented')}>class</TextInput>
    <LevelProp variant="major" length={30}>Level</LevelProp>
  </div>
);
export default CharacterOverview;
