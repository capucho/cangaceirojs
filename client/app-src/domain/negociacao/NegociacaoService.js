import { HttpService, ApplicationException } from '../../util/index.js';
import { Negociacao }  from './Negociacao.js';

export class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    return this._http
        .get('http://localhost:3000/negociacoes/semana')
        .then(
          dados => {
            return dados.map(object => new Negociacao(new Date(object.data), 
                          object.quantidade, object.valor));
          },
          err => {
            throw new ApplicationException('Nao foi possivel obter as negociacoes da semana');
          }
        );
  }
  obtemNegociacoesDaSemanaAnterior() {
    return this._http
    .get('http://localhost:3000/negociacoes/anterior')
    .then(
      dados => {
        return dados.map(object => new Negociacao(new Date(object.data), 
                      object.quantidade, object.valor));
      },
      err => {
        throw new ApplicationException('Nao foi possivel obter as negociacoes da semana anterior');
      }
    );
  }

  obtemNegociacoesDaSemanaRetrasada() {
    return this._http
    .get('http://localhost:3000/negociacoes/retrasada')
    .then(
      dados => {
        return dados.map(object => new Negociacao(new Date(object.data), 
                      object.quantidade, object.valor));
      },
      err => {
        throw new ApplicationException('Nao foi possivel obter as negociacoes da semana retrasada');
      }
    );
  }

  async obtemNegociacoesDoPeriodo() {
    
    try {
      let periodo = await Promise.all([
        this.obterNegociacoesDaSemana(),
        this.obtemNegociacoesDaSemanaAnterior(),
        this.obtemNegociacoesDaSemanaRetrasada()
      ]);

      return periodo.reduce((novoArray, item) => novoArray.concat(item), [])
              .sort((a,b) => b.data.getTime() - a.data.getTime());
    } catch(e) {
      console.log(e);
      throw new ApplicationException('Nao foi possivel obter as negociacoes do periodo');
    }
    
  }
}