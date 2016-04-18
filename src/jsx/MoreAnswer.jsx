import React from 'react';
import AnswerService from './services/AnserServices.jsx';

export default class MoreAnswer extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      isLoading: false,
      loadedItem: 0,
      item: [],
    };

    this.onClickLoadMoreBtn = this.onClickLoadMoreBtn.bind(this);
    this.onReceiveLoadmoreResult = this.onReceiveLoadmoreResult.bind(this);

    AnswerService.addListener('loadmore', this.onReceiveLoadmoreResult);
  }

  render() {
    if (this.props.totalItem == 0) {
      return (<span></span>);
    }

    return (
      <div>
        {
          this.state.item.map((item)=>{
            return (
              <div className="answer" key={`answer-${Math.random()}`}>
                <img className="cover" src={item.cover} alt="" />
                <a href={item.url} className="question">{item.question}</a>
                <div className="info">
                  <span><img src="images/like_icon.png" alt="" /> {item.like}</span>
                  <span><img src="images/comment_icon.png" alt="" /> {item.comment}</span>
                </div>
              </div>
            )
          })
        }

        <div className="clearfix"></div>

        {
          this.state.loadedItem < this.props.totalItem ? (
            <div className="text-center m-t-20">
              <div
                onClick={this.onClickLoadMoreBtn}
                className={'button button-large ' + (this.state.isLoading ? 'disabled' : '')}>
                {
                  this.state.isLoading ? 'loading...' : 'load more'
                }
              </div>
            </div>
          ) : <span></span>
        }
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      loadedItem: this.props.loadedItem,
    });
  }

  onClickLoadMoreBtn() {
    if (this.state.isLoading) return;
    this.setState({
      isLoading: true,
    });

    AnswerService.loadMore();
  }

  onReceiveLoadmoreResult(result) {
    result.map((newItem)=>{
      this.state.item.push(newItem);
    });

    this.state.loadedItem += result.length;
    this.state.isLoading = false;

    this.forceUpdate();
  }
}