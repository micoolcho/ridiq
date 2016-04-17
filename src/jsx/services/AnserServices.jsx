import {EventEmitter} from 'fbemitter';

export default class AnswerService extends EventEmitter {
  constructor(...args) {
    super(...args);
  }

  loadMore() {
    const result = [
      {
        id: Math.random(),
        cover: "images/item1.png",
        question: "lorem",
        like: "69",
        comment: "96",
        url: "single-answer.html",
      },
      {
        id: Math.random(),
        cover: "images/item2.png",
        question: "lorem",
        like: "69",
        comment: "96",
        url: "single-answer.html",
      },
      {
        id: Math.random(),
        cover: "images/item3.png",
        question: "lorem",
        like: "69",
        comment: "96",
        url: "single-answer.html",
      },
    ];

    setTimeout(()=>{
      this.emit('loadmore', result);
    }, 1000);
  }
}

export default new AnswerService();