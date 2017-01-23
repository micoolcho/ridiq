import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";
import SingleGroupTopUsers from "./SingleGroupTopUsers.jsx"
import GroupQuestionList from "./GroupQuestionList.jsx"

export default class SingleGroup extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      group:{},
      isLoadingGroupInfo: false,
    }
  }

  fetchGroupInfo(){
    this.setState({isLoadingGroupInfo: true})

    const endPoint = `${baseAPIUrl}/jsons/group.json`
    console.log(endPoint)
    fetch(endPoint, {
      headers: {"Content-Type": "application/json;charset=UTF-8"},
    }).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        group: json,
        isLoadingGroupInfo: false
      })
    }).catch((e) => {
      console.log('error', e)
    })
  }

  componentDidMount() {
    this.fetchGroupInfo()
  }

  render() {
     const {group, isLoadingGroupInfo} = this.state

    return (
      <div>
      <SingleGroupInfo group={group}/>
      <SingleGroupTopUsers />
      <SingleGroupNavBar />

        <GroupQuestionList />
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
    return(
      <div id="group_nav">
        <ul>
          <li><a href="#" className="selected">TRENDING</a></li>
          <li><a href="#">RECENT</a></li>
          <li><a href="#">TOP</a></li>
          <li><a href="#">UNANSWERED</a></li>
        </ul>
      </div>
    )
  }
}
