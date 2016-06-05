import React from "react";

// props: service
export default class BasedLoadMoreComponent extends React.Component {
  constructor(...args) {
    super(...args);

    this.items = [];
    this.state = {
      isLoading: false,
      total: args[ args.length - 1 ] || 0,
      loadedItem: 0,
      currentPage: 0,
    };

    this.onReceiveLoadmoreResult = this.onReceiveLoadmoreResult.bind(this);
    this.loadmore = this.loadmore.bind(this);

    this.service = args[args.length - 2];
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
      this.items.push(newItem);
    });

    this.state.currentPage++;
    this.state.loadedItem += result.data.length;
    this.state.isLoading = false;

    this.forceUpdate();

    return true;
  }

  getLoadMoreBtn() {
    return this.state.loadedItem < this.props.totalItem ? (
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