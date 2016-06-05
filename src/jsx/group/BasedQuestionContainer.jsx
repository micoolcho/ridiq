import React from "react";
import Utils from "./../Utils.jsx"
import BasedLoadMoreComponent from "./../BasedLoadMoreComponent.jsx";

export default class BasedQuestionContainer extends BasedLoadMoreComponent {
  constructor(...args) {
    super(...args);

    this.state = this.state || {};
    this.state.active = false;
    this.state.isExecutedFirstLoad = false;

    this.executeFirstLoad = this.executeFirstLoad.bind(this);
  }

  render() {
    if (!this.state.active) {
      return null;
    }

    return (
      <div>
        <div className="questions">
          { this.getComponentQuestions() }
        </div>

        { this.getLoadMoreBtn() }
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      active: this.props.active,
    }, this.executeFirstLoad);
  }

  executeFirstLoad() {
    if (!this.state.isExecutedFirstLoad && this.state.active){
      this.state.isExecutedFirstLoad = true;
      this.loadmore();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.active,
    }, this.executeFirstLoad);
  }

  getComponentQuestions() {
    return this.items.map((question, questionIndex)=>{
      return (
        <div key={`question-${questionIndex}`} className="item">
          <div className="content">
            <a href={question.public_url}>{ question.content }</a>
          </div>

          <div className="clearfix">
            <ul className="tertiary-info">
              <li className="item">
                { Utils.kFormat(question.vote_count) } { question.vote_count > 1 ? "votes" : "vote" }
              </li>
              <li className="item">
                { Utils.kFormat(question.answer_count) } { question.answer_count > 1 ? "answers" : "answer" }
              </li>
            </ul>
            {
                question.answered_users && 
                question.answered_users.length && 
                  this.getComponentAnsweredUsers(question.answered_users)
            }
          </div>
        </div>
      );
    });
  }

  getComponentAnsweredUsers(users) {
    return (
      <div className="users">
      {
        users.map((user, userIndex)=>{
          let userAvatar = user.avatar_url || "/assets/user_default_avatar.png";

          return (
            <a
              href={user.public_url}
              key={`user-${userIndex}`} 
              className="item" style={{backgroundImage: `url(${userAvatar})`}}
            >
              &nbsp;
            </a>
          );
        })
      }
      </div>
    );
  }
}
