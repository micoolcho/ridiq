import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import AnswerList from "./AnswerList.jsx"

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

export default class GroupQuestionList extends React.Component {
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
    const {group} = this.props
    // const endPoint = `${baseAPIUrl}/api/v6/activities/featured?per_page=${pageCount}&page=${page}`
    const endPoint = `${baseAPIUrl}/public_groups/19/trending_questions`
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

  render(){
    const {questions, isLoading} = this.state
    const {loadMore} = this.loadMore

    return(
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
  )
  }
}

export class SingleGroupQuestion extends React.Component {
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

export class SingleGroupQuestionNoAnswer extends React.Component {
  render(){
    const { question } = this.props

    return(
      <div className="question clearfix">
      <QuestionContent question={question.content} answerCount="0"/>
      </div>
    )
  }
}

export class QuestionContent extends React.Component{
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
