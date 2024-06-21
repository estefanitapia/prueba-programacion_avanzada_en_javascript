import { Animal } from "./Animal.js";

export class Lobo extends Animal {
  constructor(nombre, img, sonido) {
    super(nombre, img, sonido);
  }
  aullar() {
    return this._sonido;
  }
}
