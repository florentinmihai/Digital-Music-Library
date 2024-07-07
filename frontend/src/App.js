import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";

export default function App() {
  const [list, setList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/retrieveMusicLibrary")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setList(data);
        } else {
          console.error("Unexpected data structure:", data);
          setList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setList([]);
      });
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
    try {
      await Axios.delete(
        `http://localhost:4000/api/deleteArtist/${artistName}`
      );
      setList((list) => list.filter((artist) => artist.name !== artistName));
      setSelectedArtist(null);
      setSelectedAlbum(null);
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  }

  async function handleDeleteAlbum(artistName, albumTitle) {
    try {
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
      setSelectedArtist((prevSelectedArtist) => ({
        ...prevSelectedArtist,
        albums: prevSelectedArtist.albums.filter(
          (album) => album.title !== albumTitle
        ),
      }));
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  }

  async function handleUpdateArtist(oldName, newName) {
    try {
      await Axios.put(`http://localhost:4000/api/updateArtist/`, {
        oldName,
        newName,
      });
      setList((list) =>
        list.map((artist) =>
          artist.name === oldName
            ? {
                ...artist,
                name: newName,
              }
            : artist
        )
      );

      if (selectedArtist && selectedArtist.name === oldName) {
        setSelectedArtist((prevSelectedArtist) => ({
          ...prevSelectedArtist,
          name: newName,
        }));
      }
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  }

  async function handleUpdateAlbum(
    artistName,
    oldTitle,
    newTitle,
    newDescription
  ) {
    try {
      await Axios.put(`http://localhost:4000/api/updateAlbum/`, {
        artistName,
        oldTitle,
        newTitle,
        newDescription,
      });
      setList((list) =>
        list.map((artist) =>
          artist.name === artistName
            ? {
                ...artist,
                albums: artist.albums.map((album) =>
                  album.title === oldTitle
                    ? { ...album, title: newTitle, description: newDescription }
                    : album
                ),
              }
            : artist
        )
      );

      if (selectedAlbum && selectedAlbum.title === oldTitle) {
        setSelectedAlbum((prevSelectedAlbum) => ({
          ...prevSelectedAlbum,
          title: newTitle,
          description: newDescription,
        }));
      }

      setSelectedArtist((prevSelectedArtist) => ({
        ...prevSelectedArtist,
        albums: prevSelectedArtist.albums.map((album) =>
          album.title === oldTitle
            ? { ...album, title: newTitle, description: newDescription }
            : album
        ),
      }));
    } catch (error) {
      console.error("Error updating album:", error);
    }
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
            onUpdateArtist={handleUpdateArtist}
            selectedArtist={selectedArtist}
          />
        </Box>

        <Box title="Albums 💿">
          {selectedArtist ? (
            <AlbumList
              artist={selectedArtist}
              onSelectAlbum={handleSelectAlbum}
              onDeleteAlbum={handleDeleteAlbum}
              onUpdateAlbum={handleUpdateAlbum}
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
        {isOpen ? "-" : "+"}
      </button>
      <h1 className={"box-title"}>{title}</h1>
      {isOpen && children}
    </div>
  );
}

function ArtistList({
  list,
  onSelectArtist,
  onDeleteArtist,
  onUpdateArtist,
  selectedArtist,
}) {
  return list.length === 0 ? (
    <div className="center-text-container">No data available. 🥺</div>
  ) : (
    <ul className="list list-library">
      {list.map((artist) => (
        <Artist
          artist={artist}
          key={artist.name}
          onSelectArtist={onSelectArtist}
          onDeleteArtist={onDeleteArtist}
          onUpdateArtist={onUpdateArtist}
          isSelected={selectedArtist && selectedArtist.name === artist.name}
        />
      ))}
    </ul>
  );
}

function Artist({
  artist,
  onSelectArtist,
  onDeleteArtist,
  onUpdateArtist,
  isSelected,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(artist.name);

  const handleUpdate = () => {
    onUpdateArtist(artist.name, newName);
    setIsEditing(false);
  };

  return (
    <li className={isSelected ? "selected" : ""}>
      {isEditing ? (
        <>
          <input
            className={"edit-text"}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className={"btn-save"} onClick={handleUpdate}>
            👍🏼
          </button>
          <button className={"btn-delete"} onClick={() => setIsEditing(false)}>
            👎🏼
          </button>
        </>
      ) : (
        <>
          <h3 onClick={() => onSelectArtist(artist)}>{artist.name}</h3>
          <button
            className={"btn-delete"}
            onClick={() => onDeleteArtist(artist.name)}
          >
            🗑️
          </button>
          <button className={"btn-update"} onClick={() => setIsEditing(true)}>
            ✏️
          </button>
        </>
      )}
    </li>
  );
}

function AlbumList({
  artist,
  onSelectAlbum,
  onDeleteAlbum,
  onUpdateAlbum,
  selectedAlbum,
}) {
  return artist.albums && artist.albums.length > 0 ? (
    <ul className="list list-library">
      {artist.albums.map((album) => (
        <Album
          album={album}
          key={album.title}
          onSelectAlbum={onSelectAlbum}
          onDeleteAlbum={onDeleteAlbum}
          onUpdateAlbum={onUpdateAlbum}
          artistName={artist.name}
          isSelected={selectedAlbum && selectedAlbum.title === album.title}
        />
      ))}
    </ul>
  ) : (
    <div className="center-text-container">No data available. 🥺</div>
  );
}

function Album({
  album,
  onSelectAlbum,
  onDeleteAlbum,
  onUpdateAlbum,
  artistName,
  isSelected,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(album.title);
  const [newDescription, setNewDescription] = useState(album.description);

  const handleUpdate = () => {
    onUpdateAlbum(artistName, album.title, newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <li className={isSelected ? "selected" : ""}>
      {isEditing ? (
        <>
          <input
            className={"edit-text"}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <br />
          <br />
          <textarea
            className={"edit-text-description"}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button className={"btn-save"} onClick={handleUpdate}>
            👍🏼
          </button>
          <button className={"btn-delete"} onClick={() => setIsEditing(false)}>
            👎🏼
          </button>
        </>
      ) : (
        <>
          <h4 onClick={() => onSelectAlbum(album)}>{album.title}</h4>
          <button
            className={"btn-delete"}
            onClick={() => onDeleteAlbum(artistName, album.title)}
          >
            🗑️
          </button>
          <button className={"btn-update"} onClick={() => setIsEditing(true)}>
            ✏️
          </button>
        </>
      )}
    </li>
  );
}

function AlbumDetails({ album, onCloseAlbum }) {
  return (
    <div className="details">
      <h1 className={"box-title"}>{album.title}</h1>
      {album.description ? (
        <p className={"box-text"}>{album.description}</p>
      ) : (
        <p className="center-text-container">No data available. 🥺</p>
      )}
      {album.songs && album.songs.length > 0 ? (
        <SongList songs={album.songs} />
      ) : album.description ? (
        <p className="center-text-container">No data available. 🥺</p>
      ) : (
        ""
      )}
    </div>
  );
}

function SongList({ songs }) {
  return songs && songs.length > 0 ? (
    <ul className="list list-library">
      {songs.map((song) => (
        <Song song={song} key={song.title} />
      ))}
    </ul>
  ) : (
    <div className="center-text-container">No data available. 🥺</div>
  );
}

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
