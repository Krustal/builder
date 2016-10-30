const abilityChoices = abilities => (
  abilities.reduce((options, ability) => ({
    ...options,
    [ability]: {
      restrictions: [
        {
          reason: 'Can\'t use same bonus as race',
          test: c => c.chosenChoices['+2 racial ability bonus'] === ability,
        },
      ],
      consequences: [{ field: ability.toLowerCase(), modifier: abl => abl + 2 }],
    },
  }), {})
);

const createClassOption = (name, config = {}) => {
  const { ac, pd, md, hp, recoveries, recoveryDice, hpLevelMod, abilityBonus } = config;
  return {
    consequences: [
      { field: 'gameClass', set: name, unset: '' },
      // TODO: This is actually a choice based on the armor weight, so this should
      // be the smartest choice, most classes have a pretty clear best option.
      { field: 'baseAC', set: ac, unset: null },
      { field: 'basePD', set: pd, unset: null },
      { field: 'baseMD', set: md, unset: null },
      { field: 'baseHP', set: hp, unset: null },
      { field: 'hpLevelMod', set: c => hpLevelMod[c.level - 1] },
      { field: 'recoveries', set: recoveries, unset: null },
      { field: 'recoveryDice', set: recoveryDice, unset: null },
      {
        addChoices: [
          {
            name: '+2 class ability bonus',
            options: abilityChoices(abilityBonus),
          },
        ],
      },
      // TODO: Add talent choices, based on level
      // TODO: Add feat choices, based on level
    ],
  };
};

const Barbarian = createClassOption(
  'Barbarian',
  {
    ac: 12,
    pd: 11,
    md: 10,
    hp: 7,
    recoveries: 8,
    recoveryDice: 'd10',
    abilityBonus: ['Strength', 'Constitution'],
    hpLevelMod: [3, 4, 5, 6, 8, 10, 12, 16, 20, 24],
  }
);
const Fighter = createClassOption(
  'Fighter',
  {
    ac: 15,
    pd: 10,
    md: 10,
    hp: 8,
    recoveries: 9,
    recoveryDice: '1d10',
    abilityBonus: ['Strength', 'Constitution'],
    hpLevelMod: [3, 4, 5, 6, 8, 10, 12, 16, 20, 24],
  }
 );

const Cleric = createClassOption(
  'Cleric',
  {
    ac: 14,
    pd: 11,
    md: 11,
    hp: 7,
    recoveries: 8,
    recoveryDice: '1d8',
    abilityBonus: ['Wisdom', 'Strength'],
    hpLevelMod: [3, 4, 5, 6, 8, 10, 12, 16, 20, 24],
  }
);

const ClassChoice = {
  name: 'gameClass',
  options: {
    Barbarian,
    Fighter,
    Cleric,
  },
};
export default ClassChoice;
