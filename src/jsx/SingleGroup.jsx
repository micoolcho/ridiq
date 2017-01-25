import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";
import SingleGroupTopUsers from "./SingleGroupTopUsers.jsx"
import GroupQuestionList from "./GroupQuestionList.jsx"

export default class SingleGroup extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      // group:{},
      isLoading: false,
      showingTrending: true,
      showingRecent: false,
      showingTop: false,
      showingUnanswered: false
    }

    this.showTrending = this.showTrending.bind(this)
    this.showRecent = this.showRecent.bind(this)
    this.showTop = this.showTop.bind(this)
    this.showUnanswered = this.showUnanswered.bind(this)
  }

  componentDidMount() {
    // this.fetchGroupInfo()
  }

  fetchGroupInfo(){
    // this.setState({isLoading: true})
    //
    // const endPoint = `jsons/group.json`
    //
    // fetch(endPoint, {
    //   headers: {"Content-Type": "application/json;charset=UTF-8"},
    // }).then((response) => {
    //   return response.json()
    // }).then((json) => {
    //   this.setState({
    //     group: json,
    //     isLoading: false
    //   })
    // }).catch((e) => {
    //   console.log('error', e)
    // })
  }

  showTrending(e){
    e.preventDefault()

    this.setState({
      showingTrending: true,
      showingRecent: false,
      showingTop: false,
      showingUnanswered: false
    })
  }

  showRecent(e){
    e.preventDefault()

    this.setState({
      showingTrending: false,
      showingRecent: true,
      showingTop: false,
      showingUnanswered: false
    })
  }

  showTop(e){
    e.preventDefault()

    this.setState({
      showingTrending: false,
      showingRecent: false,
      showingTop: true,
      showingUnanswered: false
    })
  }

  showUnanswered(e){
    e.preventDefault()

    this.setState({
      showingTrending: false,
      showingRecent: false,
      showingTop: false,
      showingUnanswered: true
    })
  }

  render() {
     const {isLoading, showingTrending, showingRecent, showingTop, showingUnanswered} = this.state
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
        showingTrending={showingTrending}
        showingRecent={showingRecent}
        showingTop={showingTop}
        showingUnanswered={showingUnanswered}
        />
      <GroupQuestionList
        group={group}
        showingTrending={showingTrending}
        showingRecent={showingRecent}
        showingTop={showingTop}
        showingUnanswered={showingUnanswered}
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
    return(
      <li className="count_box">
        <span className="count">{this.props.count}</span>
        <span>{this.props.label}</span>
      </li>
    )
  }
}

class SingleGroupNavBar extends React.Component{
  render(){
    const {showingTrending, showingRecent, showingTop, showingUnanswered, showTrending, showRecent, showTop, showUnanswered} = this.props
    return(
      <div id="group_nav">
        <ul>
          <SingleGroupNavBarLink selected={showingTrending} onClick={showTrending} title="Trending"/>
          <SingleGroupNavBarLink selected={showingRecent} onClick={showRecent} title="Recent"/>
          <SingleGroupNavBarLink selected={showingTop} onClick={showTop} title="Top"/>
          <SingleGroupNavBarLink selected={showingUnanswered} onClick={showUnanswered} title="Unanswered"/>
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
