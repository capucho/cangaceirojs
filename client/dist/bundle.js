webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bind_js__ = __webpack_require__(16);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__Bind_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConnectionFactory_js__ = __webpack_require__(7);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DaoFactory_js__ = __webpack_require__(17);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_2__DaoFactory_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ApplicationException_js__ = __webpack_require__(9);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__ApplicationException_js__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__ApplicationException_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__HttpService_js__ = __webpack_require__(18);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__HttpService_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ProxyFactory_js__ = __webpack_require__(6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__decorators_Debounce_js__ = __webpack_require__(19);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__decorators_Debounce_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__decorators_Controller_js__ = __webpack_require__(20);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_7__decorators_Controller_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__decorators_BindEvent_js__ = __webpack_require__(21);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__decorators_BindEvent_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Obrigatorio_js__ = __webpack_require__(22);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__Obrigatorio_js__["a"]; });











/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return View; });
let View = class View {
  constructor(seletor) {
    this._elemento = document.querySelector(seletor);
  }

  update(model) {
    this._elemento.innerHTML = this.template(model);
  }

  template(model) {
    throw new Error('Você precisa implementar o método template');
  }
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Negociacao; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index_js__ = __webpack_require__(1);


let Negociacao = class Negociacao {

  //obrigatorio() seria chamado como valor default quando nada fosse passado
  constructor(_data = __WEBPACK_IMPORTED_MODULE_0__util_index_js__["i" /* obrigatorio */]('data'), _quantidade = __WEBPACK_IMPORTED_MODULE_0__util_index_js__["i" /* obrigatorio */]('quantidade'), _valor = __WEBPACK_IMPORTED_MODULE_0__util_index_js__["i" /* obrigatorio */]('valor')) {
    // no construtor eh onde definimos as propriedades de uma classe

    // forma 1 de fazer 
    // criando nova data para que seja imutável
    // this._data = new Date(data.getTime());
    // this._quantidade = quantidade;
    // this._valor = valor;

    // dessa forma, o objeto inicializado terá a chave _quantidade com o respectivo valor
    // da variavel
    Object.assign(this, { _quantidade, _valor });
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

};

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__negociacao_Negociacao_js__ = __webpack_require__(3);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__negociacao_Negociacao_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__negociacao_NegociacaoDao_js__ = __webpack_require__(8);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__negociacao_Negociacoes_js__ = __webpack_require__(23);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__negociacao_Negociacoes_js__["a"]; });


// export * from './negociacao/NegociacaoService.js';


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProxyFactory; });
let ProxyFactory = class ProxyFactory {
  static create(objeto, props, armadilha) {
    return new Proxy(objeto, {
      // target: objeto encapsulado pelo proxy
      // prop: stirng com a property chamada
      // value: valor
      // receiver eh uma ref para o proprio proxy
      /*
        Por baixo dos panos o js realize um get para obter referencia ao metodo e depois um apply para passar
        seus parametros
      */
      get(target, prop, value, receiver) {

        if (ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {
          // retorna uma nova função com contexto dinâmico
          // antes que o apply aplicado por padrão pelo
          // interpretador seja chamado.
          return function () {
            console.log(`${prop} disparou a armadilha`);

            target[prop].apply(target, arguments);

            armadilha(target);
          };
        } else {
          return target[prop];
        }
      },
      // lidando com props
      set(target, prop, value, receiver) {
        const updated = Reflect.set(target, prop, value);

        if (props.includes(prop)) armadilha(target);

        return updated;
      }
    });
  }

  static _ehFuncao(fn) {
    return typeof fn == typeof Function;
  }
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionFactory; });
const _stores = ['negociacoes'];
let _connection = null,
    _close = null;

