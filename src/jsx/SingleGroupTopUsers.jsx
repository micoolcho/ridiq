import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";

export default class SingleGroupTopUsers extends React.Component{
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
    const {group} = this.props
    const endPoint = `${baseAPIUrl}/public_groups/5/trending_users?per_page=${pageCount}&page=${page}`

    fetch(endPoint, {
      headers: {"Content-Type": "application/json;charset=UTF-8"},
    }).then((response) => {
        return response.json()
      }).then((json) => {
         this.setState({
            items: _.uniqBy(items.concat(json.data), 'id'),
            page: page + 1,
            isLoading: false,
            hasNext: json.data.length >= pageCount,
            showingNextBtn: json.data.length > 13
         })
      }).catch((e) => {
         console.log('error', e)
      })
  }

  render(){
    const { items, showingPrevBtn, showingNextBtn } = this.state
    const prevClass = showingPrevBtn ? "" : " hidden"
    const nextClass = showingNextBtn ? "" : " hidden"

    return(
      <div id="group_top_users">
        <h3>TOP USERS</h3>
        <a href="#" className={"prev_btn" + prevClass}></a>

        <div className="list_container">
        <ul>
          {
            items.map((user, index) => {
              return <TopUser key={user.id} user={user}/>
            })
          }
        </ul>
        </div>

        <a href="#" className={"next_btn" + nextClass}></a>
      </div>
    )
  }
}

export class TopUser extends React.Component{
  render(){
    const { user } = this.props
    const backgroundImage = `url(${user.avatar_url})`

    return(
      <li>
        <a href="/">
        <div style={{backgroundImage:backgroundImage}} className="avatar"></div>
        {user.first_name}
        </a>
      </li>
    )
  }
}
