const _stores = ['negociacoes'];
let _connection = null,
  _close = null;

export class ConnectionFactory {
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
        _close = _connection.close.bind(_connection)
        _connection.close = () => {
          throw new Error('Nao fecha essa porra, seu merda. Geral ta usando o singleton');
        }
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
}