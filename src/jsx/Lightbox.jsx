import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";
import Player from "./Player.jsx";

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render(){
    const {answer} = this.props

    if (!answer) {
      return <div></div>
    }

    const {id, video_url, image_url, question, like_count, comment_count} = answer

    return (
      <div className="lightbox">
        <div className="dimView"></div>

        <div className="mainView">
          <div className="player_container">
            <Player video_url={video_url} image_url={image_url} id={id}/>
          </div>

          <div className="meta">
            <LightboxQuestionBlock question={question} />
            <LightboxAnswerBlock answer={answer} />
          </div>

        </div>
      </div>
    )
  }

}

class LightboxQuestionBlock extends React.Component{
  render() {
    const {content} = this.props.question

    return (
      <div className="question-block">
        <div className="asked-in">
          Asked in <a href="group.html">Startups</a>
        </div>
        <div className="content">{content}
        </div>
      </div>
    )
  }
}

class LightboxAnswerBlock extends React.Component{
  render() {
    const {id, question, like_count, comment_count, created_at} = this.props.answer
    const user = {}

    const avatar_url = (user.avatar_url && user.avatar_url.length > 0) ? user.avatar_url : "../images/avatar_placeholder_small.png"
    const backgroundImage = `url(${avatar_url})`

    const bioString = `${question.author_name} - `

    const likeOrLikes = like_count > 1 ? "likes" : "like"
    const commentOrComments = comment_count > 1 ? "comments" : "comment"

    const commentLikeString = `${like_count} ${likeOrLikes}  ${comment_count} ${commentOrComments}`

    return (
      <div className="answer-block">
        <div className="user">
          <a href={question.author_public_url} style={{backgroundImage:backgroundImage}} className="avatar"></a>
          <div className="name">{bioString}</div>
          <div className="clearfix">
            <div className="view pull-left">{commentLikeString}</div>
            <div id="answerCreatedAt" data-answer-created-at={created_at} className="time pull-right"></div>
          </div>
        </div>
      </div>
    )
  }
}
