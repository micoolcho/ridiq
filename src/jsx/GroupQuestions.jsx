import React from "react";
import Utils from "./Utils.jsx"
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import { GroupQuestionService } from "./services/GroupQuestionService.jsx";

class Tabs extends React.Component {
  constructor(...args) {
    super(...args);
    
    this.items = ["TRENDING", "MOST RECENT", "ALL TIME", "UNANSWERED"];
    this.state = {
      activeItemIndex: 0,
    };
  }

  render() {
    return (
      <ul className="tabs clearfix">
        { this.getItemComponents() }
      </ul>
    )
  }

  getItemComponents() {
    return this.items.map((item, index)=>{
      return (
        <li 
          onClick={ this.onSelectItem.bind(this, index) }
          key={`tab-${index}`} 
          className={
            [
              "item", 
              index == this.state.activeItemIndex && "active"
            ].join(" ")
          }
        >{item}</li>
      );
    })
  }

  onSelectItem(index) {
    this.setState({
      activeItemIndex: index,
    });

    this.props.onSelectItem && this.props.onSelectItem(index);
  }
}

class BasedQuestionContainer extends BasedLoadMoreComponent {
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
          { this.getItemComponents() }
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

  getItemComponents() {
    // TODO replace single-question.html by question.public_url

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
                  this.getQuestionUserComponents(question.answered_users)
            }
          </div>
        </div>
      );
    });
  }

  getQuestionUserComponents(users) {
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

class TrendingQuestion extends BasedQuestionContainer {
  constructor(...args) {
    const externalArgs = {
      service: new GroupQuestionService("public_trending"),
      total: window.ridiqConf.groupQuestion.trending.total,
    }

    super(...args, externalArgs);
  }
}

class MostRecentQuestion extends BasedQuestionContainer {
  constructor(...args) {
    const externalArgs = {
      service: new GroupQuestionService("public_questions"),
      total: window.ridiqConf.groupQuestion.mostRecent.total,
    }

    super(...args, externalArgs);
  }
}

class AllTimeQuestion extends BasedQuestionContainer {
  constructor(...args) {
    const externalArgs = {
      service: new GroupQuestionService("public_all_time"),
      total: window.ridiqConf.groupQuestion.allTime.total,
    }

    super(...args, externalArgs);
  }
}

class UnansweredQuestion extends BasedQuestionContainer {
  constructor(...args) {
    const externalArgs = {
      service: new GroupQuestionService("public_unanswered"),
      total: window.ridiqConf.groupQuestion.unanswered.total,
    }
    
    super(...args, externalArgs);
  }
}

export default class GroupQuestion extends React.Component {
  constructor(...args) {
    super(...args);

    this.state =  {
      currentActiveTabIndex: 0,
    };

    this.onSelectTabItem = this.onSelectTabItem.bind(this);
  }

  render() {
    return (
      <div className="group-questions margin-auto">
        <Tabs onSelectItem={ this.onSelectTabItem } />
        <TrendingQuestion active={ this.state.currentActiveTabIndex == 0 } />
        <MostRecentQuestion active={ this.state.currentActiveTabIndex == 1 } />
        <AllTimeQuestion active={ this.state.currentActiveTabIndex == 2 } />
        <UnansweredQuestion active={ this.state.currentActiveTabIndex == 3 } />
      </div>
    )
  }

  onSelectTabItem(index) {
    this.setState({
      currentActiveTabIndex: index,
    });
  }
}