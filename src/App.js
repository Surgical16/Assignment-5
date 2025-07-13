
import { useState, useRef, useEffect } from "react";
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Maximize2,
  Music,
  Mic,
  ListMusic,
  VolumeX,
} from "lucide-react";

const featuredPlaylists = [
  {
    id: 1,
    name: "Daily Mix 01",
    description: "Seedhe Maut, KR$NA, Parmish Verma and more",
    image:
      "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/daily/1/ab6761610000e5eb9e528993a2820267b97f6aae/en",
  },
  {
    id: 2,
    name: "Daily Mix 02",
    description: "Pritam, Vishal-Shekhar, Shankar-Ehsaan-Loy and more",
    image:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84dc9d42bc37d95f153c33fa5b",
  },
  {
    id: 3,
    name: "Daily Mix 03",
    description: "Kendrick Lamar, Drake, FLETCHER and more",
    image:
      "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/daily/1/ab6761610000e5ebb99cacf8acd5378206767261/en",
  },
  {
    id: 4,
    name: "Daily Mix 04",
    description: "Anuv Jain, Mitraz, Aditya Rikhari and more",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jVNYE-QcZIY-9YEnLDeRdjV8rPRxGAwZDBX8e88uyscJs-N_MIRsktjjMY0c6htYDtU&usqp=CAU",
  },
  {
    id: 5,
    name: "Daily Mix 05",
    description: "Sachin-Jigar, Arijit Singh, Yasser Desai and more",
    image: "https://i.scdn.co/image/ab67706f00000002d4a11feb5de1877e20658d41",
  },
  {
    id: 6,
    name: "Daily Mix 06",
    description: "Maroon 5, Alec Benjamin, Taylor Swift and more",
    image:
      "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/daily/1/ab6761610000e5eb39ba6dcd4355c03de0b50918/en",
  },
];

const recentlyPlayed = [
  {
    id: 1,
    name: "Liked Songs",
    type: "playlist",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPsFkuiZm4rklVJIdxEequE5uQJA4nIl7jrw&s",
  },
  {
    id: 2,
    name: "This Is Seedhe Maut",
    type: "playlist",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqttwpibiF9keMdYY6Lbpx8J-TxwwoH5PqlA&s",
  },
  {
    id: 3,
    name: "Hindi songs (best of 2000–2025)",
    type: "playlist",
    image: "https://i.scdn.co/image/ab67616d00001e02e3e80a0edf0c3114cfbc0f00",
  },
  {
    id: 4,
    name: "The Weeknd Mix",
    type: "playlist",
    image:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da844fc419eb9ee946468771f3d1",
  },
  {
    id: 5,
    name: "Yours Truly",
    type: "playlist",
    image: "https://i.scdn.co/image/ab67616d0000b27319c493ed7d737af499d6ce5b",
  },
  {
    id: 6,
    name: "Kendrick Lamar Mix",
    type: "playlist",
    image: "https://i.scdn.co/image/ab6761610000e5eb39ba6dcd4355c03de0b50918",
  },
];

const genres = [
  { name: "Pop", color: "bg-gradient-to-br from-pink-500 to-purple-600" },
  { name: "Hip-Hop", color: "bg-gradient-to-br from-orange-500 to-red-600" },
  { name: "Rock", color: "bg-gradient-to-br from-gray-600 to-gray-800" },
  { name: "Jazz", color: "bg-gradient-to-br from-blue-600 to-indigo-700" },
  { name: "Electronic", color: "bg-gradient-to-br from-cyan-500 to-blue-600" },
  { name: "Country", color: "bg-gradient-to-br from-yellow-600 to-orange-600" },
  { name: "R&B", color: "bg-gradient-to-br from-purple-600 to-pink-600" },
  { name: "Classical", color: "bg-gradient-to-br from-emerald-600 to-teal-700" },
];



