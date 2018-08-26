export class DateConverter {

  constructor () {
    throw new Error('DateConverter não pode ser instanciada');
  }

  // metodos estaticos em JS
  static paraTexto(data){
    // JS < ES2015
    // return data.getDate()
    // + '/' + (data.getMonth() + 1)
    // + '/' + data.getFullYear();

    //JS > ES2015
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  static paraData(texto){
    if(!/\d{2}\/\d{2}\/\d{4}/.test(texto))
      throw new DataInvalidaException();
    

    return new Date(
      ...texto.split('/').reverse()
        .map((item, index) => index == 1 ? item - 1 : item)
    );

  }
}