let ConnectionFactory = class ConnectionFactory {
  constructor() {
    throw new Error('Not possible');
  }

  static getConnection() {
    return new Promise((resolve, reject) => {
      if (_connection) {
        resolve(_connection);
      }
      // IDBOpenDBRequest
      const openRequest = indexedDB.open("jscangaceiro", 1);

      openRequest.onupgradeneeded = e => {
        ConnectionFactory._createStores(e.target.result);
      };

      openRequest.onsuccess = e => {
        _connection = e.target.result;
        _close = _connection.close.bind(_connection);
        _connection.close = () => {
          throw new Error('Nao fecha essa porra, seu merda. Geral ta usando o singleton');
        };
        // e.target.result eh uma instancia e IDBDatabase
        resolve(e.target.result);
      };

      openRequest.onerror = e => {
        reject(e.target.error.name);
      };
    });
  }

  static closeConnection() {
    if (_connection) {
      _close();
    }
  }

  static _createStores(connection) {
    _stores.forEach(store => {
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store);
      }
      connection.createObjectStore(store, {
        autoIncrement: true
      });
    });
  }
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NegociacaoDao; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Negociacao_js__ = __webpack_require__(3);


let NegociacaoDao = class NegociacaoDao {

  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).add(negociacao);
      request.onsuccess = e => resolve();

      request.onerror = e => {
        console.log(e.target.error);
        reject('Não foi possível salvar a negociação');
      };
    });
  }

  listaTodos() {
    return new Promise((resolve, reject) => {
      const negociacoes = [];

      const cursor = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).openCursor();

      cursor.onsuccess = e => {
        const atual = e.target.result;

        if (atual) {
          negociacoes.push(new __WEBPACK_IMPORTED_MODULE_0__Negociacao_js__["a" /* Negociacao */](atual.value._data, atual.value._quantidade, atual.value._valor));
          atual.continue();
        } else {
          resolve(negociacoes);
        }
      };

      cursor.onerror = e => {
        console.log(e.target.error);
        reject('Nao foi possivel listar as negociacoes');
      };
    });
  }

  apagaTodos() {
    return new Promise((resolve, reject) => {

      const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).clear();

      request.onsuccess = e => resolve();

      request.onerror = e => {
        console.log(e.target.error);
        reject('Erro nessa porra');
      };
    });
  }
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationException; });
/* unused harmony export isApplicationException */
/* harmony export (immutable) */ __webpack_exports__["b"] = getExceptionMessage;
let ApplicationException = class ApplicationException extends Error {

  constructor(msg = '') {
    super(msg);
    this.name = this.constructor.name;
  }
};

const exception = ApplicationException;

function isApplicationException(err) {
  return err instanceof exception || Object.getPrototypeOf(err) instanceof exception;
}

