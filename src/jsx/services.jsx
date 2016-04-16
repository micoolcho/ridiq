import {EventEmitter} from 'fbemitter';

export default class AnswerService extends EventEmitter {
  constructor(...args) {
    super(...args);
  }

  loadmore() {
    const result = [
      {
        id: Math.random(),
        cover: "images/item1.png",
        question: "lorem",
        like: "69",
        comment: "96",
      },
      {
        id: Math.random(),
        cover: "images/item2.png",
        question: "lorem",
        like: "69",
        comment: "96",
      },
      {
        id: Math.random(),
        cover: "images/item3.png",
        question: "lorem",
        like: "69",
        comment: "96",
      },
    ];

    console.log('aaa');

    setTimeout(()=>{
      this.emit('loadmore', result);
    }, 2000);
  }
}

// export default new AnswerService();