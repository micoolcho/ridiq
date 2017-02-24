import {EventEmitter} from 'fbemitter';
import Es6Promise from 'es6-promise';
import Fetch from 'isomorphic-fetch';

export default class BasedLoadMoreService extends EventEmitter {
  constructor(...args) {
    super(...args);
    Es6Promise.polyfill();
  }

  loadMore(pageNum) {
    Fetch(this.getApiUrl(pageNum), {
      method: "GET",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((stories) => {
        this.emit('loadmore', stories);
      });
  }

  getApiUrl() {
    return "";
  }
}
