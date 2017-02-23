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

export default class AllGroups extends React.Component {
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

    const endPoint = `public_groups`
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
        <h2>Groups on YAM</h2>
      <div id="groups_list">
        {
          items.map((group, index) => {
            return <Group key={group.id} group={group}/>
          })
        }

      <LoadMore onClick={this.loadMore} isLoading={isLoading} hidden={!hasNext}/>
    </div>
    </div>
    )
  }
}

class Group extends React.Component {

  render(){
    const {name, follower_count, question_count, answer_count} = this.props.group

    return (
      <a className="group" href="#">
        <h3>{name}</h3>
        <div>
          <span>{follower_count} members</span>
          <span>{question_count} questions</span>
          <span>{answer_count} responses</span>
        </div>
      </a>
    )
  }
}
