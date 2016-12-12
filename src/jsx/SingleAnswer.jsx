import React from 'react'
import Player from './Player.jsx'

export default class SingleAnswer extends React.Component {
  constructor(props) {
     super(props)
     this.gotoUser = this.gotoUser.bind(this)
  }
  gotoUser() {
    location.href = this.props.item.user_public_url
  }
  render () {
    const {item, onMouseEnter, index} = this.props
    return (
    <div className="single-answer-wrapper margin-auto" onMouseEnter={this.onMouseEnter}>
      <div className="question-block">
        <div className="content">
          {item.question.content}
        </div>
      </div>
      
      <div className="answer-block">
        <div className="user" onClick={this.gotoUser} style={{cursor: 'pointer'}}>
          <a href={item.user_public_url} className="avatar" style={{backgroundImage: `url(${item.user_avatar_url})`}}>&nbsp;</a>
          <a href={item.user_public_url} style={{textDecoration: 'none'}}><span className="name"> {item.user_name} - {item.user_short_blurb}</span></a>
          
        </div>
        <Player video_url={item.video_url} image_url={item.image_url} id={item.id}/>
      </div>
      
      </div>
    )
  }
}
