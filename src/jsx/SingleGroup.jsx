import React from "react";
import Moment from "moment";
import Utils from "./Utils.jsx";
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";

let baseAPIUrl
if (process.env.NODE_ENV === 'production') {
  baseAPIUrl = 'http://api.letsyam.com'
} else if (process.env.NODE_ENV === 'staging') {
   baseAPIUrl = 'http://yam-staging.herokuapp.com'
} else {
  baseAPIUrl = 'http://localhost:8002'
}

function LoadMore ({onClick, isLoading}) {
 return (<div className="text-center m-t-20">
  <div
    onClick={onClick}
    className={'button button-large ' + (isLoading ? 'disabled' : '')}>
    {
      isLoading ? 'loading...' : 'load more'
    }
  </div>
</div>)
}

export default class SingleGroup extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      group:{},
      questions:[],
      trendingUsers:[],
      page: 1,
      isLoading: false,
      isLoadingGroupInfo: false,
      isLoadingTrendingUsers: false
    }

    this.loadMore = this.loadMore.bind(this)
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

  fetchQuestions(pageCount = 10) {
    this.setState({isLoading: true})
    const {questions, page} = this.state
    // const endPoint = `${baseAPIUrl}/api/v6/activities/featured?per_page=${pageCount}&page=${page}`
    const endPoint = `${baseAPIUrl}/jsons/group_questions.json`
    console.log(endPoint)
    fetch(endPoint, {
      headers: {"Content-Type": "application/json;charset=UTF-8"},
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
         this.setState({
            questions: _.uniqBy(questions.concat(json.data), 'id'),
            page: page + 1,
            isLoading: false
         })
      })
      .catch((e) => {
         console.log('error', e)
      })
  }

  componentDidMount() {
    this.fetchQuestions()
    this.fetchGroupInfo()
  }

  loadMore() {
    this.fetchQuestions()
  }

  render() {
     const {group, questions, isLoading, isLoadingGroupInfo} = this.state
     const {loadMore} = this.loadMore
    return (
      <div>
      <SingleGroupInfo group={group}/>
      <SingleGroupTopUsers />
      <SingleGroupNavBar />

        <div id="questions_list">
          {
            questions.map((question, index) => {
              if(question.answer_count > 0){
                return <SingleGroupQuestion key={question.id} question={question}/>
              } else {
                return <SingleGroupQuestionNoAnswer key={question.id} question={question}/>
              }
            })
          }

          <LoadMore onClick={this.loadMore} isLoading={isLoading}/>
        </div>
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

export class SingleGroupTopUsers extends React.Component{
  constructor(...args) {
    super(...args);
    this.state = {
      trendingUsers:[],
      page: 1,
      isLoading: false
    }

    this.loadMore = this.loadMore.bind(this)
  }

  loadMore() {
    this.fetchTrendingUsers()
  }

  componentDidMount(){
    this.fetchTrendingUsers()
  }

  fetchTrendingUsers(pageCount = 10) {
    this.setState({isLoading: true})
    const {trendingUsers, page} = this.state
    // const endPoint = `${baseAPIUrl}/api/v6/activities/featured?per_page=${pageCount}&page=${page}`
    const endPoint = `${baseAPIUrl}/jsons/group_trending_users.json`
    console.log(endPoint)
    fetch(endPoint, {
      headers: {"Content-Type": "application/json;charset=UTF-8"},
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
         this.setState({
            trendingUsers: _.uniqBy(trendingUsers.concat(json.data), 'id'),
            page: page + 1,
            isLoading: false
         })
      })
      .catch((e) => {
         console.log('error', e)
      })
  }

  render(){
    const { trendingUsers } = this.state
    return(
      <div id="group_top_users">
        <h3>TOP USERS</h3>
        <a href="#" className="prev_btn"></a>
        <div className="list_container">
        <ul>
          {
            trendingUsers.map((user, index) => {
              return <TopUser key={user.id} user={user}/>
            })
          }
        </ul>
        </div>
        <a href="#" className="next_btn"></a>
      </div>
    )
  }
}

export class TopUser extends React.Component{
  render(){
    const { user } = this.props

    return(
      <li>
        <a href="/">
        <div style={{backgroundImage:"url(" + user.avatar_url + ")"}} className="avatar">&nbsp;</div>
        {user.first_name}
        </a>
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

class SingleGroupQuestion extends React.Component {
  render(){
    const { question } = this.props

    return(
      <div className="question clearfix">
      <QuestionContent question={question.content} answerCount={question.answer_count}/>
      <AnswerList question={question}/>
      </div>
    )
  }
}

class SingleGroupQuestionNoAnswer extends React.Component {
  render(){
    const { question } = this.props

    return(
      <div className="question clearfix">
      <QuestionContent question={question.content} answerCount="0"/>
      </div>
    )
  }
}

class QuestionContent extends React.Component{
  responseCount(count){
    if (count > 1) {
      return count + " responses"
    } else {
      return count + " response"
    }
  }

  render(){
    return(
      <div>
      <h3>{this.props.question}</h3>
      <span>{this.responseCount(this.props.answerCount)}</span>
      </div>
    )
  }
}

class AnswerList extends React.Component{
  constructor(...args) {
    super(...args);
    this.state = {
      answers:[],
      page: 1,
      isLoading: false
    }

    this.loadMore = this.loadMore.bind(this)
  }

  loadMore() {
    this.fetchAnswers()
  }

  componentDidMount(){
    this.fetchAnswers()
  }

  fetchAnswers(pageCount = 10) {
    this.setState({isLoading: true})
    const {answers, page} = this.state
    const {question} = this.props
    // const endPoint = `${baseAPIUrl}/api/v6/activities/featured?per_page=${pageCount}&page=${page}`
    const endPoint = `${baseAPIUrl}/jsons/question_${question.id}_answers.json`
    console.log(endPoint)
    fetch(endPoint, {
      headers: {"Content-Type": "application/json;charset=UTF-8"},
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
         this.setState({
            answers: _.uniqBy(answers.concat(json.data), 'id'),
            page: page + 1,
            isLoading: false
         })
      })
      .catch((e) => {
         console.log('error', e)
      })
  }

  render(){
    const {answers} = this.state

    return(
      <div>
        <a href="#" className="prev_btn"></a>
        <div className="list_container">
        <ul>
          {
            answers.map((answer, index) => {
              return <AnswerCard key={answer.id} answer={answer}/>
            })
          }
        </ul>
      </div>
      <a href="#" className="next_btn"></a>
      </div>
    )
  }
}

class AnswerCard extends React.Component{
  render(){
    const {answer} = this.props

    return(
      <li className="answer_card">
        <a href="single-answer.html">
        <div style={{backgroundImage:"url(" + answer.image_url + ")"}} className="video_thumbnail"></div>
        <div className="play_btn"></div>
        <h4>{answer.user_name}</h4>
        <span>Dad. Entrepreneur. Go player.</span>
        </a>
      </li>
    )
  }
}
