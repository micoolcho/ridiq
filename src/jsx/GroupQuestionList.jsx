import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";
import AnswerList from "./AnswerList.jsx"

function LoadMore ({onClick, isLoading, hidden}) {
  const hiddenClass = hidden ? " hidden" : ""
  const disabledClass = isLoading ? 'disabled' : '';
  const text = isLoading ? 'loading...' : 'load more'

 return (
  <div className={"text-center m-t-20" + hiddenClass}>
  <div onClick={onClick} className={'button button-large ' + disabledClass}>{text}</div>
  </div>
  )
}

export default class GroupQuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items:[],
      page: 1,
      isLoading: false,
      hasNext: true,
      type: "trending_questions"
    }

    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillReceiveProps(nextProps){
    const {showingTrending, showingRecent, showingTop, showingUnanswered} = this.props

    if(nextProps.showingTrending){
      if(!showingTrending){
        this.reload("trending_questions")
      }
    } else if(nextProps.showingRecent){
      if(!showingRecent){
        this.reload("questions")
      }
    } else if(nextProps.showingTop){
      if(!showingTop){
        this.reload("all_time")
      }
    } else if(nextProps.showingUnanswered){
      if(!showingUnanswered){
        this.reload("unanswered")
      }
    }
  }

  reload(type = "trending_questions"){
    this.setState({
      items:[],
      page: 1,
      isLoading: false,
      hasNext: true,
      type: type
    })
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.type !== prevState.type) {
      this.fetchData()
    }
  }

  fetchData(pageCount = 10) {
    this.setState({isLoading: true})

    const {items, page, type} = this.state
    const {group} = this.props
    const endPoint = `public_groups/${group.id}/${type}`
    const url = `${baseAPIUrl}/${endPoint}?per_page=${pageCount}&page=${page}`

    fetch(url, {
      headers: {"Content-Type": "application/json;charset=UTF-8"},
    }).then((response) => {
        return response.json()
      }).then((json) => {
        const data = json.data

         this.setState({
            items: _.uniqBy(items.concat(data), 'id'),
            page: page + 1,
            isLoading: false,
            hasNext: data.length >= pageCount
         })
      }).catch((e) => {
         console.log('error', e)
      })
  }

  loadMore() {
    this.fetchData()
  }

  render(){
    const {items, isLoading, hasNext} = this.state
    const {loadMore} = this.loadMore

    return(
    <div id="questions_list">
      {
        items.map((question, index) => {
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
    const {question, answerCount} = this.props
    const countString = this.responseCount(answerCount)

    return(
      <div>
      <h3>{question}</h3>
      <span>{countString}</span>
      </div>
    )
  }
}
