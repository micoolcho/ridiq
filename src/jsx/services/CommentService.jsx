import {EventEmitter} from 'fbemitter';

var count = 0;

export default class CommentService extends EventEmitter {
  constructor(...args) {
    super(...args);
  }

  loadMore() {
    const result = [
      {
        id: Math.random(),
        user: {
          id: "10",
          avatar: "images/item1.png",
          displayName: "Jason Dinh",
          url: "#/user/username"
        },
        tags: [
          "tag1", "tag2", "tag3",
        ],
        content: `==== lorem ipsum ${count++} ====`,
        // FIXME use moment
        time: (new Date()),
      },
      {
        id: Math.random(),
        user: {
          id: "10",
          avatar: "images/item1.png",
          displayName: "Jason Dinh",
          url: "#/user/username"
        },
        tags: [
          "tag1", "tag2", "tag3",
        ],
        content: `==== lorem ipsum ${count++} ====`,
        time: "Sun Apr 17 2016 21:00:20 GMT+0700 (ICT)",
      },
      {
        id: Math.random(),
        user: {
          id: "10",
          avatar: "images/item1.png",
          displayName: "Jason Dinh",
          url: "#/user/username"
        },
        tags: [
          "tag1", "tag2", "tag3",
        ],
        content: `==== lorem ipsum ${count++} ====`,
        time: "Sun Apr 18 2016 8:20:20 GMT+0700 (ICT)",
      },
    ];

    setTimeout(()=>{
      this.emit('loadmore', result);
    }, 1000);
  }
}

export default new CommentService();