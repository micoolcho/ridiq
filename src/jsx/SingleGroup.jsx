import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";
import SingleGroupTopUsers from "./SingleGroupTopUsers.jsx"
import GroupQuestionList from "./GroupQuestionList.jsx"

export default class SingleGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isShowingTrending: true,
      isShowingRecent: false,
      isShowingTop: false,
      isShowingUnanswered: false
    }

    this.showTrending = this.showTrending.bind(this)
    this.showRecent = this.showRecent.bind(this)
    this.showTop = this.showTop.bind(this)
    this.showUnanswered = this.showUnanswered.bind(this)
  }

  showTrending(e){
    e.preventDefault()

    this.switchTab({isShowingTrending:true})
  }

  showRecent(e){
    e.preventDefault()

    this.switchTab({isShowingRecent:true})
  }

  showTop(e){
    e.preventDefault()

    this.switchTab({isShowingTop:true})
  }

  showUnanswered(e){
    e.preventDefault()

    this.switchTab({isShowingUnanswered:true})
  }

  switchTab({isShowingTrending = false, isShowingRecent = false, isShowingTop = false, isShowingUnanswered = false}){
    this.setState({
      isShowingTrending,
      isShowingRecent,
      isShowingTop,
      isShowingUnanswered
    })
  }

  render() {
     const {isLoading, isShowingTrending, isShowingRecent, isShowingTop, isShowingUnanswered} = this.state
     const {group} = this.props

    return (
      <div>
      <SingleGroupInfo group={group}/>
      <SingleGroupTopUsers group={group}/>
      <SingleGroupNavBar
        showTrending={this.showTrending}
        showRecent={this.showRecent}
        showTop={this.showTop}
        showUnanswered={this.showUnanswered}
        isShowingTrending={isShowingTrending}
        isShowingRecent={isShowingRecent}
        isShowingTop={isShowingTop}
        isShowingUnanswered={isShowingUnanswered}
        />
      <GroupQuestionList
        group={group}
        isShowingTrending={isShowingTrending}
        isShowingRecent={isShowingRecent}
        isShowingTop={isShowingTop}
        isShowingUnanswered={isShowingUnanswered}
        />
    </div>
    )
  }
}

class SingleGroupInfo extends React.Component {
  render(){
    const {name, follower_count, question_count, answer_count} = this.props.group

    return(
      <div>
        <h1 className="group_name text-center">{name}</h1>
        <hr className="group_name_separator"/>

        <ul id="group_info">
          <CountBox count={follower_count} label="members" />
          <CountBox count={question_count} label="questions" />
          <CountBox count={answer_count} label="responses" />
        </ul>
      </div>
    )
  }
}

class CountBox extends React.Component{
  render(){
    const {count, label} = this.props

    return(
      <li className="count_box">
        <span className="count">{count}</span>
        <span>{label}</span>
      </li>
    )
  }
}

class SingleGroupNavBar extends React.Component{
  render(){
    const {isShowingTrending, isShowingRecent, isShowingTop, isShowingUnanswered, showTrending, showRecent, showTop, showUnanswered} = this.props

    return(
      <div id="group_nav">
        <ul>
          <SingleGroupNavBarLink selected={isShowingTrending} onClick={showTrending} title="Trending"/>
          <SingleGroupNavBarLink selected={isShowingRecent} onClick={showRecent} title="Recent"/>
          <SingleGroupNavBarLink selected={isShowingTop} onClick={showTop} title="Top"/>
          <SingleGroupNavBarLink selected={isShowingUnanswered} onClick={showUnanswered} title="Unanswered"/>
        </ul>
      </div>
    )
  }
}

class SingleGroupNavBarLink extends React.Component{
  render(){
    const {selected, title, onClick} = this.props
    const cssClass = selected ? "selected" : ""

    return(
      <li><a href="#" className={cssClass} onClick={onClick}>{title}</a></li>
    )
  }
}
