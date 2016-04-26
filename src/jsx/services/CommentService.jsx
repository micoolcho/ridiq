import {EventEmitter} from 'fbemitter';
import Es6Promise from 'es6-promise';
import Fetch from 'isomorphic-fetch';

export default class CommentService extends EventEmitter {
  constructor(...args) {
    super(...args);
    Es6Promise.polyfill();
  }

  loadMore(pageNum) {
    const apiUrl =
      window.ridiqConf.comment.apiGet + "?" +
      "answer_id=" + window.ridiqConf.comment.answerId + "&" +
      "perpage=" + window.ridiqConf.comment.perPage + "&" +
      "page=" + pageNum;

    Fetch(apiUrl, {
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