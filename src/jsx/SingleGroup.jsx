import React from "react";
import Moment from "moment";
import Utils from "./Utils.jsx";

let baseAPIUrl
if (process.env.NODE_ENV === 'production') {
  baseAPIUrl = 'http://api.letsyam.com'
} else if (process.env.NODE_ENV === 'staging') {
   baseAPIUrl = 'http://yam-staging.herokuapp.com'
} else {
  baseAPIUrl = 'http://localhost:3000'
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
      <h1 class="group_name text-center">Game of Thrones</h1>
      <hr class="group_name_separator"/>

      <ul id="group_info">
        <li class="count_box">
          <span class="count">324</span>
          <span>members</span>
        </li>
        <li class="count_box">
          <span class="count">1782</span>
          <span>questions</span>
        </li>
        <li class="count_box">
          <span class="count">631</span>
          <span>responses</span>
        </li>
      </ul>

      <div id="group_top_users">
        <h3>TOP USERS</h3>
        <a href="#" class="prev_btn"></a>
        <div class="list_container">
        <ul>
          <li>
            <a href="/">
            <div style="background-image: url(images/group-avatar.jpeg)" class="avatar">&nbsp;</div>
            Louis
            </a>
          </li>
        </ul>
        </div>
        <a href="#" class="next_btn"></a>
      </div>

        <div id="group_nav">
          <ul>
            <li><a href="#" class="selected">TRENDING</a></li>
            <li><a href="#">RECENT</a></li>
            <li><a href="#">TOP</a></li>
            <li><a href="#">UNANSWERED</a></li>
          </ul>
        </div>


        <div id="questions_list">
          <SingleQuestion />
          <div class="question clearfix">
            <h3>What was the most shocking moment for you in the S06E05?</h3>
            <span>8 responses</span>
          </div>
        </div>
    </div>
    // <div>
    //   {questions.map((item, index) => {
    //     return <SingleAnswer index={index} key={item.id}  item={item}
    //      />
    //      })}
    //   <LoadMore onClick={this.loadMore} isLoading={isLoading}/>
    // </div>
    )
  }
}

class SingleGroupQuestion extends React.Component {
  render(){
    return(
      <div class="question clearfix">
        <h3>Do you think Tyrion is Targaryen (the third head of the dragon)?</h3>
        <span>13 responses</span>
        <a href="#" class="prev_btn"></a>
        <div class="list_container">
        <ul>
          <li class="answer_card">
            <a href="single-answer.html">
            <div style="background-image: url(images/item1.png)" class="video_thumbnail"></div>
            <div class="play_btn"></div>
            <h4>Michael Cho</h4>
            <span>Dad. Entrepreneur. Go player.</span>
            </a>
          </li>
        </ul>
      </div>
      <a href="#" class="next_btn"></a>
      </div>
    )
  }
}
