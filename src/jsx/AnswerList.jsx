import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";

export default class AnswerList extends React.Component{
  constructor(...args) {
    super(...args);
    this.state = {
      items:[],
      page: 1,
      isLoading: false,
      hasNext: true,
      showingPrevBtn: false,
      showingNextBtn: false,
      offsetX: 0
    }

    this.loadMore = this.loadMore.bind(this)
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
  }

  scrollLeft(e){
    e.preventDefault()

    this.setState({
      offsetX: this.state.offsetX + 50
    })
  }

  scrollRight(e){
    e.preventDefault()

    this.setState({
      offsetX: this.state.offsetX - 50
    })
  }

  loadMore() {
    this.fetchData()
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData(pageCount = 10) {
    this.setState({isLoading: true})

    const {items, page} = this.state
    const {question} = this.props
    const endPoint = `${baseAPIUrl}/questions/${question.id}/public_answers?per_page=${pageCount}&page=${page}`

    fetch(endPoint, {
      headers: {"Content-Type": "application/json;charset=UTF-8"},
    }).then((response) => {
        return response.json()
      }).then((json) => {
        const data = json.data

         this.setState({
            items: _.uniqBy(items.concat(data), 'id'),
            page: page + 1,
            isLoading: false,
            hasNext: data.length >= pageCount,
            showingPrevBtn: false,
            showingNextBtn: (data.length >= 4)
         })
      }).catch((e) => {
         console.log('error', e)
      })
  }

  render(){
    const {items, showingPrevBtn, showingNextBtn, offsetX} = this.state
    const prevBtnClass = showingPrevBtn ? "" : " hidden"
    const nextBtnClass = showingNextBtn ? "" : " hidden"
    const left = offsetX + "px"

    return(
      <div>
        <a href="#" className={"prev_btn" + prevBtnClass} onClick={this.scrollLeft}></a>
        <div className="list_container">
        <ul>
          {
            items.map((answer, index) => {
              return <AnswerCard key={answer.id} answer={answer}/>
            })
          }
        </ul>
      </div>
      <a href="#" className={"next_btn" + nextBtnClass} onClick={this.scrollRight}></a>
      </div>
    )
  }
}

export class AnswerCard extends React.Component{
  render(){
    const {answer} = this.props
    const bio = (answer.user.group_bio && answer.user.group_bio.length > 0) ? answer.user.group_bio : answer.user.short_blurb
    const backgroundImage = `url(${answer.image_url})`

    return(
      <li className="answer_card">
        <a href="single-answer.html">
        <div style={{backgroundImage:backgroundImage}} className="video_thumbnail"></div>
        <div className="play_btn"></div>
        <h4>{answer.user.name}</h4>
        <span>{bio}</span>
        </a>
      </li>
    )
  }
}
