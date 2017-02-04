import Character from '../../src/lib/thirteenth_age_character';
import { combineModifiers, removeModifiers, InvalidChoice } from '../../src/lib/character.js';
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';

chai.use(dirtyChai);

describe('Character', () => {
  describe('#constructor', () => {
    it('sets default base strength ability score of 8', () => {
      const character = new Character();
      expect(character._strength).to.eq(8);
    });
    it('computes the ability modifier', () => {
      expect(Character.create().strengthMod).to.eq(-1);
    });
    it('sets default base dexterity ability score of 8', () => {
      expect((new Character())._dexterity).to.eq(8);
    });
    it('sets default base constitution ability score of 8', () => {
      expect((new Character())._constitution).to.eq(8);
    });
    it('sets default base intelligence ability score of 8', () => {
      expect((new Character())._intelligence).to.eq(8);
    });
    it('sets default base wisdom ability score of 8', () => {
      expect((new Character())._wisdom).to.eq(8);
    });
    it('sets default base charisma ability score of 8', () => {
      expect((new Character())._charisma).to.eq(8);
    });
    it('has a blank default name', () => {
      const character = new Character();
      expect(character.name).to.eq('');
    });
    it('has a default level of 1', () => {
      const character = new Character();
      expect(character.level).to.eq(1);
    });
    it('has a blank class by default', () => {
      expect((new Character()).gameClass).to.eq(null);
    });
    it('has empty modifiers for each ability', () => {
      expect(Character.create().modifiers.strength).to.deep.eq([]);
    });

    it('has choices', () => {
      expect(Character.create().choices.length).to.not.eq(0);
    });

    describe('when passing another character and diff properties', () => {
      it('returns a new character with updated properties', () => {
        const initialCharacter = Character.create();
        const otherCharacter = new Character(initialCharacter, { name: 'Byron' });
        expect(otherCharacter.name).to.eq('Byron');
      });

      it('provides setters for props that act as abstractions of creating new characters', () => {
        const initialCharacter = Character.create();
        const otherCharacter = initialCharacter.set('name', 'Byron');
        expect(otherCharacter.name).to.eq('Byron');
      });

      it('for properties with possible modifiers the updated field is the base', () => {
        const initialCharacter = Character.create();
        const otherCharacter = Character.create(initialCharacter, { strength: 12 });
        expect(otherCharacter._strength).to.eq(12);
      });
    });
  });

  describe('#choose', () => {
    it('registers that choice and the chosen option', () => {
      expect(
        Character.create()
          .choose('gameClass', 'Barbarian')
          .chosenChoices.gameClass
        ).to.eq('Barbarian');
    });

    it('doesn\'t override different choices', () => {
      const character = Character.create()
        .choose('gameClass', 'Barbarian')
        .choose('race', 'Human');
      expect(character.ac).to.eq(12);
    });

    it('can make choices that affect the same property', () => {
      const strengthOrDexterity = {
        name: '+2 strength or dex',
        options: {
          strength: {
            consequences: [
              { field: 'strength', modifier: (str) => str + 2 },
              { field: 'charisma', modifier: (wis) => wis - 5 },
            ],
          },
          dexterity: {
            consequences: [{ field: 'dexterity', modifier: (dex) => dex + 2 }],
          },
        },
      };

      const wisdomOrIntelligence = {
        name: '+2 wisdom or dex',
        options: {
          wisdom: {
            consequences: [{ field: 'wisdom', modifier: (str) => str + 4 }],
          },
          dexterity: {
            consequences: [{ field: 'dexterity', modifier: (dex) => dex + 4 }],
          },
        },
      };

      // There aren't currently built in options that impact the same field, this
      // creates a character with choices that aren't used in production in order
      // to test eventual functionality.
      const character = Character.create({ choices: [strengthOrDexterity, wisdomOrIntelligence] })
        .choose('+2 strength or dex', 'dexterity')
        .choose('+2 wisdom or dex', 'dexterity');
      expect(character.dexterity).to.eq(14);
    });

    it('choices can have multiple consequences', () => {
      const character = Character.create()
        .choose('gameClass', 'Barbarian');

      expect(character.ac).to.eq(12);
      expect(character.pd).to.eq(11);
    });

    it('can be made again and overrides old choice', () => {
      const character = Character.create()
        .choose('gameClass', 'Barbarian')
        .choose('gameClass', 'Fighter');

      expect(character.ac).to.eq(15);
    });

    describe(
      'when the consequence of a choice is to set the value of a property',
      () => {
        it('sets the value', () => {
          expect(Character.create().choose('race', 'Human').race).to.eq('Human');
        });
      }
    );

    it('throws an error if given an invalid choice name', () => {
      expect(() => {
        Character.create().choose('bogus', 'blarg');
      }).to.throw(Error);
    });

    describe('when the choice is based on a condition', () => {
      it('only the consequence that meets the condition is applied', () => {
        const character = Character.create().choose('gameClass', 'Barbarian');
        expect(character.hpLevelMod).to.eq(3);
      });

      it('updates the consequence with the conditional changes', () => {
        const character = Character.create().choose('gameClass', 'Barbarian');
        const otherCharacter = character.set('level', 2);
        expect(otherCharacter.hpLevelMod).to.eq(4);
      });
    });

    describe('when the consequence for a choice is additional choices', () => {
      it('adds that choice to the resulting character', () => {
        const character = Character.create().choose('race', 'Human');
        expect(character.choices.map(c => c.name)).to.include('+2 racial ability bonus');
      });
      it('that choice can be chosen like normal', () => {
        const character = Character.create()
          .choose('race', 'Human')
          .choose('+2 racial ability bonus', 'Strength');
        expect(character.strength).to.eq(10);
      });
    });

    describe('when the choice has restrictions', () => {
      const abilityChoiceOne = {
        name: 'ability choice one',
        options: {
          strength: {
            consequences: [{ field: 'strength', modifier: (str) => str + 2 }],
          },
          dexterity: {
            consequences: [{ field: 'dexterity', modifier: (dex) => dex + 2 }],
          },
        },
      };

      const abilityChoiceTwo = {
        name: 'ability choice two',
        options: {
          strength: {
            restrictions: [
              {
                reason: 'pointless restriction',
                test: () => false,
              },
              {
                reason: 'can\'t make the same choice as choice one',
                test: (c) => c.chosenChoices['ability choice one'] === 'strength',
              },
            ],
            consequences: [{ field: 'strength', modifier: (str) => str + 2 }],
          },
          dexterity: {
            consequences: [{ field: 'dexterity', modifier: (dex) => dex + 2 }],
          },
        },
      };

      // There aren't currently built in options that impact the same field, this
      // creates a character with choices that aren't used in production in order
      // to test eventual functionality.
      const character = Character.create({ choices: [abilityChoiceOne, abilityChoiceTwo] });

      it('permits the choice if the restrictions failed', () => {
        const testCharacter = character
          .choose('ability choice one', 'strength')
          .choose('ability choice two', 'dexterity');
        expect(testCharacter.strength).to.eq(10);
        expect(testCharacter.dexterity).to.eq(10);
      });

      it('raises an exception if a choose is made that is restricted', () => {
        const badChoice = () => character
          .choose('ability choice one', 'strength')
          .choose('ability choice two', 'strength');
        expect(badChoice).to.throw(InvalidChoice, /can't make the same choice as choice one/);
      });

      it('only evaluates restrictions at the time of the choice', () => {
        const fineChoice = () => character
          .choose('ability choice two', 'strength')
          .choose('ability choice one', 'strength');
        expect(fineChoice).to.not.throw(InvalidChoice, /can't make the same choice as choice one/);
        expect(fineChoice().strength).to.eq(12);
      });
    });
  });

  describe('#unmakeChoice', () => {
    it('can unmake a decision, reverting the consequences', () => {
      const character = Character.create().choose('race', 'Human');
      expect(character.unmakeChoice('race').race).to.eq('');
    });

    it('de-registers that choice and the chosen option', () => {
      expect(
        Character.create()
          .choose('race', 'Human')
          .unmakeChoice('race')
          .chosenChoices.race
        ).to.eq(null);
    });

    describe('when the choice had nested choices', () => {
      it('the nested choices are reverted too', () => {
        const character = Character.create()
          .choose('race', 'Human')
          .choose('+2 racial ability bonus', 'Strength');
        const newCharacter = character.unmakeChoice('race');
        expect(newCharacter.strength).to.eq(8);
      });

      it('removes the nested choices from the characters choices', () => {
        const character = Character.create()
          .choose('race', 'Human')
          .choose('+2 racial ability bonus', 'Strength');
        const newCharacter = character.unmakeChoice('race');
        expect(
          newCharacter._choices.find(choice => choice.name === '+2 racial ability bonus')
        ).to.be.undefined();
      });
    });

    it('throws an error if given an invalid choice name', () => {
      expect(() => {
        Character.create().unmakeChoice('bogus');
      }).to.throw(Error);
    });
  });

  describe('#optionsFor', () => {
    it('returns a list of the options on the given choice', () => {
      const character = Character.create();
      expect(character.optionsFor('race')).to.include('Human');
    });
    describe('the choice name is invalid', () => {
      it('returns an empty list', () => {
        const character = Character.create();
        expect(character.optionsFor('races')).to.deep.eq([]);
      });
    });
  });

  describe('#ac', () => {
    it('requires a class to be chosen', () => {
      const character = Character.create();
      expect(character.ac).to.eq(null);
    });

    it('is computed from baseAC, middleMod, and level', () => {
      const character = Character
        .create({
          strength: 8,
          constitution: 10,
          dexterity: 12,
          wisdom: 8,
          charisma: 8,
          intelligence: 18,
        })
        .choose('gameClass', 'Barbarian');
      expect(character.ac).to.eq(13);
    });
  });

  describe('#isUnconscious', () => {
    it('is true if character hp is below 0', () => {
      const character = Character.create({ baseHP: 10 });
      expect(character.isUnconscious()).to.eq(false);
      const newCharacter = Character.create(character, { currentHP: 0 });
      expect(newCharacter.isUnconscious()).to.eq(true);
    });
  });

  describe('#isDead', () => {
    it('is true if character hp is below negative half of total', () => {
      const character = Character.create({ baseHP: 10 });
      expect(character.isDead()).to.eq(false);
      const newCharacter = Character.create(character, { currentHP: -5 });
      expect(newCharacter.isDead()).to.eq(true);
    });
  });
});

describe('combineModifiers', () => {
  describe('it takes the modifiers of a character and an array of new modifiers', () => {
    it('returns a new modifiers object with new modifiers added', () => {
      const character = Character.create()
        .choose('race', 'Human')
        .choose('+2 racial ability bonus', 'Strength');
      const newModifiers = [
        { field: 'dexterity', modifier: (dex) => dex + 5 },
      ];
      const combinedModifiers = combineModifiers(character.modifiers, newModifiers);
      expect(combinedModifiers.strength.length).to.eq(1);
      expect(combinedModifiers.dexterity.length).to.eq(1);
    });
  });
});

describe('removeModifiers', () => {
  describe('it takes the modifiers of a character an array of new modifiers', () => {
    it('returns a new modifiers object with modifiers removed', () => {
      const character = Character.create()
        .choose('race', 'Human')
        .choose('+2 racial ability bonus', 'Strength');
      const revertedModifiers = [
        { field: 'strength', modifier: character.modifiers.strength[0] },
      ];
      const remainingModifiers = removeModifiers(character.modifiers, revertedModifiers);
      expect(remainingModifiers.strength.length).to.eq(0);
    });
  });
});
