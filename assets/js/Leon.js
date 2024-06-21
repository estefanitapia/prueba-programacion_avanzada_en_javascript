import { Animal } from "./Animal.js";

export class Leon extends Animal {
  constructor(nombre, img, sonido) {
    super(nombre, img, sonido);
  }
  rugir() {
    return this._sonido;
  }
}
