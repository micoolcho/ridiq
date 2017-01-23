import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";

export default class SingleGroupTopUsers extends React.Component{
  constructor(...args) {
    super(...args);
    this.state = {
      trendingUsers:[],
      page: 1,
      isLoading: false
    }

    this.loadMore = this.loadMore.bind(this)
  }

  loadMore() {
    this.fetchTrendingUsers()
  }

  componentDidMount(){
    this.fetchTrendingUsers()
  }

  fetchTrendingUsers(pageCount = 10) {
    this.setState({isLoading: true})
    const {trendingUsers, page} = this.state
    // const endPoint = `${baseAPIUrl}/api/v6/activities/featured?per_page=${pageCount}&page=${page}`
    const endPoint = `${baseAPIUrl}/jsons/group_trending_users.json`
    console.log(endPoint)
    fetch(endPoint, {
      headers: {"Content-Type": "application/json;charset=UTF-8"},
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
         this.setState({
            trendingUsers: _.uniqBy(trendingUsers.concat(json.data), 'id'),
            page: page + 1,
            isLoading: false
         })
      })
      .catch((e) => {
         console.log('error', e)
      })
  }

  render(){
    const { trendingUsers } = this.state
    return(
      <div id="group_top_users">
        <h3>TOP USERS</h3>
        <a href="#" className="prev_btn hidden"></a>
        <div className="list_container">
        <ul>
          {
            trendingUsers.map((user, index) => {
              return <TopUser key={user.id} user={user}/>
            })
          }
        </ul>
        </div>
        <a href="#" className="next_btn hidden"></a>
      </div>
    )
  }
}

export class TopUser extends React.Component{
  render(){
    const { user } = this.props

    return(
      <li>
        <a href="/">
        <div style={{backgroundImage:"url(" + user.avatar_url + ")"}} className="avatar">&nbsp;</div>
        {user.first_name}
        </a>
      </li>
    )
  }
}
