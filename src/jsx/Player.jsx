import React from 'react'
import {findDOMNode} from 'react-dom'
/*
jwplayer("player").setup({
        file: '#{@answer.video_url}',
        image: '#{@answer.image_video_url}',
        width: "100%",
        sharing: {
          code: "&lt;iframe width=&quot;560&quot; height=&quot;560&quot; src=&quot;#{request.protocol}#{request.env['HTTP_HOST']}/answers/#{@answer.hash_id}/iframe&quot; frameborder=&quot;0&quot; allowfullscreen&gt;&lt;/iframe&gt;",
          link: ["#{request.protocol}#{request.env['HTTP_HOST']}/answers/#{@answer.hash_id}"],
          sites: false,
        },
      });
      
      $(document).ready(function(){
        if (#{@stop_halfway} == false) {
          jwplayer().on('time', function(e) {
            if (e.position > e.duration / 2) {
              jwplayer().pause();
              jwplayer().setControls(false);

              updateSeeMorePosition();
            }
          });

          jwplayer().on('pause', function() {
            $(window).resize(function(){
              updateSeeMorePosition();
            });
          })
        }
      });

      function updateSeeMorePosition() {
        var playerPosition = $('#player').position();
        var overLay = $('#see-more');
        overLay.attr("style", "z-index: 21474183647; position: absolute; top: " + playerPosition.top + "px; left: " + playerPosition.left + "px; height: " + jwplayer().getHeight() + "px; width: " + jwplayer().getWidth() + "px; background-color: rgba(0, 0, 0, 0.7); padding: 10px;");
        overLay.html("<div style=\"color: white; font-size: 20px; text-align: center; vertical-align: middle; height: inherit; width: inherit; display: table-cell; top:50%\">" +
                       "Preview ended.<br>Download YAM to watch the rest of this video!<br><br>" +
                       "<div class=\"button button-small\" style=\"opacity: 1;\">" + 
                         "<a style=\"text-decoration: none;\" href=\"https://itunes.apple.com/us/app/yam-video-answers-from-fascinating/id1095968228?ls=1&mt=8\">" +
                           "DOWNLOAD APP" +
                         "</a>" +
                       "</div>" +
                     "</div>");
      };*/

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.updateSeeMorePosition = this.updateSeeMorePosition.bind(this)
  }
  componentDidMount() {
    const {video_url, image_url, id} =  this.props
    const playerId = `player-${this.props.id}`
    jwplayer(playerId).setup({
          file: video_url,
          image: image_url,
          width: "100%",  
   });
        
        
  jwplayer(playerId).on('time', (e) => {
    if (e.position > e.duration / 2) {
      jwplayer(playerId).pause();
      jwplayer(playerId).setControls(false);

      this.updateSeeMorePosition();
    }
  }); 
  
  
  jwplayer(playerId).on('pause', () => {
    $(window).resize(() => {
      this.updateSeeMorePosition();
    }); 
  }) 
  }
 updateSeeMorePosition() {
    var playerPosition = $(`#player-${this.props.id}`).position();
    var overLay = $(`#see-more-${this.props.id}`)
    overLay.attr("style", "z-index: 21474183647; position: absolute; top: " + playerPosition.top + "px; left: " + playerPosition.left + "px; height: " + jwplayer().getHeight() + "px; width: " + jwplayer().getWidth() + "px; background-color: rgba(0, 0, 0, 0.7); padding: 10px;");
    overLay.html("<div style=\"color: white; font-size: 20px; text-align: center; vertical-align: middle; height: inherit; width: inherit; display: table-cell; top:50%\">" +
                   "Preview ended.<br>Download YAM to watch the rest of this video!<br><br>" +
                   "<div class=\"button button-small\" style=\"opacity: 1;\">" + 
                     "<a style=\"text-decoration: none;\" href=\"https://itunes.apple.com/us/app/yam-video-answers-from-fascinating/id1095968228?ls=1&mt=8\">" +
                       "DOWNLOAD APP" +
                     "</a>" +
                   "</div>" +
                 "</div>");
  }
  render () {
   
    return (
      <div>
        <div id={`player-${this.props.id}`}></div>
        <div id={`see-more-${this.props.id}`}></div>
          
      </div>
    )
  }
}
