import { Animal } from "./Animal.js";

export class Aguila extends Animal {
  constructor(nombre, img, sonido) {
    super(nombre, img, sonido);
  }
  chillar() {
    return this._sonido;
  }
}
