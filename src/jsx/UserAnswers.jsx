import React from 'react';
import jQuery from 'jquery';
import AnswerService from './services/AnswerServices.jsx';
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
    const {total} = this.props

    if (total == 0) {
      return (<span></span>);
    }

    return (
      <div>
        {
          this.items.map((answer, index) => {
            return (
              <div className="answer" key={answer.id}>
                <span className="content">
                  {answer.question.content}
                </span>
                <img className="cover" src={answer.image_url} alt="" />
                <a href={answer.public_url} className="question">
                </a>
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
