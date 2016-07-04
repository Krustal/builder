import Character, { combineModifiers, removeModifiers } from '../../src/lib/character.js';

describe('Character', () => {
  describe('#constructor', () => {
    it('sets default base strength ability score of 8', () => {
      expect((new Character())._strength).to.eq(8);
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
      let character = new Character();
      expect(character.name).to.eq('');
    });
    it('has a default level of 1', () => {
      let character = new Character();
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

    context('when passing another character and diff properties', () => {
      it('returns a new character with updated properties', () => {
        let initialCharacter = Character.create();
        let otherCharacter = new Character(initialCharacter, { name: 'Byron' });
        expect(otherCharacter.name).to.eq('Byron');
      });

      it('for properties with possible modifiers the updated field is the base', () => {
        let initialCharacter = Character.create();
        let otherCharacter = Character.create(initialCharacter, { strength: 12 });
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

    it("doesn't override different choices", () => {
      let character = Character.create()
        .choose('gameClass', 'Barbarian')
        .choose('race', 'Human');

      expect(character.ac()).to.eq(12);
    });

    it('can make choices that affect the same property', () => {
      const strengthOrDexterity = {
        name: '+2 strength or dex',
        options: {
          strength: [
            { field: 'strength', modifier: (str) => str + 2 },
            { field: 'charisma', modifier: (wis) => wis - 5 },
          ],
          dexterity: [{ field: 'dexterity', modifier: (dex) => dex + 2 }],
        },
      };

      const wisdomOrIntelligence = {
        name: '+2 wisdom or dex',
        options: {
          wisdom: [{ field: 'wisdom', modifier: (str) => str + 4 }],
          dexterity: [{ field: 'dexterity', modifier: (dex) => dex + 4 }],
        },
      };

      // There aren't currently built in options that impact the same field, this
      // creates a character with choices that aren't used in production in order
      // to test eventual functionality.
      let character = Character.create({ choices: [strengthOrDexterity, wisdomOrIntelligence]})
        .choose('+2 strength or dex', 'dexterity')
        .choose('+2 wisdom or dex', 'dexterity');

      expect(character.dexterity).to.eq(14);
    });

    it('choices can have multiple consequences', () => {
      let character = Character.create()
        .choose('gameClass', 'Barbarian');

      expect(character.ac()).to.eq(12);
      expect(character.pd()).to.eq(11);
    });

    it('can be made again and overrides old choice', () => {
      let character = Character.create()
        .choose('gameClass', 'Barbarian')
        .choose('gameClass', 'Fighter');

      expect(character.ac()).to.eq(15);
    });

    context('when the consequence of a choice is to set the value of a property', () => {
      it('sets the value', () => {
        expect(Character.create().choose('race', 'Human').race).to.eq('Human');
      });
    });

    it('throws an error if given an invalid choice name', () => {
      expect(() => {
        Character.create().choose('bogus', 'blarg');
      }).to.throw(Error);
    });

    context('when the choice is based on a condition', () => {
      it('only the consequence that meets the condition is applied', () => {
        let character = Character.create().choose('gameClass', 'Barbarian');
        expect(character.hpLevelMod).to.eq(3);
      });

      it('updates the consequence with the conditional changes', () => {
        let character = Character.create().choose('gameClass', 'Barbarian');
        let otherCharacter = Character.create(character, { level: 2 });
        expect(otherCharacter.hpLevelMod).to.eq(4);
      });
    });

    context('when the consequence for a choice is additional choices', () => {
      it('adds that choice to the resulting character', () => {
        let character = Character.create().choose('race', 'Human');
        expect(character.choices.map(c => c.name)).to.include('+2 racial ability bonus');
      });
      it('that choice can be chosen like normal', () => {
        let character = Character.create().choose('race', 'Human').choose('+2 racial ability bonus', 'Strength');
        expect(character.strength).to.eq(10);
      });
    });
  });

  describe('#unmakeChoice', () => {
    it('can unmake a decision, reverting the consequences', () => {
      let character = Character.create().choose('race', 'Human');
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

    context('when the choice had nested choices', () => {
      it('the nested choices are reverted too', () => {
        let character = Character.create().choose('race', 'Human').choose('+2 racial ability bonus', 'Strength');
        let newCharacter = character.unmakeChoice('race');
        expect(newCharacter.strength).to.eq(8);
      });

      it('removes the nested choices from the characters choices', () => {
        let character = Character.create().choose('race', 'Human').choose('+2 racial ability bonus', 'Strength');
        let newCharacter = character.unmakeChoice('race');
        expect(newCharacter._choices.find(choice => choice.name === '+2 racial ability bonus'))
          .to.be.undefined;
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
    context('the choice name is invalid', () => {
      it('returns an empty list', () => {
        const character = Character.create();
        expect(character.optionsFor('races')).to.deep.eq([]);
      });
    });
  });

  describe('#ac', () => {
    it('requires a class to be chosen', () => {
      let character = Character.create();
      expect(character.ac()).to.eq(null);
    });

    it('is computed from baseAC, middleMod, and level', () => {
      let character = Character
        .create({
          strength: 8,
          constitution: 10,
          dexterity: 12,
          wisdom: 8,
          charisma: 8,
          intelligence: 18
        })
        .choose('gameClass', 'Barbarian');
      expect(character.ac()).to.eq(13);
    });
  });

  describe("#isUnconscious", () => {
    it('is true if character hp is below 0', () => {
      let character = Character.create({ baseHP: 10 });
      expect(character.isUnconscious()).to.eq(false);
      let newCharacter = Character.create(character, { currentHP: 0 });
      expect(newCharacter.isUnconscious()).to.eq(true);
    });
  });

  describe("#isDead", () => {
    it('is true if character hp is below negative half of total', () => {
      let character = Character.create({ baseHP: 10 });
      expect(character.isDead()).to.eq(false);
      let newCharacter = Character.create(character, { currentHP: -5 });
      expect(newCharacter.isDead()).to.eq(true);
    });
  });
});

describe('combineModifiers', () => {
  describe('it takes the modifiers of a character and an array of new modifiers', () => {
    it('returns a new modifiers object with new modifiers added', () => {
      let character = Character.create().choose('race', 'Human').choose('+2 racial ability bonus', 'Strength');
      let newModifiers = [
        { field: 'dexterity', modifier: (dex) => dex + 5 }
      ];
      let combinedModifiers = combineModifiers(character.modifiers, newModifiers);
      expect(combinedModifiers.strength.length).to.eq(1);
      expect(combinedModifiers.dexterity.length).to.eq(1);
    });
  });
});

describe('removeModifiers', () => {
  describe('it takes the modifiers of a character an array of new modifiers', () => {
    it('returns a new modifiers object with modifiers removed', () => {
      let character = Character.create().choose('race', 'Human').choose('+2 racial ability bonus', 'Strength');
      let revertedModifiers = [
        { field: 'strength', modifier: character.modifiers.strength[0] }
      ];
      let remainingModifiers = removeModifiers(character.modifiers, revertedModifiers);
      expect(remainingModifiers.strength.length).to.eq(0);
    });
  });
});
