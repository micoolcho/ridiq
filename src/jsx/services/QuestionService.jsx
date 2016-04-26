import {EventEmitter} from 'fbemitter';
import Es6Promise from 'es6-promise';
import Fetch from 'isomorphic-fetch';

export default class QuestionService extends EventEmitter {
  constructor(...args) {
    super(...args);
    Es6Promise.polyfill();
  }

  post(content) {
    Fetch(window.ridiqConf.askQuestion.apiPost, {
      method: "POST",
      data: {
        content: content,
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((stories) => {
        this.emit('posted', stories);
      });
  }
}

export default new QuestionService();