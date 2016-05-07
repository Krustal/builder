import React from 'react';


import components from '../../styles/components.css';
import TextInput from '../form/text_input.jsx';
import NameProp from './name_prop.jsx';
import LevelProp from './level_prop.jsx';
import RaceProp from './race_prop.jsx';

const CharacterOverview = ({ gameClass }) => (
  <div className={components.characterOverview}>
    <NameProp className={components.characterOverviewProp} variant="major">Name</NameProp>
    <RaceProp className={components.characterOverviewProp} variant="major">Race</RaceProp>
    <TextInput className={components.characterOverviewProp} variant="major" value={gameClass} updateCB={() => console.log('[Warning] Not Implemented')}>class</TextInput>
    <LevelProp className={components.characterOverviewProp} variant="major">Level</LevelProp>
  </div>
);
export default CharacterOverview;
