const createClassOption = (name, { ac, pd, md, hp, recoveries, recoveryDice, hpLevelMod } = {}) => (
  {
    consequences: [
      { field: 'gameClass', set: name, unset: '' },
      // TODO: This is actually a choice based on the armor weight, so this should
      // be the smartest choice, most classes have a pretty clear best option.
      { field: 'baseAC', set: ac, unset: null },
      { field: 'basePD', set: pd, unset: null },
      { field: 'baseMD', set: md, unset: null },
      { field: 'baseHP', set: hp, unset: null },
      { field: 'hpLevelMod', set: (c) => hpLevelMod[c.level - 1] },
      { field: 'recoveries', set: recoveries, unset: null },
      { field: 'recoveryDice', set: recoveryDice, unset: null },
      {
        addChoices: [
          {
            name: '+2 class ability bonus',
            options: {
              Strength: {
                restrictions: [
                  {
                    reason: 'Can\'t use same bonus as race',
                    test: (c) => c.chosenChoices['+2 racial ability bonus'] === 'Strength',
                  },
                ],
                consequences: [{ field: 'strength', modifier: (str) => str + 2 }],
              },
              Constitution: {
                consequences: [{ field: 'constitution', modifier: (con) => con + 2 }],
              },
            },
          },
        ],
      },
      // TODO: Add talent choices, based on level
      // TODO: Add feat choices, based on level
    ],
  }
);

const Barbarian = createClassOption(
  'barbarian',
  {
    ac: 12,
    pd: 11,
    md: 10,
    hp: 7,
    recoveries: 8,
    recoveryDice: 'd10',
    hpLevelMod: [3, 4, 5, 6, 8, 10, 12, 16, 20, 24],
  }
);
const Fighter = createClassOption(
  'fighter',
  {
    ac: 15,
    pd: 10,
    md: 10,
    hp: 8,
    recoveries: 9,
    recoveryDice: '1d10',
    hpLevelMod: [3, 4, 5, 6, 8, 10, 12, 16, 20, 24],
  }
 );

const ClassChoice = {
  name: 'gameClass',
  options: {
    Barbarian,
    Fighter,
  },
};
export default ClassChoice;
