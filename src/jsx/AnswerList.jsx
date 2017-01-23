import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";

export default class AnswerList extends React.Component{
  constructor(...args) {
    super(...args);
    this.state = {
      answers:[],
      page: 1,
      isLoading: false,
      showingPrevBtn: false,
      showingNextBtn: false
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
            isLoading: false,
            showingPrevBtn: false,
            showingNextBtn: (answers.length >= 4)
         })
      })
      .catch((e) => {
         console.log('error', e)
      })
  }

  render(){
    const {answers, showingPrevBtn, showingNextBtn} = this.state
    const prevBtnClass = showingPrevBtn ? "" : " hidden"
    const nextBtnClass = showingNextBtn ? "" : " hidden"

    return(
      <div>
        <a href="#" className={"prev_btn" + prevBtnClass}></a>
        <div className="list_container">
        <ul>
          {
            answers.map((answer, index) => {
              return <AnswerCard key={answer.id} answer={answer}/>
            })
          }
        </ul>
      </div>
      <a href="#" className={"next_btn" + nextBtnClass}></a>
      </div>
    )
  }
}

export class AnswerCard extends React.Component{
  render(){
    const {answer} = this.props
    const bio = (answer.user_group_bio && answer.user_group_bio.length > 0) ? answer.user_group_bio : answer.user_short_blurb

    return(
      <li className="answer_card">
        <a href="single-answer.html">
        <div style={{backgroundImage:"url(" + answer.image_url + ")"}} className="video_thumbnail"></div>
        <div className="play_btn"></div>
        <h4>{answer.user_name}</h4>
        <span>{bio}</span>
        </a>
      </li>
    )
  }
}
