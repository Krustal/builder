const Human = {
  consequences: [
    { field: 'race', set: 'Human', unset: '' },
    {
      addChoices: [
        {
          name: '+2 racial ability bonus',
          options: {
            Strength: {
              consequences: [{ field: 'strength', modifier: (str) => str + 2 }],
            },
            Dexterity: {
              consequences: [{ field: 'dexterity', modifier: (dex) => dex + 2 }],
            },
            Constitution: {
              consequences: [{ field: 'constitution', modifier: (con) => con + 2 }],
            },
            Intelligence: {
              consequences: [{ field: 'intelligence', modifier: (int) => int + 2 }],
            },
            Wisdom: {
              consequences: [{ field: 'wisdom', modifier: (wis) => wis + 2 }],
            },
            Charisma: {
              consequences: [{ field: 'charisma', modifier: (cha) => cha + 2 }],
            },
          },
        },
      ],
    },
  ],
};

const HighElf = {
  consequences: [
    { field: 'race', set: 'High Elf', unset: '' },
    {
      addChoices: [
        {
          name: '+2 racial ability bonus',
          options: {
            Intelligence: {
              consequences: [{ field: 'intelligence', modifier: (int) => int + 2 }],
            },
            Charisma: {
              consequences: [{ field: 'charisma', modifier: (cha) => cha + 2 }],
            },
          },
        },
      ],
    },
  ],
};

const RaceChoice = {
  name: 'race',
  options: {
    Human,
    HighElf,
  },
};
export default RaceChoice;
