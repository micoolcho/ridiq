import React from 'react';
import CommentService from './services/CommentService.jsx';
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import Moment from 'moment';

export default class MoreComment extends BasedLoadMoreComponent {
  constructor(...args) {
    const externalArgs = {
      service: CommentService,
      unshiftLoadedItems: true,
    }

    super(...args, externalArgs);
    this.state.total = this.props.totalItem || 0;
  }

  render() {
    if (this.state.total == 0) {
      return (<span></span>);
    }

    return (
      <div>
        {
          this.state.loadedItem < this.state.total ? (
            <div
              className={"loadmore-comment " + (this.state.isLoading ? 'disabled' : '')}
              onClick={this.loadmore}
            >
              {
                this.state.isLoading ? 'loading...' : 'Load older comments'
              }
            </div>
          ) : <span></span>
        }

        <ul className="comment-list">
        {
          this.items.map((comment)=>{
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
}