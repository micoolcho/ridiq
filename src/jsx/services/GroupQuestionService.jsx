import {EventEmitter} from 'fbemitter';
import Es6Promise from 'es6-promise';
import Fetch from 'isomorphic-fetch';

export class GroupQuestionService extends EventEmitter {
  constructor(...args) {
    super(...args);
    Es6Promise.polyfill();

    this.filter = args[ args.length - 1 ];
  }

  loadMore(pageNum = 1) {
    // For stagging
    const apiUrl = [
      window.yamConf.groupQuestion.apiGetPrefix,
      `/${this.filter}`,
      "?",
      `page=${ pageNum }`,
    ].join("");

    // For testing
    // const apiUrl = [
    //   window.yamConf.groupQuestion.apiGetPrefix,
    //   "?",
    //   `page=${ pageNum }`,
    //   `filter=${ this.filter }`
    // ].join("");

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

export const FILTER = {
  TRENDING: 0,
};
