import React from "react";
import Moment from "moment";
import {baseAPIUrl} from "./Utils.jsx";

export default class SingleGroupTopUsers extends React.Component{
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

    const endPoint = `public_groups/${group.id}/trending_users`
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
            isShowingNextBtn: data.length > 13
         })
      }).catch((e) => {
         console.log('error', e)
      })
  }

  render(){
    const { items, isShowingPrevBtn, isShowingNextBtn } = this.state
    const prevClass = isShowingPrevBtn ? "" : " hidden"
    const nextClass = isShowingNextBtn ? "" : " hidden"

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

class TopUser extends React.Component{
  render(){
    const { user } = this.props
    const avatar_url = (user.avatar_url.length > 0) ? user.avatar_url : "../images/avatar_placeholder_small.png"
    const backgroundImage = `url(${avatar_url})`

    return(
      <li>
        <a href={user.public_url} target="_blank">
        <div style={{backgroundImage:backgroundImage}} className="avatar"></div>
        {user.first_name}
        </a>
      </li>
    )
  }
}
