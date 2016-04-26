import React from 'react';
import CommentService from './services/CommentService.jsx';
import Moment from 'moment';

Moment.updateLocale('en', {
  relativeTime: {
    future : 'in %s',
    past : '%s',
    s : 'now',
    m : '1m',
    mm : '%dm',
    h : '1h',
    hh : '%dh',
    d : '1d',
    dd : '%dd',
    M : 'a month',
    MM : '%d months',
    y : 'a year',
    yy : '%d years'
  }
});

export default class MoreComment extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      isLoading: false,
      loadedItem: 0,
      currentPage: 0,
      items: [],
    };

    this.onClickLoadMoreBtn = this.onClickLoadMoreBtn.bind(this);
    this.onReceiveLoadmoreResult = this.onReceiveLoadmoreResult.bind(this);

    CommentService.addListener('loadmore', this.onReceiveLoadmoreResult);
  }

  render() {
    if (this.props.totalItem == 0) {
      return (<span></span>);
    }

    return (
      <div>
        {
          this.state.loadedItem < this.props.totalItem ? (
            <div
              className={"loadmore-comment " + (this.state.isLoading ? 'disabled' : '')}
              onClick={this.onClickLoadMoreBtn}
            >
              {
                this.state.isLoading ? 'loading...' : 'Load older comments'
              }
            </div>
          ) : <span></span>
        }

        <ul className="comment-list">
        {
          this.state.items.map((comment)=>{
            return (
              <li key={`comment-${Math.random()}`} className="comment">
                <div className="avatar"></div>
                <div className="time">
                  {
                    Moment(new Date(comment.time)).fromNow()
                  }
                </div>
                <div className="content">
                  <div className="username">
                    <a href={comment.user.url}>{comment.user.displayName}</a>
                  </div>
                  <div className="txt">
                    {comment.content}
                  </div>
                  {
                    comment.tags && comment.tags.length ? (
                      <ul className="tags">
                        {
                          comment.tags.map((tag)=>{
                            return(
                              <li key={`tag-${tag}`}>
                                <a href="#">{tag}</a>
                              </li>
                            );
                          })
                        }
                      </ul>
                    ) : <span></span>
                  }
                </div>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.loadmore();
  }

  onClickLoadMoreBtn() {
    this.loadmore();
  }

  loadmore() {
    if (this.state.isLoading) return;
    this.setState({
      isLoading: true,
    });

    CommentService.loadMore(this.state.currentPage + 1);
  }

  onReceiveLoadmoreResult(result) {
    result.map((newItem)=>{
      this.state.items.unshift(newItem);
    });

    this.state.currentPage++;
    this.state.loadedItem += result.length;
    this.state.isLoading = false;

    this.forceUpdate();
  }
}