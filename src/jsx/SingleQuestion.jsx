import React from "react";
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import { AnswerService } from "./services/SingleQuestionService.jsx";

class Player extends React.Component {
  constructor(...args) {
    super(...args);

    this.playerId = `player-${Date.now()}`;
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
              return (
                <div key={`answer-${index}`} className="answer-block">
                  <div className="user">
                    <a href="#" className="avatar" style={{backgroundImage: `url(${answer.user_avatar})`}}>&nbsp;</a>
                    <div className="name">{answer.username}</div>
                    <div className="clearfix">
                      <div className="view pull-left">1.7k views</div>
                      <div className="time pull-right">{answer.created_at} ago</div>
                    </div>
                  </div>

                  <Player playerConfig={answer.video} />

                  <div className="info clearfix">
                    <ul>
                      <li className="left">
                        1,451 views
                      </li>
                      <li className="left">
                        12 likes
                      </li>
                      <li className="left">
                        50 comments
                      </li>
                      <li className="right">
                        <span id="answerCreatedAt">1462356600</span>
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
      return <span>empty</span>
    }
  }

  componentDidMount() {
    this.loadmore();
  }
}