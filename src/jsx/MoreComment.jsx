import React from 'react';
import CommentService from './services/CommentService.jsx';
import Moment from 'moment';

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
            let userAvatarThumbUrl = comment.user.avatar_thumb_url || "/assets/user_default_avatar.png";

            return (
              <li key={`comment-${Math.random()}`} className="comment">
                <div className="avatar">
                  <a href={comment.user.public_url}>
                    <img src={userAvatarThumbUrl} />
                  </a>
                </div>
                <div className="time">
                  {
                    Moment(new Date(comment.created_at * 1000)).fromNow()
                  }
                </div>
                <div className="content">
                  <div className="username">
                    <a href={comment.user.public_url}>{comment.user.name}</a>
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
    result.data.map((newItem)=>{
      this.state.items.unshift(newItem);
    });

    this.state.currentPage++;
    this.state.loadedItem += result.data.length;
    this.state.isLoading = false;

    this.forceUpdate();
  }
}