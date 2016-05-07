const Human = [
  { field: 'race', set: 'Human', unset: ''}
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
