import React from 'react';
import components from '../../styles/components.css';
import NameProp from './name_prop.jsx';
import LevelProp from './level_prop.jsx';
import RaceProp from './race_prop.jsx';
import ClassProp from './class_prop.jsx';

const CharacterOverview = ({ gameClass }) => (
  <div className={components.characterOverview}>
    <NameProp className={components.characterOverviewProp} variant="major">Name</NameProp>
    <RaceProp className={components.characterOverviewProp} variant="major" label="Race" />
    <ClassProp className={components.characterOverviewProp} variant="major" label="Class" />
    <LevelProp className={components.characterOverviewProp} variant="major">Level</LevelProp>
  </div>
);
export default CharacterOverview;
