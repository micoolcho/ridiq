import React from 'react';
import jQuery from 'jquery';
import AnswerService from './services/AnserServices.jsx';

export default class UserAnsweredQuestions extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      isLoading: false,
      loadedItem: 0,
      currentPage: 0,
      item: [],
      firstLoadDone: false,
      isInitialized: false,
    };

    this.loadmore = this.loadmore.bind(this);
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
                <img className="cover" src={item.answer.image_url} alt="" />
                <a href={item.answer.public_url} className="question">
                  <span className="content">
                    {item.content}
                  </span>
                </a>
                <div className="info">
                  <span><img src="/images/like_icon.png" alt="" /> {item.answer.like_count}</span>
                  <span><img src="/images/comment_icon.png" alt="" /> {item.answer.comment_count}</span>
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
                onClick={this.loadmore}
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
    const $window = jQuery(window);
    this.loadmore();

    $window.scroll((e)=>{
      if (!this.state.firstLoadDone || this.state.isLoading) {
        return;
      }

      const wHeight = $window.height();
      const wScrollTop = $window.scrollTop();
      if (wScrollTop + window.innerHeight + 20 >= wHeight) {
        this.loadmore();
      }
    });
  }

  loadmore() {
    if (this.state.isLoading) {
      return;
    }

    if (this.state.loadedItem >= this.props.totalItem) {
      jQuery(window).unbind('scroll');
      return;
    }

    this.setState({
      isLoading: true,
    });

    AnswerService.loadMore(this.state.currentPage + 1);
  }

  onReceiveLoadmoreResult(result) {
    result.data.map((newItem)=>{
      this.state.item.push(newItem);
    });

    if (this.state.isInitialized) {
      this.state.firstLoadDone = true;
    } else {
      this.state.isInitialized = true;
    }

    this.state.currentPage++;
    this.state.loadedItem += result.data.length;
    this.state.isLoading = false;

    this.forceUpdate();
  }
}