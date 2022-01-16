import React from "react";
import './index.css'

const YoutubeEmbed = ({ source, title }) => (
  <div className="video-responsive">
    <iframe
      id = "youtube-video"
      width="853"
      height="480"
      src= {source + '?enablejsapi=1&version=3&playerapiid=ytplayer'}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title}
    />
  </div>
);

export default YoutubeEmbed;
