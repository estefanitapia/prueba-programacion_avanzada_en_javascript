import { Animal } from "./Animal.js";

export class Serpiente extends Animal {
  constructor(nombre, img, sonido) {
    super(nombre, img, sonido);
  }
  sisear() {
    return this._sonido;
  }
}