function getExceptionMessage(err) {
  if (isApplicationException(err)) {
    return err.message;
  } else {
    console.log(err);
    return 'Não foi possivel realizar a operação';
  }
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateConverter; });
let DateConverter = class DateConverter {

  constructor() {
    throw new Error('DateConverter não pode ser instanciada');
  }

  // metodos estaticos em JS
  static paraTexto(data) {
    // JS < ES2015
    // return data.getDate()
    // + '/' + (data.getMonth() + 1)
    // + '/' + data.getFullYear();

    //JS > ES2015
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  static paraData(texto) {
    if (!/\d{2}\/\d{2}\/\d{4}/.test(texto)) throw new DataInvalidaException();

    return new Date(...texto.split('/').reverse().map((item, index) => index == 1 ? item - 1 : item));
  }
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_dist_css_bootstrap_css__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_dist_css_bootstrap_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bootstrap_dist_css_bootstrap_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_dist_css_bootstrap_theme_css__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_dist_css_bootstrap_theme_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bootstrap_dist_css_bootstrap_theme_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_js_modal_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_js_modal_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bootstrap_js_modal_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_style_guide_css__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_style_guide_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__css_style_guide_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controllers_NegociacaoController_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_index_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__domain_index_js__ = __webpack_require__(5);






// app/app.js





const controller = new __WEBPACK_IMPORTED_MODULE_4__controllers_NegociacaoController_js__["a" /* NegociacaoController */]();
// const $ = document.querySelector.bind(document);

// $('.form')
//   // passando o contexto para que o controller em seu contexto
//   // e nao utilize o contexto de document
//   .addEventListener('submit', controller.adiciona.bind(controller));

// $('#botao-apaga')
//   .addEventListener('click', controller.apaga.bind(controller));

// $('#botao-importa')
//   .addEventListener('click',  controller.importaNegociacoes.bind(controller));


const negociacao = new __WEBPACK_IMPORTED_MODULE_6__domain_index_js__["a" /* Negociacao */](new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');

const body = JSON.stringify(negociacao);
const method = 'POST';
const config = {
  method,
  headers,
  body
};

fetch('http://localhost:3000/negociacoes', config).then(() => console.log('Dado enviado'));

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NegociacaoController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__domain_index_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_index_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_index_js__ = __webpack_require__(1);
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}







let NegociacaoController = (_dec = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["e" /* controller */]('#data', '#quantidade', '#valor'), _dec2 = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["d" /* bindEvent */]('submit', '.form'), _dec3 = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["f" /* debounce */](), _dec4 = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["d" /* bindEvent */]('click', '#botao-apaga'), _dec5 = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["d" /* bindEvent */]('click', '#botao-importa'), _dec6 = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["f" /* debounce */](1500), _dec(_class = (_class2 = class NegociacaoController {

  constructor(_inputData, _inputQuantidade, _inputValor) {
    // com o bind o metodo continua em seu contexto
    const $ = document.querySelector.bind(document);
    Object.assign(this, {
      _inputData,
      _inputQuantidade,
      _inputValor
    });
    // this._service = new NegociacaoService();
    this._negociacoes = new __WEBPACK_IMPORTED_MODULE_2__util_index_js__["b" /* Bind */](new __WEBPACK_IMPORTED_MODULE_0__domain_index_js__["b" /* Negociacoes */](), new __WEBPACK_IMPORTED_MODULE_1__ui_index_js__["d" /* NegociacoesView */]('#negociacoes'), 'adiciona', 'esvazia');

    this._mensagem = new __WEBPACK_IMPORTED_MODULE_2__util_index_js__["b" /* Bind */](new __WEBPACK_IMPORTED_MODULE_1__ui_index_js__["b" /* Mensagem */](), new __WEBPACK_IMPORTED_MODULE_1__ui_index_js__["c" /* MensagemView */]('#mensagemView'), 'texto');

    this._init();
  }

  _init() {
    var _this = this;

    return _asyncToGenerator(function* () {

      try {
        const dao = yield __WEBPACK_IMPORTED_MODULE_2__util_index_js__["h" /* getNegociacaoDao */]();
        const negociacoes = yield dao.listaTodos();
        negociacoes.forEach(function (negociacao) {
          return _this._negociacoes.adiciona(negociacao);
        });
      } catch (err) {
        _this._mensagem.texto = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["g" /* getExceptionMessage */](err);
      }
      // getNegociacaoDao()
      //   .then(dao => dao.listaTodos())
      //   .then(negociacoes =>
      //     negociacoes.forEach(negociacao =>
      //       this._negociacoes.adiciona(negociacao)))
      //   .catch(err => this._mensagem.texto = err);
    })();
  }

  adiciona(event) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      try {
        event.preventDefault();
        // inclui a negociação
        const negociacao = _this2._criaNegociacao();
        const dao = yield __WEBPACK_IMPORTED_MODULE_2__util_index_js__["h" /* getNegociacaoDao */]();
        yield dao.adiciona(negociacao);

        _this2._negociacoes.adiciona(_this2._criaNegociacao());
        _this2._mensagem.texto = 'Negociação adicionada com sucesso!';

        _this2._limpaFormulario();
      } catch (err) {
        console.log(err);
        console.log(err.stack);
        _this2._mensagem.texto = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["g" /* getExceptionMessage */](err);
      }
    })();
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  _criaNegociacao() {
    return new __WEBPACK_IMPORTED_MODULE_0__domain_index_js__["a" /* Negociacao */](__WEBPACK_IMPORTED_MODULE_1__ui_index_js__["a" /* DateConverter */].paraData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
  }

  apaga() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      try {
        const dao = yield __WEBPACK_IMPORTED_MODULE_2__util_index_js__["h" /* getNegociacaoDao */]();
        yield dao.apagaTodos();

        _this3._negociacoes.esvazia();
        _this3._mensagem.texto = 'Negociações apagadas com sucesso ';
      } catch (err) {
        _this3._mensagem.texto = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["g" /* getExceptionMessage */](err);
      }
    })();
  }

  importaNegociacoes() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      //paralelo
      try {
        //lazy loading do modulo
        const {
          NegociacaoService
        } = yield __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 45));
        const service = new NegociacaoService();
        const negociacoes = yield service.obtemNegociacoesDoPeriodo();
        console.log(negociacoes);
        negociacoes.filter(function (novaNegociacao) {
          return (// retrieve the data that is not imported already
            !_this4._negociacoes.paraArray() //check whether the element from the array already exists inside the _negociacoes array
            .some(function (negociacaoExistente) {
              return novaNegociacao.equals(negociacaoExistente);
            })
          );
        }).forEach(function (negociacao) {
          return _this4._negociacoes.adiciona(negociacao);
        });
        _this4._mensagem.texto = 'Negociacoes importadas com sucesso';
      } catch (err) {
        _this4._mensagem.texto = __WEBPACK_IMPORTED_MODULE_2__util_index_js__["g" /* getExceptionMessage */](err);
      }

      // executando sequencial
      // this._service.obterNegociacoesDaSemana()
      //   .then(semana => {
      //     negociacoes.push(...semana);
      //     return this._service.obtemNegociacoesDaSemanaAnterior();
      //   })
      //   .then(anterior => {
      //     negociacoes.push(...anterior);
      //     return this._service.obtemNegociacoesDaSemanaRetrasada();
      //   })
      //   .then(retrasada => {
      //     negociacoes.push(...retrasada);
      //     negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
      //     this._mensagem.texto = 'Negociacoes importadas com sucesso';
      //   })
      //   .catch(err => this._mensagem.texto = err);
    })();
  }
}, (_applyDecoratedDescriptor(_class2.prototype, 'adiciona', [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'adiciona'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'apaga', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'apaga'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'importaNegociacoes', [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'importaNegociacoes'), _class2.prototype)), _class2)) || _class);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bind; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProxyFactory_js__ = __webpack_require__(6);


