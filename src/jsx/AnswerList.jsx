import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";

export default class AnswerList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items:[],
      page: 1,
      isLoading: false,
      hasNext: true,
      isShowingPrevBtn: false,
      isShowingNextBtn: false,
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

    const endPoint = `questions/${question.id}/public_answers`
    const url = `${baseAPIUrl}/${endPoint}?per_page=${pageCount}&page=${page}`
    const headers = {"Content-Type": "application/json;charset=UTF-8"}

    fetch(url, {headers}).then((response) => {
        return response.json()
      }).then((json) => {
        const data = json.data

         this.setState({
            items: _.uniqBy(items.concat(data), 'id'),
            page: page + 1,
            isLoading: false,
            hasNext: data.length >= pageCount,
            isShowingPrevBtn: false,
            isShowingNextBtn: (data.length >= 4)
         })
      }).catch((e) => {
         console.log('error', e)
      })
  }

  render(){
    const {items, isShowingPrevBtn, isShowingNextBtn, offsetX} = this.state
    const prevBtnClass = isShowingPrevBtn ? "" : " hidden"
    const nextBtnClass = isShowingNextBtn ? "" : " hidden"
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

class AnswerCard extends React.Component{
  render(){
    const {answer} = this.props
    const user = answer.user
    const bio = (user.group_bio && user.group_bio.length > 0) ? user.group_bio : user.short_blurb
    const backgroundImage = `url(${answer.image_url})`

    return(
      <li className="answer_card">
        <a href="#" target="_blank">
        <div style={{backgroundImage:backgroundImage}} className="video_thumbnail"></div>
        <div className="play_btn"></div>
        <h4>{user.name}</h4>
        <span>{bio}</span>
        </a>
      </li>
    )
  }
}
