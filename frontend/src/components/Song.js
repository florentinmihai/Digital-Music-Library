import React from "react";

function Song({ song }) {
  return song && song.title && song.length ? (
    <li className="list list-library">
      <span>{song.title}</span>
      <span>{song.length} 🕧 </span>
    </li>
  ) : (
    <div className="center-text-container">Invalid song data. 🥺</div>
  );
}

export default Song;
