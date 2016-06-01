import React from "react";
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

        {
          /* Load more */
          this.state.loadedItem < this.state.total && (
            <div className="text-center m-t-20">
              <div
                onClick={this.loadmore}
                className={'button button-large ' + (this.state.isLoading ? 'disabled' : '')}
              >
                {this.state.isLoading ? 'loading...' : 'load more'}
              </div>
            </div>
          )
        }
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
            <a href="single-question.html">{ question.content }</a>
          </div>

          <div className="clearfix">
            <ul className="tertiary-info">
              { question.vote_count && <li className="item">{ question.vote_count } votes</li> }
              { question.answer_count && <li className="item">{ question.answer_count } answers</li> }
            </ul>
            {
                question.users && 
                question.users.length && 
                  this.getQuestionUserComponents(question.users)
            }
          </div>
        </div>
      );
    });
  }

  getQuestionUserComponents(users) {
    return (
      <ul className="users">
      {
        users.map((user, userIndex)=>{
          return (<li key={`user-${userIndex}`} className="item" style={{backgroundImage: `url(${user.avatar_url})`}}>&nbsp;</li>)
        })
      }
      </ul>
    );
  }
}

class TrendingQuestion extends BasedQuestionContainer {
  constructor(...args) {
    let groupQuestionService = new GroupQuestionService("trending");
    let total = window.ridiqConf.groupQuestion.trending.total;
    super(...args, groupQuestionService, total);
  }
}

class MostRecentQuestion extends BasedQuestionContainer {
  constructor(...args) {
    let groupQuestionService = new GroupQuestionService("most-recent");
    let total = window.ridiqConf.groupQuestion.mostRecent.total;
    super(...args, groupQuestionService, total);
  }
}

class AllTimeQuestion extends BasedQuestionContainer {
  constructor(...args) {
    let groupQuestionService = new GroupQuestionService("all-time");
    let total = window.ridiqConf.groupQuestion.allTime.total;
    super(...args, groupQuestionService, total);
  }
}

class UnansweredQuestion extends BasedQuestionContainer {
  constructor(...args) {
    let groupQuestionService = new GroupQuestionService("unanswered");
    let total = window.ridiqConf.groupQuestion.unanswered.total;
    super(...args, groupQuestionService, total);
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