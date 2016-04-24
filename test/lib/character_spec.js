import Character from '../../src/lib/character.js';

describe('Character', () => {
  describe('#constructor', () => {
    it('sets default base strength ability score of 8', () => {
      expect((new Character())._strength).to.eq(8);
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
      expect((new Character()).name).to.eq('');
    });
    it('has a default level of 1', () => {
      expect((new Character()).level).to.eq(1);
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
    });
  });

  describe('#withModifier', () => {
    it('adds a modifier to the character', () => {
      let character = Character.create().withModifier('strength', (strength) => {
        return strength + 2;
      });
      expect(character.modifiers.strength.length).to.eq(1);
      expect(character.strength).to.eq(10);
    });
    it('throws an exception if the modified property is invalid', () => {
      expect(() => {
        Character.create().withModifier('bogus', (t) => {});
      }).to.throw(Error);
    });
  });

  describe('#choose', () => {
    it('makes a choice and implements the consequences', () => {
      expect(Character.create().choose('+2 strength or dex', 'strength').strength).to.eq(10);
    });

    context.skip('when the consequence of a choice is to set the value of a property', () => {
      it('sets the value', () => {
        expect(Character.create().choose('class', 'barbarian').gameClass).to.eq('barbarian');
      });
    });

    it('throws an error if given an invalid choice name', () => {
      expect(() => {
        Character.create().choose('bogus', 'blarg');
      }).to.throw(Error);
    });
  });

  describe('#unmakeChoice', () => {
    it('can unmake a decision, reverting the consequences', () => {
      let character = Character.create().choose('+2 strength or dex', 'strength');
      expect(character.unmakeChoice('+2 strength or dex').strength).to.eq(8);
    });

    it('throws an error if given an invalid choice name', () => {
      expect(() => {
        Character.create().unmakeChoice('bogus');
      }).to.throw(Error);
    });
  });
});
