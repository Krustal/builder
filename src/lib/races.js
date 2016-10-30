const abilityChoices = abilities => (
  abilities.reduce((options, ability) => ({
    ...options,
    [ability]: {
      restrictions: [
        {
          reason: 'Can\'t use same bonus as class',
          test: c => c.chosenChoices['+2 class ability bonus'] === ability,
        },
      ],
      consequences: [{ field: ability.toLowerCase(), modifier: abl => abl + 2 }],
    },
  }), {})
);

const createRaceOption = (name, { abilityBonusOptions } = {}) => ({
  consequences: [
    { field: 'race', set: name, unset: '' },
    {
      addChoices: [
        {
          name: '+2 racial ability bonus',
          options: abilityChoices(abilityBonusOptions),
        },
      ],
    },
  ],
});

const DarkElf = createRaceOption('DarkElf', { abilityBonusOptions: ['Dexterity', 'Charisma'] });
const Dwarf = createRaceOption('Dwarf', { abilityBonusOptions: ['Constitution', 'Wisdom'] });
const Gnome = createRaceOption('Gnome', { abilityBonusOptions: ['Dexterity', 'Intelligence'] });
const WoodElf = createRaceOption('WoodElf', { abilityBonusOptions: ['Dexterity', 'Wisdom'] });
const HalfElf = createRaceOption('HalfElf', { abilityBonusOptions: ['Constitution', 'Charisma'] });
const HalfOrc = createRaceOption('HalfOrc', { abilityBonusOptions: ['Strength', 'Dexterity'] });
const Halfling = createRaceOption('Halfling', { abilityBonusOptions: ['Constitution', 'Dexterity'] });
const Human = createRaceOption('Human', { abilityBonusOptions: ['Strength', 'Constitution', 'Dexterity', 'Intelligence', 'Wisdom', 'Charisma'] });
const HighElf = createRaceOption('HighElf', { abilityBonusOptions: ['Intelligence', 'Charisma'] });

const RaceChoice = {
  name: 'race',
  options: {
    Human,
    Dwarf,
    HighElf,
    DarkElf,
    WoodElf,
    Gnome,
    HalfElf,
    HalfOrc,
    Halfling,
  },
};
export default RaceChoice;