let Bind = class Bind {
  // ...props: rest params - todos os parametros passados para o metodo
  // a partir do terceiro serao considerados como um array
  constructor(model, view, ...props) {
    const proxy = __WEBPACK_IMPORTED_MODULE_0__ProxyFactory_js__["a" /* ProxyFactory */].create(model, props, model => {
      view.update(model);
    });

    view.update(model);

    return proxy;
  }
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNegociacaoDao; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConnectionFactory_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__domain_negociacao_NegociacaoDao_js__ = __webpack_require__(8);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




let getNegociacaoDao = (() => {
  var _ref = _asyncToGenerator(function* () {
    let conn = yield __WEBPACK_IMPORTED_MODULE_0__ConnectionFactory_js__["a" /* ConnectionFactory */].getConnection();
    return new __WEBPACK_IMPORTED_MODULE_1__domain_negociacao_NegociacaoDao_js__["a" /* NegociacaoDao */](conn);
  });

  return function getNegociacaoDao() {
    return _ref.apply(this, arguments);
  };
})();

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
let HttpService = class HttpService {
  // get(url) {
  //   return new Promise( (resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('GET', url);

  //     xhr.onreadystatechange = () => {
  //       if(xhr.readyState == 4) {
  //         if(xhr.status == 200) {
  //           resolve(JSON.parse(xhr.responseText));
  //         } else {
  //           reject(xhr.responseText);
  //         }
  //       }
  //     };

  //     xhr.send();
  //   });
  // }
  _handleErrors(res) {
    if (!res.ok) throw new Error(res.statusText);
    return res;
  }

  get(url) {
    return fetch(url).then(res => this._handleErrors(res)).then(res => res.json());
  }
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = debounce;

/**
 * Debounce Decorator
 * @param {int} milissegundos default 500ms
 */
function debounce(milissegundos = 500) {
  return function (target, key, descriptor) {
    const metodoOriginal = descriptor.value;
    let timer = 0;
    descriptor.value = function (...args) {

      if (event) {
        event.preventDefault();
      }

      clearTimeout(timer);
      // chama metodo original depois de 500 milissegundos
      timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
    };
    return descriptor;
  };
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = controller;
function controller(...seletores) {
  const elements = seletores.map(seletor => document.querySelector(seletor));

  return function (constructor) {
    const constructorOriginal = constructor;

    // nao usa arrow function para que o this seja dinâmico e não estático
    const constructorNovo = function () {
      const instance = new constructorOriginal(...elements);

      Object.getOwnPropertyNames(constructorOriginal.prototype).forEach(property => {
        if (Reflect.hasMetadata('bindEvent', instance, property)) {
          _associaEvento(instance, Reflect.getMetadata('bindEvent', instance, property));
        }
      });
    };

    // ajuste no prototype
    constructorNovo.prototype = constructorOriginal.prototype;

    return constructorNovo;
  };
}

function _associaEvento(instance, metadado) {
  document.querySelector(metadado.selector).addEventListener(metadado.event, event => {
    if (metadado.prevent) event.preventDefault();
    instance[metadado.propertyKey](event);
  });
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index_js__ = __webpack_require__(1);


function bindEvent(event = __WEBPACK_IMPORTED_MODULE_0__util_index_js__["i" /* obrigatorio */]('event'), selector = __WEBPACK_IMPORTED_MODULE_0__util_index_js__["i" /* obrigatorio */]('selector'), prevent = true) {

  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata('bindEvent', {
      event,
      selector,
      prevent,
      propertyKey
    }, Object.getPrototypeOf(target), propertyKey);
    return descriptor;
  };
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = obrigatorio;
function obrigatorio(parametro) {
  throw new Error(`${parametro} é um parâmetro obrigatório!`);
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Negociacoes; });
let Negociacoes = class Negociacoes {
  constructor() {
    this._negociacoes = [];
    Object.freeze(this);
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
  }

  paraArray() {
    // retorna nova referencia
    return [].concat(this._negociacoes);
  }

  get volumeTotal() {
    return this._negociacoes.reduce((total, negociacao) => {
      return total + negociacao.volume;
    }, 0);
  }

  esvazia() {
    this._negociacoes.length = 0;
  }
};

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_MensagemView_js__ = __webpack_require__(25);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__views_MensagemView_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_NegociacoesView_js__ = __webpack_require__(26);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__views_NegociacoesView_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_View_js__ = __webpack_require__(2);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_Mensagem_js__ = __webpack_require__(27);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__models_Mensagem_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__converters_DataInvalidaException_js__ = __webpack_require__(28);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__converters_DateConverter_js__ = __webpack_require__(10);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__converters_DateConverter_js__["a"]; });







/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MensagemView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_js__ = __webpack_require__(2);


let MensagemView = class MensagemView extends __WEBPACK_IMPORTED_MODULE_0__View_js__["a" /* View */] {
  template(model) {
    return model.texto ? `<p class="alert alert-info">${model.texto}</p` : `<p></p>`;
  }
};

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NegociacoesView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__converters_DateConverter_js__ = __webpack_require__(10);



let NegociacoesView = class NegociacoesView extends __WEBPACK_IMPORTED_MODULE_0__View_js__["a" /* View */] {

  template(model) {
    return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
          ${model.paraArray().map(negociacao => {
      // precisa converter antes de retornar!
      return `
              <tr>
                <td>${__WEBPACK_IMPORTED_MODULE_1__converters_DateConverter_js__["a" /* DateConverter */].paraTexto(negociacao.data)}</td>
                <td>${negociacao.quantidade}</td>
                <td>${negociacao.valor}</td>
                <td>${negociacao.volume}</td>
              </tr>
            `;
    }).join('')}
        </tbody>
        
        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td>${model.volumeTotal}</td>
          </tr>
        </tfoot>
    </table> `;
  }
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mensagem; });
let Mensagem = class Mensagem {
  // se não for passado nada, será uma string em branco
  constructor(texto = '') {
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
};

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DataInvalidaException */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_ApplicationException_js__ = __webpack_require__(9);


let DataInvalidaException = class DataInvalidaException extends __WEBPACK_IMPORTED_MODULE_0__util_ApplicationException_js__["a" /* ApplicationException */] {
  constructor() {
    super('A data deve estar no formato dd/mm/aaaa');
  }
};

/***/ })
],[11]);