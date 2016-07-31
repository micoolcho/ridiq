import React from 'react';
import jQuery from 'jquery';
import AnswerService from './services/AnserServices.jsx';
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";

export default class UserAnsweredQuestions extends BasedLoadMoreComponent {

  constructor(...args) {
    const externalArgs = {
      service: AnswerService,
    }
    
    super(...args, externalArgs);

    this.state.successLoadCount = 0;
    this.state.total = this.props.totalItem;
  }

  render() {
    if (this.props.total == 0) {
      return (<span></span>);
    }

    return (
      <div>
        {
          this.items.map((item)=>{
            return (
              <div className="answer" key={`answer-${Math.random()}`}>
                <img className="cover" src={item.image_url} alt="" />
                <a href={item.public_url} className="question">
                  <span className="content">
                    {item.question.content}
                  </span>
                </a>
                <div className="info">
                  <span><img src="/images/view_icon.png" alt="" /> {item.view_count}</span>
                </div>
              </div>
            )
          })
        }

        <div className="clearfix"></div>

        { this.getLoadMoreBtn() }
      </div>
    )
  }

  componentDidMount() {
    const $window = jQuery(window);
    this.loadmore();

    $window.scroll((e)=>{
      if (this.state.successLoadCount <= 1 || this.state.isLoading) {
        return;
      }

      const wHeight = $window.height();
      const wScrollTop = $window.scrollTop();
      if (wScrollTop + window.innerHeight + 20 >= wHeight) {
        this.loadmore();
      }
    });
  }

  onReceiveLoadmoreResult(result) {
    if ( super.onReceiveLoadmoreResult(result) ) {
      this.state.successLoadCount = this.state.successLoadCount + 1;
    }
  }
}
