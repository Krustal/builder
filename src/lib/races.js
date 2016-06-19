import { BonusToWhichAbility } from './ability_bonuses.js';

const Human = [
  { field: 'race', set: 'Human', unset: ''},
  { addChoices: [
      {
        name: '+2 racial ability bonus',
        options: {
          Strength: [{ field: 'strength', modifier: (str) => str + 2 }],
          Dexterity: [{ field: 'dexterity', modifier: (dex) => dex + 2 }],
          Constitution: [{ field: 'constitution', modifier: (con) => con + 2 }],
          Intelligence: [{ field: 'intelligence', modifier: (int) => int + 2 }],
          Wisdom: [{ field: 'wisdom', modifier: (wis) => wis + 2 }],
          Charisma: [{ field: 'charisma', modifier: (cha) => cha + 2 }]
        }
      }
    ]
  }
];

const HighElf = [
  { field: 'race', set: 'High Elf', unset: ''},
  { addChoices: [
      {
        name: '+2 racial ability bonus',
        options: {
          Intelligence: [{ field: 'intelligence', modifier: (int) => int + 2 }],
          Charisma: [{ field: 'charisma', modifier: (cha) => cha + 2 }]
        }
      }
    ]
  }
];

const RaceChoice = {
  name: 'race',
  options: {
    Human,
    HighElf
  }
};
export default RaceChoice;
