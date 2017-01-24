import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import AnswerList from "./AnswerList.jsx"

function LoadMore ({onClick, isLoading, hidden}) {
  const hiddenClass = hidden ? " hidden" : ""
  const text = isLoading ? 'loading...' : 'load more'
 return (
   <div className={"text-center m-t-20" + hiddenClass}>
  <div onClick={onClick} className={'button button-large ' + (isLoading ? 'disabled' : '')}>
    {text}
  </div>
</div>)
}

export default class GroupQuestionList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      questions:[],
      page: 1,
      isLoading: false,
      hasNext: true
    }

    this.loadMore = this.loadMore.bind(this)
  }

  fetchQuestions(pageCount = 10) {
    this.setState({isLoading: true})

    const {questions, page} = this.state
    const {group} = this.props
    const endPoint = `${baseAPIUrl}/public_groups/5/trending_questions?per_page=${pageCount}&page=${page}`

    fetch(endPoint, {
      headers: {"Content-Type": "application/json;charset=UTF-8"},
    }).then((response) => {
        return response.json()
      }).then((json) => {
         this.setState({
            questions: _.uniqBy(questions.concat(json.data), 'id'),
            page: page + 1,
            isLoading: false,
            hasNext: json.data.length >= pageCount
         })
      }).catch((e) => {
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
    const {questions, isLoading, hasNext} = this.state
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

      <LoadMore onClick={this.loadMore} isLoading={isLoading} hidden={!hasNext}/>
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
