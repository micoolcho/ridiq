import {EventEmitter} from 'fbemitter';
import Es6Promise from 'es6-promise';
import jQuery from 'jquery';

export default class AskQuestionService extends EventEmitter {
  constructor(...args) {
    super(...args);
    Es6Promise.polyfill();
  }

  // params: content, subject_id, subject_type
  post(data) {
    jQuery.ajax({
      url: window.yamConf.askQuestion.apiPost,
      method: "POST",
      data: data,
    }).success((resp) => {
      this.emit('posted', true);
    }).error(()=>{
      this.emit('posted', false);
    });
  }
}

export default new AskQuestionService();