const searchResults = [
  {
    id: 1,
    title: "Please Please Please",
    artist: "Sabrina Carpenter",
    album: "Short n' Sweet",
    duration: "2:56",
    image: "https://i.ytimg.com/vi/fG7CJJEzK2Y/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Kwaab Dekhe",
    artist: "Shreya Ghoshal, Arijit Singh",
    album: "Mr. & Mrs. Mahi",
    duration: "3:14",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmWa50ZlYynDzdEm8wHiJgKDfxTpWWCoynBQ&s",
    audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: 3,
    title: "Exes",
    artist: "Tate McRae",
    album: "Think Later",
    duration: "2:45",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRng4r8AJvKIOt8YhNw-ZHmCe0vJAkkYREBBA&s",
    audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: 4,
    title: "Ishq",
    artist: "Amir Ameer",
    album: "Ishq - Single",
    duration: "3:18",
    image: "https://a10.gaanacdn.com/gn_img/albums/4Z9bqo3yQn/9bqZRO1yKy/size_m.jpg",
    audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: 5,
    title: "Taste",
    artist: "Sabrina Carpenter",
    album: "Short n' Sweet",
    duration: "3:36",
    image:
      "https://i.ytimg.com/vi/-5GI38vWew8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBeEj9-HrWE8sEMh5BbApE6X_-18w",
    audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
];

export default function SpotifyClone() {
  const [currentView, setCurrentView] = useState("home");
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [volume, setVolume] = useState(75);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentSong, setCurrentSong] = useState(searchResults[0]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [likedSongs, setLikedSongs] = useState(new Set());

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setCurrentProgress((audio.currentTime / audio.duration) * 100);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeatMode === 2) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeatMode, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    let currentIndex = searchResults.findIndex((song) => song.id === currentSong.id);
    if (isShuffleOn) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * searchResults.length);
      } while (nextIndex === currentIndex);
      currentIndex = nextIndex;
    } else {
      currentIndex = (currentIndex + 1) % searchResults.length;
    }
    playSong(searchResults[currentIndex]);
  };

  const handlePrevious = () => {
    let currentIndex = searchResults.findIndex((song) => song.id === currentSong.id);
    if (isShuffleOn) {
      let prevIndex;
      do {
        prevIndex = Math.floor(Math.random() * searchResults.length);
      } while (prevIndex === currentIndex);
      currentIndex = prevIndex;
    } else {
      currentIndex = currentIndex === 0 ? searchResults.length - 1 : currentIndex - 1;
    }
    playSong(searchResults[currentIndex]);
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.audio;
      audioRef.current.play();
    }
  };

  const handleProgressChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentProgress(percent * 100);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(100, percent * 100));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const toggleLike = (songId) => {
    setLikedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const renderMainContent = () => {
    switch (currentView) {
      case "search":
        return (
          <div className="content-padding">
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery ? (
              <>
                <h2 className="heading-lg">Search Results</h2>
                <div className="search-results">
                  {searchResults
                    .filter(
                      (song) =>
                        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((song, index) => (
                      <div key={song.id} className="search-result-item">
                        <span className="search-result-index">{index + 1}</span>
                        <button
                          onClick={() => playSong(song)}
                          className="btn btn-icon"
                          aria-label={`Play ${song.title}`}
                        >
                          <Play size={16} />
                        </button>
                        <img src={song.image} alt={song.title} className="search-result-image" />
                        <div className="search-result-info">
                          <p className="search-result-title">{song.title}</p>
                          <p className="search-result-artist">{song.artist}</p>
                        </div>
                        <p className="search-result-album">{song.album}</p>
                        <button
                          onClick={() => toggleLike(song.id)}
                          className={`btn btn-icon ${
                            likedSongs.has(song.id) ? "text-green-400" : "text-gray-400"
                          }`}
                          aria-label={likedSongs.has(song.id) ? "Unlike" : "Like"}
                        >
                          <Heart fill={likedSongs.has(song.id) ? "currentColor" : "none"} size={16} />
                        </button>
                        <p className="search-result-duration">{song.duration}</p>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="heading-lg">Browse all</h2>
                <div className="grid grid-cols-4">
                  {genres.map((genre) => (
                    <button
                      key={genre.name}
                      className={`genre-card ${genre.color}`}
                      aria-label={`Browse ${genre.name} genre`}
                    >
                      <h3 className="heading-md">{genre.name}</h3>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        );

      case "library":
        return (
          <div className="content-padding">
            <div className="library-header">
              <h1 className="heading-xl">Your Library</h1>
              <button className="btn btn-icon" aria-label="Add new playlist">
                <Plus size={20} />
              </button>
            </div>
            <div className="library-list">
              {recentlyPlayed.map((item) => (
                <div key={item.id} className="library-item" tabIndex={0}>
                  <img src={item.image} alt={item.name} className="library-image" />
                  <div>
                    <p className="library-name">{item.name}</p>
                    <p className="library-type">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="content-padding">
            <div className="mb-8">
              <h1 className="heading-xl">Good evening</h1>
              <div className="grid grid-cols-3 gap-4">
                {recentlyPlayed.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="recently-played-card"
                    tabIndex={0}
                    onClick={() => alert(`Clicked on ${item.name}`)}
                  >
                    <div className="recently-played-content">
                      <img src={item.image} alt={item.name} className="recently-played-image" />
                      <p className="recently-played-text">{item.name}</p>
                      <button className="play-overlay" aria-label={`Play ${item.name}`}>
                        <Play size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="heading-lg">Made for you</h2>
              <div className="grid grid-cols-5 gap-4">
                {featuredPlaylists.map((playlist) => (
                  <div key={playlist.id} className="playlist-card" tabIndex={0}>
                    <div className="playlist-image-container">
                      <img src={playlist.image} alt={playlist.name} className="playlist-image" />
                      <button className="play-overlay" aria-label={`Play ${playlist.name}`}>
                        <Play size={16} />
                      </button>
                    </div>
                    <h3 className="playlist-title">{playlist.name}</h3>
                    <p className="playlist-description">{playlist.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-lg">Recently played</h2>
              <div className="grid grid-cols-5 gap-4">
                {featuredPlaylists.slice(0, 5).map((playlist) => (
                  <div key={playlist.id} className="playlist-card" tabIndex={0}>
                    <div className="playlist-image-container">
                      <img src={playlist.image} alt={playlist.name} className="playlist-image" />
                      <button className="play-overlay" aria-label={`Play ${playlist.name}`}>
                        <Play size={16} />
                      </button>
                    </div>
                    <h3 className="playlist-title">{playlist.name}</h3>
                    <p className="playlist-description">{playlist.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="spotify-container">
      <audio ref={audioRef} src={currentSong.audio} />

      <div className="main-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <Music size={32} className="text-green-400" />
              <span className="logo-text">SunZana</span>
            </div>
            <nav className="nav" aria-label="Main navigation">
              <button
                className={`nav-button ${currentView === "home" ? "active" : ""}`}
                onClick={() => setCurrentView("home")}
              >
                <Home size={20} />
                Home
              </button>
              <button
                className={`nav-button ${currentView === "search" ? "active" : ""}`}
                onClick={() => setCurrentView("search")}
              >
                <Search size={20} />
                Search
              </button>
              <button
                className={`nav-button ${currentView === "library" ? "active" : ""}`}
                onClick={() => setCurrentView("library")}
              >
                <Library size={20} />
                Your Library
              </button>
            </nav>
          </div>

          <div className="sidebar-section sidebar-buttons">
            <button className="nav-button">
              <Plus size={20} />
              Create Playlist
            </button>
            <button className="nav-button">
              <Heart size={20} />
              Liked Songs
            </button>
            <button className="nav-button">
              <Download size={20} />
              Downloaded
            </button>
          </div>

        </aside>

        <main className="main-content">{renderMainContent()}</main>
      </div>

      <footer className="music-player">
        <div className="player-container">
          <div className="current-song">
            <img src={currentSong.image} alt={currentSong.title} className="current-song-image" />
            <div className="current-song-info">
              <p className="current-song-title">{currentSong.title}</p>
              <p className="current-song-artist">{currentSong.artist}</p>
            </div>
            <button
              onClick={() => toggleLike(currentSong.id)}
              className={`btn btn-icon ${
                likedSongs.has(currentSong.id) ? "text-green-400" : "text-gray-400"
              }`}
              aria-label={likedSongs.has(currentSong.id) ? "Unlike" : "Like"}
            >
              <Heart fill={likedSongs.has(currentSong.id) ? "currentColor" : "none"} size={16} />
            </button>
          </div>

          <div className="player-controls">
            <div className="control-buttons">
              <button
                onClick={toggleShuffle}
                className={isShuffleOn ? "text-green-400" : "text-gray-400"}
                aria-label="Toggle shuffle"
              >
                <Shuffle size={16} />
              </button>
              <button onClick={handlePrevious} className="text-gray-400" aria-label="Previous song">
                <SkipBack size={20} />
              </button>
              <button
                onClick={togglePlay}
                className="btn btn-play"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button onClick={handleNext} className="text-gray-400" aria-label="Next song">
                <SkipForward size={20} />
              </button>
              <button
                onClick={toggleRepeat}
                className={repeatMode > 0 ? "text-green-400" : "text-gray-400"}
                aria-label="Toggle repeat mode"
              >
                <Repeat size={16} />
                {repeatMode === 2 && <span className="repeat-indicator"></span>}
              </button>
            </div>

            <div className="progress-container" onClick={handleProgressChange} role="slider" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={currentTime} tabIndex={0}>
              <span className="progress-time">{formatTime(currentTime)}</span>
              <div className="slider-track">
                <div className="slider-range" style={{ width: `${currentProgress}%` }}></div>
              </div>
              <span className="progress-time">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="volume-controls">
            <button onClick={() => {}} className="text-gray-400" aria-label="Queue">
              <ListMusic size={16} />
            </button>
            <button onClick={() => {}} className="text-gray-400" aria-label="Microphone">
              <Mic size={16} />
            </button>
            <button onClick={toggleMute} className="text-gray-400" aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <div
              className="volume-slider slider-track"
              onClick={handleVolumeChange}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={isMuted ? 0 : volume}
              tabIndex={0}
            >
              <div className="slider-range" style={{ width: `${isMuted ? 0 : volume}%` }}></div>
            </div>
            <button className="text-gray-400" aria-label="Maximize player">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
