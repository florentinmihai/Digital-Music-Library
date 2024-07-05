import React, { useEffect } from "react";
import Axios from "axios";

export default function App() {
  // will update list as database updates on refreshing the site
  const [list, setList] = React.useState([]);

  // will be run once
  useEffect(() => {
    // here we get the data by requesting data from this link
    // to our nodejs server
    Axios.get("http://localhost:4000/api/retrieveMusicLibrary").then((res) =>
      setList(res.data)
    );
  }, []);

  // creating list of artists
  let val = list.map((item) => {
    return (
      <div key={item.id}>
        <h2>{item.name}</h2>

        {item.albums.map((more) => {
          return (
            <div>
              <b>Album:</b>
              {more.title} <br />
              <b>Songs:</b>
              {more.songs.map((more) => ` ${more.title} (${more.length}), `)}
            </div>
          );
        })}
        <br />
      </div>
    );
  });

  return (
    <div>
      <h1>Basic data fetch</h1>

      {val}
    </div>
  );
}
