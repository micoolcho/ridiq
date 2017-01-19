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
  baseAPIUrl = 'http://localhost:3000'
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
    fetch(`${baseAPIUrl}/api/v6/activities/featured?per_page=${pageCount}&page=${page}`, {
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
      <SingleGroupInfo />
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
        <h1 className="group_name text-center">Game of Thrones</h1>
        <hr className="group_name_separator"/>

        <ul id="group_info">
          <li className="count_box">
            <span className="count">324</span>
            <span>members</span>
          </li>
          <li className="count_box">
            <span className="count">1782</span>
            <span>questions</span>
          </li>
          <li className="count_box">
            <span className="count">631</span>
            <span>responses</span>
          </li>
        </ul>
      </div>
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
            [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12].map((index, item) => {
              return <TopUser />
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
      <QuestionContent />
      <AnswerList />
      </div>
    )
  }
}

class SingleGroupQuestionNoAnswer extends React.Component {
  render(){
    return(
      <div className="question clearfix">
      <QuestionContent />
      </div>
    )
  }
}

class QuestionContent extends React.Component{
  render(){
    return(
      <div>
      <h3>Do you think Tyrion is Targaryen (the third head of the dragon)?</h3>
      <span>13 responses</span>
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
              return <AnswerCard />
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
