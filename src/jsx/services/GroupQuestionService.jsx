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
    const apiUrl = [
      window.ridiqConf.groupQuestion.apiGet,
      "?",
      `perpage=${ window.ridiqConf.groupQuestion.perPage }&`,
      `page=${ pageNum }`,
      `filter=${ this.filter }`
    ].join("");

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
        setTimeout(()=>{
          this.emit('loadmore', stories);
        }, 1000);
        // FIXME remote setTimeout when build production
      });
  }
}

export const FILTER = {
  TRENDING: 0,
};