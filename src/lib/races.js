import { BonusToWhichAbility } from './ability_bonuses.js';

const Human = [
  { field: 'race', set: 'Human', unset: ''},
  { addChoices: [BonusToWhichAbility] }
];

const HighElf = [
  { field: 'race', set: 'High Elf', unset: ''}
];

const RaceChoice = {
  name: 'race',
  options: {
    Human,
    HighElf
  }
};
export default RaceChoice;
