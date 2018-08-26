export function controller(...seletores) {
  const elements = seletores.map(seletor => document.querySelector(seletor));

  return function (constructor) {
    const constructorOriginal = constructor;

    // nao usa arrow function para que o this seja dinâmico e não estático
    const constructorNovo = function () {
      const instance = new constructorOriginal(...elements);

      Object
        .getOwnPropertyNames(constructorOriginal.prototype)
        .forEach(property => {
          if (Reflect.hasMetadata('bindEvent', instance, property)) {
            _associaEvento(instance, Reflect.getMetadata('bindEvent', instance, property));
          }
        })
    }

    // ajuste no prototype
    constructorNovo.prototype = constructorOriginal.prototype;

    return constructorNovo;
  }
}

function _associaEvento(instance, metadado) {
  document
    .querySelector(metadado.selector)
    .addEventListener(metadado.event, event => {
      if (metadado.prevent) event.preventDefault();
      instance[metadado.propertyKey](event);
    });
}