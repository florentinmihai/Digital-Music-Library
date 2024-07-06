import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";

export default function App() {
  const [list, setList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/retrieveMusicLibrary").then((res) =>
      setList(res.data)
    );
  }, []);

  function handleSelectArtist(artist) {
    setSelectedArtist((selectedArtist) =>
      artist === selectedArtist ? null : artist
    );
    setSelectedAlbum(null); // Reset selected album when a new artist is selected
  }

  function handleSelectAlbum(album) {
    setSelectedAlbum((selectedAlbum) =>
      album === selectedAlbum ? null : album
    );
  }

  function handleCloseAlbum() {
    setSelectedAlbum(null);
  }

  async function handleDeleteArtist(artistName) {
    await Axios.delete(`http://localhost:4000/api/deleteArtist/${artistName}`);
    setList((list) => list.filter((artist) => artist.name !== artistName));
    setSelectedArtist(null);
    setSelectedAlbum(null);
  }

  async function handleDeleteAlbum(artistName, albumTitle) {
    await Axios.delete(
      `http://localhost:4000/api/deleteAlbum/${artistName}/${albumTitle}`
    );

    setList((list) =>
      list.map((artist) =>
        artist.name === artistName
          ? {
              ...artist,
              albums: artist.albums.filter(
                (album) => album.title !== albumTitle
              ),
            }
          : artist
      )
    );

    setSelectedAlbum(null);
  }

  return (
    <>
      <NavBar>
        <Search />
      </NavBar>

      <Main>
        <Box title="Artists 🎤">
          <ArtistList
            list={list}
            onSelectArtist={handleSelectArtist}
            onDeleteArtist={handleDeleteArtist}
            selectedArtist={selectedArtist}
          />
        </Box>

        <Box title="Albums 💿">
          {selectedArtist ? (
            <AlbumList
              artist={selectedArtist}
              onSelectAlbum={handleSelectAlbum}
              onDeleteAlbum={handleDeleteAlbum}
              selectedAlbum={selectedAlbum}
            />
          ) : (
            <div className="center-text-container">
              <p>Select an artist first in order to see the albums. 👈🏻⚠️</p>
            </div>
          )}
        </Box>

        <Box title="Details 📃">
          {selectedAlbum ? (
            <AlbumDetails
              album={selectedAlbum}
              onCloseAlbum={handleCloseAlbum}
            />
          ) : (
            <div className="center-text-container">
              <p>Select an album first in order to see the details. 👈🏻⚠️</p>
            </div>
          )}
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🎶</span>
      <h1>Music Library</h1>
    </div>
  );
}

function Search() {
  const inputEl = useRef(null);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search albums..."
      ref={inputEl}
    />
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "+" : "-"}
      </button>
      <h1 className={"box-title"}> {title}</h1>
      {isOpen && children}
    </div>
  );
}

function ArtistList({ list, onSelectArtist, onDeleteArtist, selectedArtist }) {
  return (
    <ul className="list list-library">
      {list?.map((artist) => (
        <Artist
          artist={artist}
          key={artist.name}
          onSelectArtist={onSelectArtist}
          onDeleteArtist={onDeleteArtist}
          isSelected={selectedArtist && selectedArtist.name === artist.name}
        />
      ))}
    </ul>
  );
}

function Artist({ artist, onSelectArtist, onDeleteArtist, isSelected }) {
  return (
    <li className={isSelected ? "selected" : ""}>
      <h3 onClick={() => onSelectArtist(artist)}>{artist.name}</h3>
      <button
        className={"btn-delete"}
        onClick={() => onDeleteArtist(artist.name)}
      >
        ❌
      </button>
      <button className={"btn-update"}>✏️</button>
    </li>
  );
}

function AlbumList({ artist, onSelectAlbum, onDeleteAlbum, selectedAlbum }) {
  return (
    <ul className="list list-library">
      {artist.albums.map((album) => (
        <Album
          album={album}
          key={album.title}
          onSelectAlbum={onSelectAlbum}
          onDeleteAlbum={onDeleteAlbum}
          artistName={artist.name}
          isSelected={selectedAlbum && selectedAlbum.title === album.title}
        />
      ))}
    </ul>
  );
}

function Album({
  album,
  onSelectAlbum,
  onDeleteAlbum,
  artistName,
  isSelected,
}) {
  return (
    <li className={isSelected ? "selected" : ""}>
      <h4 onClick={() => onSelectAlbum(album)}>{album.title}</h4>
      <button
        className={"btn-delete"}
        onClick={() => onDeleteAlbum(artistName, album.title)}
      >
        ❌
      </button>
      <button className={"btn-update"}>✏️</button>
    </li>
  );
}

function AlbumDetails({ album, onCloseAlbum }) {
  return (
    <div className="details">
      <h1 className={"box-title"}>{album.title}</h1>

      <p className={"box-text"}>{album.description}</p>

      <SongList songs={album.songs} />
    </div>
  );
}

function SongList({ songs }) {
  return (
    <ul className="list list-library">
      {songs.map((song) => (
        <Song song={song} key={song.title} />
      ))}
    </ul>
  );
}

function Song({ song }) {
  return (
    <li className="list list-library">
      <span>{song.title}</span>
      <span>{song.length} 🕧 </span>
    </li>
  );
}
