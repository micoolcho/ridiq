import React from "react";
import Moment from "moment";
import Utils from "./Utils.jsx";
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import { AnswerService } from "./services/SingleQuestionService.jsx";

class Player extends React.Component {
  constructor(...args) {
    super(...args);
    this.playerId = this.props.id + (Math.random());
  }

  render() {
    return (<div id={this.playerId}>&nbsp;</div>);
  }

  componentDidMount() {
    jwplayer(this.playerId).setup(this.props.playerConfig);
  }
}

export default class Answers extends BasedLoadMoreComponent {
  constructor(...args) {
    const externalArgs = {
      service: new AnswerService(),
      total: window.yamConf.singleQuestion.answerCount,
    }
    super(...args, externalArgs);
  }

  render() {
    if (this.items && this.items.length) {
      return (
        <div>
          {
            this.items.map((answer, index)=>{
              let videoConfig = {
                image: answer.image_url,
                file: answer.video_url,
                sharing: {
                  code: "",
                  link: answer.public_url,
                }
              }

              return (
                <div key={`answer-${index}`} className="answer-block">
                  <div className="user">
                    <a href={answer.user.public_url} className="avatar" style={{backgroundImage: `url(${answer.user.avatar_url})`}}>&nbsp;</a>
                    <div className="name">{answer.user.name}{answer.user_short_bio && ` - ${answer.user_short_bio}`}</div>
                    <div className="clearfix">
                      <div className="view pull-left">
                        { Utils.kFormat(answer.view_count) } { answer.view_count > 1 ? "views" : "view" }
                      </div>
                      <div className="time pull-right">{Moment(parseInt(answer.created_at) * 1000).fromNow()}</div>
                    </div>
                  </div>

                  <Player id={`player-${answer.id}`} playerConfig={videoConfig} />

                  <div className="info clearfix">
                    <ul>
                      <li className="left">
                        { Utils.kFormat(answer.like_count) } {answer.like_count > 1 ? "likes" : "like"}
                      </li>
                      <li className="left">
                        { Utils.kFormat(answer.comment_count) } {answer.comment_count > 1 ? "comments" : "comment"}
                      </li>
                    </ul>
                  </div>
                </div>
              )
            })
          }

          { this.getLoadMoreBtn() }
        </div>
      )
    } else {
      return <span></span>
    }
  }

  componentDidMount() {
    this.loadmore();
  }
}