import { 
  obrigatorio
} from '../../util/index.js';

export class Negociacao {

  //obrigatorio() seria chamado como valor default quando nada fosse passado
  constructor(_data = obrigatorio('data'), _quantidade = obrigatorio('quantidade'), _valor = obrigatorio('valor')) {
    // no construtor eh onde definimos as propriedades de uma classe
    
    // forma 1 de fazer 
    // criando nova data para que seja imutável
    // this._data = new Date(data.getTime());
    // this._quantidade = quantidade;
    // this._valor = valor;

    // dessa forma, o objeto inicializado terá a chave _quantidade com o respectivo valor
    // da variavel
    Object.assign(this, { _quantidade, _valor});
    this._data = new Date(_data.getTime());
    Object.freeze(this);
  }

  get volume() {
    return this._quantidade * this._valor;
  }

  get data() {
    return new Date(this._data.getTime());
  }

  get quantidade() { 
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  equals(negociacao) {
    return JSON.stringify(this) == JSON.stringify(negociacao);
  }

}