import React from "react";

export default class GroupQuestionTabs extends React.Component {
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