import { ProxyFactory } from './ProxyFactory.js';

export class Bind {
  // ...props: rest params - todos os parametros passados para o metodo
  // a partir do terceiro serao considerados como um array
  constructor(model, view, ...props) {
    const proxy = ProxyFactory.create(model, props, model => {
      view.update(model);
    });

    view.update(model);

    return proxy;
  }
}