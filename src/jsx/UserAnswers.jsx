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
              <ProfileAnswerCard key={answer.id} answer={answer}/>
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

class ProfileAnswerCard extends React.Component{
  render(){
    const {answer} = this.props
    const user = answer.user
    const question = answer.question.content
    const backgroundImage = `url(${answer.image_url})`

    return(
      <li className="answer_card">
        <a href={answer.public_url} target="_blank">
        <div style={{backgroundImage:backgroundImage}} className="video_thumbnail"></div>
        <h4></h4>
        <div className="play_btn"></div>
        <span>{question}</span>
        </a>
      </li>
    )
  }
}
