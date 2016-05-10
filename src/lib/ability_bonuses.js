const Strength = [
  { field: 'strength', modifier: (str) => str + 2 }
];
const Dexterity = [
  { field: 'dexterity', modifier: (dex) => dex + 2 }
];
const Constitution = [
  { field: 'constitution', modifier: (con) => con + 2 }
];
const Intelligence = [
  { field: 'intelligence', modifier: (int) => int + 2 }
];
const Wisdom = [
  { field: 'wisdom', modifier: (wis) => wis + 2 }
];
const Charisma = [
  { field: 'charisma', modifier: (cha) => cha + 2 }
];


export const BonusToWhichAbility = {
  name: '+2 to which ability',
  options: {
    Strength,
    Dexterity,
    Constitution,
    Intelligence,
    Wisdom,
    Charisma
  }
};
