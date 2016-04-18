import {EventEmitter} from 'fbemitter';
import Es6Promise from 'es6-promise';
import Fetch from 'isomorphic-fetch';
import Config from './../Config.jsx';

export default class CommentService extends EventEmitter {
  constructor(...args) {
    super(...args);
    Es6Promise.polyfill();
  }

  loadMore() {
    Fetch(Config.SERVICE_URI.COMMENT.GET, {
      method: "GET",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((stories) => {
        // FIXME remove setTimeout
        setTimeout(()=>{
          this.emit('loadmore', stories);
        }, 1000);
      });
  }
}

export default new CommentService();