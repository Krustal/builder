const Barbarian = [
  { field: 'gameClass', set: 'barbarian', unset: ''},
];

const Fighter = [
  { field: 'gameClass', set: 'fighter', unset: ''}
];

const ClassChoice = {
  name: 'gameClass',
  options: {
    Barbarian,
    Fighter
  }
};
export default ClassChoice;
