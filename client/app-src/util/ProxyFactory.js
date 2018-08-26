export class ProxyFactory {
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

        if(ProxyFactory._ehFuncao(target[prop]) && 
          props.includes(prop)){
             // retorna uma nova função com contexto dinâmico
            // antes que o apply aplicado por padrão pelo
            // interpretador seja chamado.
            return function () {
              console.log(`${prop} disparou a armadilha`);

              target[prop].apply(target, arguments);

              armadilha(target);
            }
        } else {
          return target[prop];
        }
      },
      // lidando com props
      set(target, prop, value, receiver) {
        const updated = Reflect.set(target, prop, value);

        if(props.includes(prop)) armadilha(target);

        return updated;
      }
    });
  }

  static _ehFuncao(fn) {
    return typeof(fn) == typeof(Function);
  }
}