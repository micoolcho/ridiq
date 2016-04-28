import {EventEmitter} from 'fbemitter';
import Es6Promise from 'es6-promise';
import jQuery from 'jquery';

export default class QuestionService extends EventEmitter {
  constructor(...args) {
    super(...args);
    Es6Promise.polyfill();
  }

  post(content) {
    jQuery.ajax({
      url: window.ridiqConf.askQuestion.apiPost,
      method: "POST",
      data: {
        user_id: window.ridiqConf.askQuestion.userId,
        content: content,
      },
    }).success((resp) => {
      this.emit('posted', resp);
    });
  }
}

export default new QuestionService();