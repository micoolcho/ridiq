import React from "react";

// externalArgs :
// {
//    total: number,
//    unshiftLoadedItems: boolean,
//    service: EventEmitter
// }
export default class BasedLoadMoreComponent extends React.Component {
  constructor(...args) {
    super(...args);

    const externalArgs = args[ args.length - 1 ];

    if (!externalArgs.service) {
      throw new Error("Service is missing");
    }

    this.items = [];
    this.unshiftLoadedItems = externalArgs.unshiftLoadedItems || false;
    this.state = {
      isLoading: false,
      total: externalArgs.total || 0,
      loadedItem: 0,
      currentPage: 0,
    };

    this.onReceiveLoadmoreResult = this.onReceiveLoadmoreResult.bind(this);
    this.loadmore = this.loadmore.bind(this);

    this.service = externalArgs.service;
    this.service.addListener('loadmore', this.onReceiveLoadmoreResult);
  }

  loadmore() {
    if (!this.canLoadMore()) return;

    this.setState({
      isLoading: true,
    }, ()=>{
      this.service.loadMore(this.state.currentPage + 1);
    });
  }

  canLoadMore() {
    return (
      !this.state.isLoading &&
      this.state.loadedItem < this.state.total
    )
  }

  onReceiveLoadmoreResult(result) {
    if (!result.data || !result.data.length) {
      return false;
    }

    result.data.map((newItem)=>{
      if (this.unshiftLoadedItems) {
        this.items.unshift(newItem);
      } else {
        this.items.push(newItem);
      }
    });

    this.state.currentPage++;
    this.state.loadedItem += result.data.length;
    this.state.isLoading = false;

    this.forceUpdate();

    return true;
  }

  getLoadMoreBtn() {
    return this.state.loadedItem < this.state.total ? (
      <div className="text-center m-t-20">
        <div
          onClick={this.loadmore}
          className={'button button-large ' + (this.state.isLoading ? 'disabled' : '')}>
          {
            this.state.isLoading ? 'loading...' : 'load more'
          }
        </div>
      </div>
    ) : <span></span>
  }
}
