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
      questions:[],
      page: 1,
      isLoading: false
    }

    this.loadMore = this.loadMore.bind(this)
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
  }
  loadMore() {
    this.fetchQuestions()
  }
  render() {
     const {questions, isLoading} = this.state
     const {loadMore} = this.loadMore
    return (
      <div>
      <SingleGroupInfo name="Game of Thrones"/>
      <SingleGroupTopUsers />
      <SingleGroupNavBar />

        <div id="questions_list">
          <SingleGroupQuestion />
          <SingleGroupQuestionNoAnswer />
          <SingleGroupQuestionNoAnswer />
          <SingleGroupQuestionNoAnswer />
          <SingleGroupQuestion />
          <SingleGroupQuestionNoAnswer />

          <LoadMore onClick={this.loadMore} isLoading={isLoading}/>
        </div>
    </div>
    )
  }
}

class SingleGroupInfo extends React.Component {
  render(){
    return(
      <div>
        <h1 className="group_name text-center">{this.props.name}</h1>
        <hr className="group_name_separator"/>

        <ul id="group_info">
          <CountBox count="324" label="members" />
          <CountBox count="1782" label="questions" />
          <CountBox count="631" label="responses" />
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
  render(){
    return(
      <div id="group_top_users">
        <h3>TOP USERS</h3>
        <a href="#" className="prev_btn"></a>
        <div className="list_container">
        <ul>
          {
            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map((index, item) => {
              return <TopUser key={index}/>
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
    return(
      <li>
        <a href="/">
        <div style={{backgroundImage:"url(images/item2.png)"}} className="avatar">&nbsp;</div>
        Louis
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
    return(
      <div className="question clearfix">
      <QuestionContent question="Do you think Tyrion is Targaryen (the third head of the dragon)?" answerCount="13"/>
      <AnswerList />
      </div>
    )
  }
}

class SingleGroupQuestionNoAnswer extends React.Component {
  render(){
    return(
      <div className="question clearfix">
      <QuestionContent question="Don't answer this question" answerCount="0"/>
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
  render(){
    return(
      <div>
        <a href="#" className="prev_btn"></a>
        <div className="list_container">
        <ul>
          {
            [1,2,3,4,5,6,7,8,9,10,11,12].map((index, item) => {
              return <AnswerCard key={index}/>
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
    return(
      <li className="answer_card">
        <a href="single-answer.html">
        <div style={{backgroundImage:"url(images/item1.png"}} className="video_thumbnail"></div>
        <div className="play_btn"></div>
        <h4>Michael Cho</h4>
        <span>Dad. Entrepreneur. Go player.</span>
        </a>
      </li>
    )
  }
}
