function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { HttpService, ApplicationException } from '../../util/index.js';
import { Negociacao } from './Negociacao.js';

export let NegociacaoService = class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    return this._http.get('http://localhost:3000/negociacoes/semana').then(dados => {
      return dados.map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor));
    }, err => {
      throw new ApplicationException('Nao foi possivel obter as negociacoes da semana');
    });
  }
  obtemNegociacoesDaSemanaAnterior() {
    return this._http.get('http://localhost:3000/negociacoes/anterior').then(dados => {
      return dados.map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor));
    }, err => {
      throw new ApplicationException('Nao foi possivel obter as negociacoes da semana anterior');
    });
  }

  obtemNegociacoesDaSemanaRetrasada() {
    return this._http.get('http://localhost:3000/negociacoes/retrasada').then(dados => {
      return dados.map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor));
    }, err => {
      throw new ApplicationException('Nao foi possivel obter as negociacoes da semana retrasada');
    });
  }

  obtemNegociacoesDoPeriodo() {
    var _this = this;

    return _asyncToGenerator(function* () {

      try {
        let periodo = yield Promise.all([_this.obterNegociacoesDaSemana(), _this.obtemNegociacoesDaSemanaAnterior(), _this.obtemNegociacoesDaSemanaRetrasada()]);

        return periodo.reduce(function (novoArray, item) {
          return novoArray.concat(item);
        }, []).sort(function (a, b) {
          return b.data.getTime() - a.data.getTime();
        });
      } catch (e) {
        console.log(e);
        throw new ApplicationException('Nao foi possivel obter as negociacoes do periodo');
      }
    })();
  }
};
//# sourceMappingURL=NegociacaoService.js.map