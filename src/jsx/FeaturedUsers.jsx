import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";

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

export default class FeaturedUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items:[],
      page: 1,
      isLoading: false,
      hasNext: true,
    }

    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData(pageCount = 10) {
    this.setState({isLoading: true})

    const {items, page, type} = this.state

    const endPoint = `activities/trending_users`
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
            hasNext: data.length >= pageCount
         })
      }).catch((e) => {
         console.log('error', e)
      })
  }

  loadMore() {
    this.fetchData()
  }

  render() {
    const {items, isLoading, hasNext} = this.state
    const {loadMore} = this.loadMore

    return (
      <div>
        <h2>Featured Users</h2>
      <div id="users_list">
        {
          items.map((user, index) => {
            return <UserCard key={user.id} user={user}/>
          })
        }

      <LoadMore onClick={this.loadMore} isLoading={isLoading} hidden={!hasNext}/>
    </div>
    </div>
    )
  }
}

class UserCard extends React.Component{
  render(){
    const {display_name, short_blurb, intro_image_url, public_url} = this.props.user
    const backgroundImage = `url(${intro_image_url})`

    return(
      <li className="answer_card">
        <a href={public_url} target="_blank">
        <div style={{backgroundImage:backgroundImage}} className="video_thumbnail"></div>
        <div className="play_btn"></div>
        <h4>{display_name}</h4>
        <span>{short_blurb}</span>
        </a>
      </li>
    )
  }
}
