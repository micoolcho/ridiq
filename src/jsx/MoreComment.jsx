import React from 'react';
import Monent from 'moment';
import CommentService from './services/CommentService.jsx';

console.log(Monent.now());

export default class MoreComment extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      isLoading: false,
      loadedItem: 0,
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

    console.log(this.state.loadedItem, this.props.totalItem)

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
              <li key={`comment-${comment.id}`} className="comment">
                <div className="avatar"></div>
                <div className="time">{comment.time}</div>
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
    this.setState({
      loadedItem: this.props.loadedItem,
    });
  }

  onClickLoadMoreBtn() {
    if (this.state.isLoading) return;
    this.setState({
      isLoading: true,
    });

    CommentService.loadMore();
  }

  onReceiveLoadmoreResult(result) {
    result.map((newItem)=>{
      this.state.items.unshift(newItem);
    });

    this.state.loadedItem += result.length;
    this.state.isLoading = false;

    this.forceUpdate();
  }
}