import PouchyStore from 'pouchy-store';
import config from '../config/index';

class TaskStore extends PouchyStore {
    get name() {
      return this._name;
    }
  
    setName(params) {
      this._name = `todos_${params}`;
    }
  
    get urlRemote() {
      return config.couchDBUrl;
    }
  
    get optionsRemote() {
      return {
        auth: config.couchDBAuth,
      };
    }
  
    // sortData(data) {
    //   data.sort((one, two) => {
    //     const oneTs = one.createdAt;
    //     const twoTs = two.createdAt;
    //     if (oneTs > twoTs) return -1;
    //     if (oneTs < twoTs) return 1;
    //     return 0;
    //   });
    // }
  }
  
  export default new TaskStore();