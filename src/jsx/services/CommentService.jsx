import {EventEmitter} from 'fbemitter';

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
        content: `==== lorem ipsum ${Math.random()} ====`,
        // FIXME use moment
        time: "10m",
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
        content: `==== lorem ipsum ${Math.random()} ====`,
        time: "10m",
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
        content: `==== lorem ipsum ${Math.random()} ====`,
        time: "10m",
      },
    ];

    setTimeout(()=>{
      this.emit('loadmore', result);
    }, 1000);
  }
}

export default new CommentService();