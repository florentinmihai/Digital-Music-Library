import React, { useEffect, useState } from "react";
import Axios from "axios";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Main from "./components/Main";
import Box from "./components/Box";
import ArtistList from "./components/ArtistList";
import AlbumList from "./components/AlbumList";
import AlbumDetails from "./components/AlbumDetails";

function App() {
  const [list, setList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [newArtistName, setNewArtistName] = useState("");
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newSongName, setNewSongName] = useState("");
  const [newSongLength, setNewSongLength] = useState("");

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

  async function handleDeleteSong(artistName, albumTitle, songTitle) {
    try {
      await Axios.delete(
        `http://localhost:4000/api/deleteSong/${artistName}/${albumTitle}/${songTitle}`
      );

      setList((prevList) =>
        prevList.map((artist) =>
          artist.name === artistName
            ? {
                ...artist,
                albums: artist.albums.map((album) =>
                  album.title === albumTitle
                    ? {
                        ...album,
                        songs: album.songs.filter(
                          (song) => song.title !== songTitle
                        ),
                      }
                    : album
                ),
              }
            : artist
        )
      );

      setSelectedAlbum((prevSelectedAlbum) =>
        prevSelectedAlbum && prevSelectedAlbum.title === albumTitle
          ? {
              ...prevSelectedAlbum,
              songs: prevSelectedAlbum.songs.filter(
                (song) => song.title !== songTitle
              ),
            }
          : prevSelectedAlbum
      );

      setSelectedArtist((prevSelectedArtist) => ({
        ...prevSelectedArtist,
        albums: prevSelectedArtist.albums.map((album) =>
          album.title === albumTitle
            ? {
                ...album,
                songs: album.songs.filter((song) => song.title !== songTitle),
              }
            : album
        ),
      }));
    } catch (error) {
      console.error("Error deleting song:", error);
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

  async function handleUpdateSong(
    artistName,
    albumTitle,
    oldTitle,
    newTitle,
    newLength
  ) {
    try {
      await Axios.put(`http://localhost:4000/api/updateSong/`, {
        artistName,
        albumTitle,
        oldTitle,
        newTitle,
        newLength,
      });

      setList((list) =>
        list.map((artist) =>
          artist.name === artistName
            ? {
                ...artist,
                albums: artist.albums.map((album) =>
                  album.title === albumTitle
                    ? {
                        ...album,
                        songs: album.songs.map((song) =>
                          song.title === oldTitle
                            ? { ...song, title: newTitle, length: newLength }
                            : song
                        ),
                      }
                    : album
                ),
              }
            : artist
        )
      );

      if (selectedAlbum && selectedAlbum.title === albumTitle) {
        setSelectedAlbum((prevSelectedAlbum) => ({
          ...prevSelectedAlbum,
          songs: prevSelectedAlbum.songs.map((song) =>
            song.title === oldTitle
              ? { ...song, title: newTitle, length: newLength }
              : song
          ),
        }));
      }

      setSelectedArtist((prevSelectedArtist) => ({
        ...prevSelectedArtist,
        albums: prevSelectedArtist.albums.map((album) =>
          album.title === albumTitle
            ? {
                ...album,
                songs: album.songs.map((song) =>
                  song.title === oldTitle
                    ? { ...song, title: newTitle, length: newLength }
                    : song
                ),
              }
            : album
        ),
      }));
    } catch (error) {
      console.error("Error updating song:", error);
    }
  }

  async function handleAddArtist(event) {
    event.preventDefault();
    try {
      await Axios.post(`http://localhost:4000/api/addArtist`, {
        name: newArtistName,
      });
      setList((prevList) => [...prevList, { name: newArtistName, albums: [] }]);
      setNewArtistName("");
    } catch (error) {
      console.error("Error adding artist:", error);
    }
  }
  async function handleAddAlbum(event) {
    event.preventDefault();

    if (!selectedArtist) {
      console.error("No artist selected");
      return;
    }

    const currentArtistName = selectedArtist.name;

    try {
      await Axios.post(`http://localhost:4000/api/addAlbum`, {
        artistName: currentArtistName,
        albumTitle: newAlbumName,
      });

      const updatedList = list.map((artist) =>
        artist.name === currentArtistName
          ? {
              ...artist,
              albums: [
                ...artist.albums,
                {
                  title: newAlbumName,
                  songs: [],
                  description: "",
                },
              ],
            }
          : artist
      );

      setList([...updatedList]);

      const updatedSelectedArtist = updatedList.find(
        (artist) => artist.name === currentArtistName
      );

      setSelectedArtist(updatedSelectedArtist);

      setNewAlbumName("");
    } catch (error) {
      console.error("Error adding album:", error);
    }
  }

  async function handleAddSong(event) {
    event.preventDefault();

    if (!selectedArtist || !selectedAlbum) {
      console.error("Selected artist or album is not defined");
      return;
    }

    const currentArtistName = selectedArtist.name;
    const currentAlbumTitle = selectedAlbum.title;

    try {
      console.log("Sending data to backend:", {
        artistName: currentArtistName,
        albumTitle: currentAlbumTitle,
        songTitle: newSongName,
        songLength: newSongLength,
      });

      // Send request to add song to backend
      const response = await Axios.post(`http://localhost:4000/api/addSong`, {
        artistName: currentArtistName,
        albumTitle: currentAlbumTitle,
        songTitle: newSongName,
        songLength: newSongLength,
      });

      console.log("Backend response:", response.data);

      const updatedList = list.map((artist) =>
        artist.name === currentArtistName
          ? {
              ...artist,
              albums: artist.albums.map((album) =>
                album.title === currentAlbumTitle
                  ? {
                      ...album,
                      songs: [
                        ...album.songs,
                        { title: newSongName, length: newSongLength },
                      ],
                    }
                  : album
              ),
            }
          : artist
      );

      setList(updatedList);

      const updatedSelectedArtist = updatedList.find(
        (artist) => artist.name === currentArtistName
      );

      setSelectedArtist(updatedSelectedArtist);

      const updatedSelectedAlbum = updatedSelectedArtist.albums.find(
        (album) => album.title === currentAlbumTitle
      );

      setSelectedAlbum(updatedSelectedAlbum);

      setNewSongName("");
      setNewSongLength("");
    } catch (error) {
      console.error("Error adding song:", error);
    }
  }

  return (
    <>
      <NavBar>
        <Search />
      </NavBar>

      <Main>
        <Box
          title="Artists 🎤"
          newEntry={newArtistName}
          setNewEntry={setNewArtistName}
          handleAdd={handleAddArtist}
        >
          <ArtistList
            list={list}
            onSelectArtist={handleSelectArtist}
            onDeleteArtist={handleDeleteArtist}
            onUpdateArtist={handleUpdateArtist}
            selectedArtist={selectedArtist}
          />
        </Box>
        <Box
          title="Albums 💿"
          newEntry={newAlbumName}
          setNewEntry={setNewAlbumName}
          handleAdd={handleAddAlbum}
        >
          {selectedArtist ? (
            <AlbumList
              artist={selectedArtist}
              onSelectAlbum={handleSelectAlbum}
              onDeleteAlbum={handleDeleteAlbum}
              onUpdateAlbum={handleUpdateAlbum}
              selectedAlbum={selectedAlbum}
            />
          ) : (
            <div className={"details"}>
              <p className={"box-text-no-data"}>
                Select an artist in order to see the albums. ⚠️
              </p>
            </div>
          )}
        </Box>
        <Box
          title="Details 📃"
          newEntry={newSongName}
          setNewEntry={setNewSongName}
          handleAdd={handleAddSong}
          newSongLength={newSongLength}
          setNewSongLength={setNewSongLength}
        >
          {selectedAlbum ? (
            <AlbumDetails
              artist={selectedArtist}
              album={selectedAlbum}
              onDeleteSong={handleDeleteSong}
              onUpdateSong={handleUpdateSong} // Pass handleUpdateSong to AlbumDetails
            />
          ) : (
            <div className={"details"}>
              <p className={"box-text-no-data"}>
                Select an album in order to see the details. ⚠️
              </p>
            </div>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
