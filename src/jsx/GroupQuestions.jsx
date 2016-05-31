import React from "react";
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";

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

    this.props.onSelectItem && this.props.onSelectItem();
  }
}

class TrendingQuestion extends BasedLoadMoreComponent {
  constructor(...args) {
    super(...args, {foo: "bars"});
  }

  render() {
    return (
      <div className="questions">
        {this.getItem()}
        {this.getItem()}
        {this.getItem()}
      </div>
    )
  }

  getItem() {
    return (
      <div className="item">
        <div className="content">Any advice for 1st time entrepreneurs?</div>

        <div className="clearfix">
          <ul className="tertiary-info">
            <li className="item">12 votes</li>
            <li className="item">21 answers</li>
          </ul>
          <ul className="users">
            <li className="item" style={{backgroundImage: "url(images/avatar.jpg)"}}>&nbsp;</li>
            <li className="item" style={{backgroundImage: "url(images/group-avatar.jpeg)"}}>&nbsp;</li>
            <li className="item" style={{backgroundImage: "url(images/avatar.jpg)"}}>&nbsp;</li>
            <li className="item" style={{backgroundImage: "url(images/group-avatar.jpeg)"}}>&nbsp;</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default class GroupQuestion extends React.Component {
  render() {
    return (
      <div className="group-questions margin-auto">
        <Tabs />
        <TrendingQuestion />
      </div>
    )
  }
}