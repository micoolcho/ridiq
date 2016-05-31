import React from "react";

// props: service
export default class BasedLoadMoreComponent extends React.Component {
  constructor(...args) {
    super(...args);

    this.items = [];
    this.state = {
      isLoading: false,
      loadedItem: 0,
      currentPage: 0,
    };

    this.onClickLoadMoreBtn = this.onClickLoadMoreBtn.bind(this);
    this.onReceiveLoadmoreResult = this.onReceiveLoadmoreResult.bind(this);
    this.loadmore = this.loadmore.bind(this);

    this.service = args[args.length - 1];
    this.service.addListener('loadmore', this.onReceiveLoadmoreResult);
  }

  onClickLoadMoreBtn() {
    this.loadmore();
  }

  loadmore() {
    if (this.state.isLoading) return;
    this.setState({
      isLoading: true,
    });

    this.service.loadMore(this.state.currentPage + 1);
  }

  onReceiveLoadmoreResult(result) {
    result.data.map((newItem)=>{
      this.items.unshift(newItem);
    });

    this.state.currentPage++;
    this.state.loadedItem += result.data.length;
    this.state.isLoading = false;

    this.forceUpdate();
  }
}