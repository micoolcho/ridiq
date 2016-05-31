import React from "react";
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import GroupQuestionService from "./services/GroupQuestionService.jsx";

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

class TrendingQuestion extends BasedLoadMoreComponent {
  constructor(...args) {
    super(...args, GroupQuestionService);
  }

  render() {
    return (
      <div>
        <div className="questions">
          { this.getItemComponents() }
        </div>

        {/* Load more */}
        <div className="text-center m-t-20">
          <div
            onClick={this.loadmore}
            className={'button button-large ' + (this.state.isLoading ? 'disabled' : '')}
          >
            {this.state.isLoading ? 'loading...' : 'load more'}
          </div>
        </div>
      </div>
    )
  }

  getItemComponents() {
    return this.items.map((question, questionIndex)=>{
      return (
        <div key={`question-${questionIndex}`} className="item">
          <div className="content">Any advice for 1st time entrepreneurs?</div>

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

export default class GroupQuestion extends React.Component {
  constructor(...args) {
    super(...args);

    this.onSelectTabItem = this.onSelectTabItem.bind(this);
  }

  render() {
    return (
      <div className="group-questions margin-auto">
        <Tabs onSelectItem={ this.onSelectTabItem } />
        <TrendingQuestion />
      </div>
    )
  }

  onSelectTabItem(index) {
    console.log(index);
  }
}