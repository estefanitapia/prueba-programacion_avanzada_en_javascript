import { Animal } from "./Animal.js";

export class Oso extends Animal {
  constructor(nombre, img, sonido) {
    super(nombre, img, sonido);
  }
  gruñir() {
    return this._sonido;
  }
}
