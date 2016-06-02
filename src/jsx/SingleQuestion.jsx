import React from "react";
import Moment from "moment";
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import { AnswerService } from "./services/SingleQuestionService.jsx";

Moment.updateLocale('en', {
  relativeTime: {
    future : 'in %s',
    past : '%s',
    s : 'now',
    m : '1m',
    mm : '%dm',
    h : '1h',
    hh : '%dh',
    d : '1d',
    dd : '%dd',
    M : '4w',
    MM : (number)=>{
      return `${number * 4}w`;
    },
    y : 'a year',
    yy : '%d years'
  }
});

class Player extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (<div id={this.props.id}>&nbsp;</div>);
  }

  componentDidMount() {
    jwplayer(this.props.id).setup(this.props.playerConfig);
  }
}

export default class Answers extends BasedLoadMoreComponent {
  constructor(...args) {
    let service = new AnswerService();
    let total = window.ridiqConf.singleQuestion.answerCount;
    super(...args, service, total);
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
                    <div className="name">{answer.user.name} - {answer.user_short_bio}</div>
                    <div className="clearfix">
                      <div className="view pull-left">{answer.view_count} views</div>
                      <div className="time pull-right">{Moment(answer.created_at).fromNow()}</div>
                    </div>
                  </div>

                  <Player id={`player-${answer.id}`} playerConfig={videoConfig} />

                  <div className="info clearfix">
                    <ul>
                      <li className="left">
                        {answer.like_count} {answer.like_count > 1 ? "likes" : "like"}
                      </li>
                      <li className="left">
                        {answer.comment_count} {answer.comment_count > 1 ? "comments" : "comment"}
                      </li>
                    </ul>
                  </div>
                </div>
              )
            })
          }
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