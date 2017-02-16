import React from "react";
import Moment from "moment";
import Utils from "./Utils.jsx";
import BasedLoadMoreComponent from "./BasedLoadMoreComponent.jsx";
import { AnswerService } from "./services/SingleQuestionService.jsx";
import SingleAnswer from "./SingleAnswer.jsx"
import _ from "lodash"

let baseAPIUrl
if (process.env.NODE_ENV === 'production') {
  baseAPIUrl = 'https://api.letsyam.com'
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

export default class Answers extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      answers:[],
      page: 1,
      isLoading: false
    }
    this.loadMore = this.loadMore.bind(this)
  }

  fetchAnswers(pageCount = 10) {
    this.setState({isLoading: true})
    const {answers, page} = this.state
    fetch(`${baseAPIUrl}/api/v6/activities/featured?per_page=${pageCount}&page=${page}`, {
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

  componentDidMount() {
    this.fetchAnswers()
  }
  loadMore() {
    this.fetchAnswers()
  }
  render() {
     const {answers, isLoading} = this.state
     const {loadMore} = this.loadMore
    return (
    <div>
      {answers.map((item, index) => {
        return <SingleAnswer index={index} key={item.id}  item={item}
         />
         })}
      <LoadMore onClick={this.loadMore} isLoading={isLoading}/>
    </div>
    )
  }
}
