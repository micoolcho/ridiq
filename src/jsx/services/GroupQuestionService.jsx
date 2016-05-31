import {EventEmitter} from 'fbemitter';
import Es6Promise from 'es6-promise';
import Fetch from 'isomorphic-fetch';

export default class GroupQuestionService extends EventEmitter {
  constructor(...args) {
    super(...args);
    Es6Promise.polyfill();
  }

  loadMore(pageNum = 1) {
    const apiUrl =
      window.ridiqConf.groupQuestion.apiGet + "?" +
      "user_id=" + window.ridiqConf.groupQuestion.groupId + "&" +
      "perpage=" + window.ridiqConf.groupQuestion.perPage + "&" +
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

export default new GroupQuestionService();