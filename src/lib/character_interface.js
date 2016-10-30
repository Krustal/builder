export default class CharacterInterface {
  constructor(character) {
    this.character = character;
  }

  set(property, value) {
    this.character = this.character.set(property, value);
    return this;
  }

  choose(name, choice) {
    this.character = this.character.choose(name, choice);
    return this;
  }
}
