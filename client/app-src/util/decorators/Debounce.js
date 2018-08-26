
/**
 * Debounce Decorator
 * @param {int} milissegundos default 500ms
 */
export function debounce(milissegundos = 500) {
  return function (target, key, descriptor) {
    const metodoOriginal = descriptor.value;
    let timer = 0;
    descriptor.value = function(...args) {

      if(event) {
        event.preventDefault();
      }

      clearTimeout(timer);
      // chama metodo original depois de 500 milissegundos
      timer = setTimeout(() => 
        metodoOriginal.apply(this, args)
      , milissegundos);
    }
    return descriptor;
  }
}