import PouchyStore from 'pouchy-store';
import config from '../config/index';

class TaskStore extends PouchyStore {
    get name() {
      return this._name;
    }
  
    setName(params) {
      this._name = params;
    }
  
    get urlRemote() {
      return config.couchDBUrl;
    }
  
    get optionsRemote() {
      return {
        auth: config.couchDBAuth,
      };
    }
  }
  
  export default new TaskStore();