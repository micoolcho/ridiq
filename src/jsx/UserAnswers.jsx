import React from 'react';
import jQuery from 'jquery';
import AnswerService from './services/AnswerServices.jsx';
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import Lightbox from "./Lightbox.jsx";

export default class UserAnsweredQuestions extends BasedLoadMoreComponent {

  constructor(...args) {
    const externalArgs = {
      service: AnswerService,
    }

    super(...args, externalArgs);

    this.state.isShowingLightbox = true
    this.state.successLoadCount = 0;
    this.state.total = this.props.totalItem;

    this.showLightbox = this.showLightbox.bind(this)
    this.hideLightbox = this.hideLightbox.bind(this)
  }

  showLightbox(e){
    e.stopPropagation()
    e.preventDefault()

    this.setState({
      isShowingLightbox: true
    })
  }

  hideLightbox(){
    this.setState({
      isShowingLightbox: false
    })
  }

  render() {
    const {total} = this.props
    const {isShowingLightbox} = this.state

    if (total == 0) {
      return (<span></span>);
    }

    return (
      <div>
        {
          this.items.map((answer, index) => {
            return (
              <ProfileAnswerCard key={answer.id} answer={answer} onClick={this.showLightbox}/>
            )
          })
        }

        <div className="clearfix"></div>

        { this.getLoadMoreBtn() }

        {isShowingLightbox &&
          <Lightbox answer={this.items[0]} onCloseRequest={this.hideLightbox}/>
        }
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
      <li className="answer_card shrinkable">
        <a href="#">
        <div style={{backgroundImage:backgroundImage}} className="video_thumbnail"></div>
        <h4></h4>
        <div className="play_btn"></div>
        <span>{question}</span>
        </a>
      </li>
    )
  }
}
