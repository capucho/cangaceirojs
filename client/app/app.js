// app/app.js
import { NegociacaoController } from './controllers/NegociacaoController.js';
import { debounce } from './util/index.js';

import { Negociacao } from './domain/index.js';

const controller = new NegociacaoController();
// const $ = document.querySelector.bind(document);

// $('.form')
//   // passando o contexto para que o controller em seu contexto
//   // e nao utilize o contexto de document
//   .addEventListener('submit', controller.adiciona.bind(controller));

// $('#botao-apaga')
//   .addEventListener('click', controller.apaga.bind(controller));

// $('#botao-importa')
//   .addEventListener('click',  controller.importaNegociacoes.bind(controller));


const negociacao = new Negociacao(new Date(), 1, 200);
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
//# sourceMappingURL=app.js.map