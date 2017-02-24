import {EventEmitter} from 'fbemitter';
import Es6Promise from 'es6-promise';
import Fetch from 'isomorphic-fetch';

class AnswerService extends EventEmitter {
  constructor(...args) {
    super(...args);
    Es6Promise.polyfill();
  }

  loadMore(pageNum) {
    const apiUrl =
      window.yamConf.answer.apiGet + "?" +
      "user_id=" + window.yamConf.answer.userId + "&" +
      "perpage=" + window.yamConf.answer.perPage + "&" +
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
        this.emit('loadmore', stories);
      });
  }
}

export default new AnswerService();
