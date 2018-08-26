export class Mensagem {
  // se não for passado nada, será uma string em branco
  constructor (texto = '') {
    this._texto = texto;
    // Object.freeze(this);
  }

  get texto() {
    return this._texto;
  }

  set texto(texto) {
    // to achieve immutability 
    // return new Mensagem(texto);
    this._texto = texto;
  }
}