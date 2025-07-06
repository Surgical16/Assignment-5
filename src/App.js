import './spotify.css';

import { useState } from "react"
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
} from "lucide-react"

// Mock data
const featuredPlaylists = [ 
  {
    id: 1,
    name: "Daily Mix 01",
    description: "Seedhe Maut, KR$NA, Parmish Verma and more",
    image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/daily/1/ab6761610000e5eb9e528993a2820267b97f6aae/en",
  },
  {
    id: 2,
    name: "Daily Mix 02",
    description: "Pritam, Vishal-Shekhar, Shankar-Ehsaan-Loy and more",
    image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84dc9d42bc37d95f153c33fa5b",
  },
  {
    id: 3,
    name: "Daily Mix 03",
    description: "Kendrick Lamar, Drake, FLETCHER and more",
    image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/daily/1/ab6761610000e5ebb99cacf8acd5378206767261/en",
  },
  {
    id: 4,
    name: "Daily Mix 04",
    description: "Anuv Jain, Mitraz, Aditya Rikhari and more",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jVNYE-QcZIY-9YEnLDeRdjV8rPRxGAwZDBX8e88uyscJs-N_MIRsktjjMY0c6htYDtU&usqp=CAU",
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
    image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/daily/1/ab6761610000e5eb39ba6dcd4355c03de0b50918/en",
  },
]


const recentlyPlayed = [
  { id: 1, name: "Liked Songs", type: "playlist", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPsFkuiZm4rklVJIdxEequE5uQJA4nIl7jrw&s" },
  {
    id: 2,
    name: "This Is Seedhe Maut",
    type: "playlist",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqttwpibiF9keMdYY6Lbpx8J-TxwwoH5PqlA&s",
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
    image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da844fc419eb9ee946468771f3d1",
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
]

const genres = [
  { name: "Pop", color: "genre-pop" },
  { name: "Hip-Hop", color: "genre-hip-hop" },
  { name: "Rock", color: "genre-rock" },
  { name: "Jazz", color: "genre-jazz" },
  { name: "Electronic", color: "genre-electronic" },
  { name: "Country", color: "genre-country" },
  { name: "R&B", color: "genre-rb" },
  { name: "Classical", color: "genre-classical" },
]

const currentSong = {
  title: "Please Please Please",
  artist: "Sabrina Carpenter",
    album: "Short n’ Sweet",
    image: "https://i.ytimg.com/vi/fG7CJJEzK2Y/maxresdefault.jpg",
  duration: 200,
  currentTime: 45,
}

const searchResults = [
  {
    id: 1,
    title: "Please Please Please",
    artist: "Sabrina Carpenter",
    album: "Short n’ Sweet",
    duration: "2:56",
    image: "https://i.ytimg.com/vi/fG7CJJEzK2Y/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Kwaab Dekhe",
    artist: "Shreya Ghoshal, Arijit Singh",
    album: "Mr. & Mrs. Mahi",
    duration: "3:14",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmWa50ZlYynDzdEm8wHiJgKDfxTpWWCoynBQ&s",
  },
  {
    id: 3,
    title: "Exes",
    artist: "Tate McRae",
    album: "Think Later",
    duration: "2:45",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRng4r8AJvKIOt8YhNw-ZHmCe0vJAkkYREBBA&s",
  },
  {
    id: 4,
    title: "Ishq",
    artist: "Amir Ameer",
    album: "Ishq - Single",
    duration: "3:18",
    image: "https://a10.gaanacdn.com/gn_img/albums/4Z9bqo3yQn/9bqZRO1yKy/size_m.jpg",
  },
  {
    id: 5,
    title: "Taste",
    artist: "Sabrina Carpenter",
    album: "Short n’ Sweet",
    duration: "3:36",
    image: "https://i.ytimg.com/vi/-5GI38vWew8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBeEj9-HrWE8sEMh5BbApE6X_-18w",
  },
];

export default function SpotifyClone() {
  const [currentView, setCurrentView] = useState("home")
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [volume, setVolume] = useState([75])
  const [currentProgress, setCurrentProgress] = useState([22.5])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const renderMainContent = () => {
    switch (currentView) {
      case "search":
        return (
          <div className="content-padding">
            <div className="mb-6">
              <input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            {searchQuery ? (
              <div>
                <h2 className="heading-lg">Search Results</h2>
                <div className="search-results">
                  {searchResults.map((song, index) => (
                    <div key={song.id} className="search-result-item">
                      <span className="search-result-index">{index + 1}</span>
                      <img src={song.image || "/placeholder.svg"} alt={song.title} className="search-result-image" />
                      <div className="search-result-info">
                        <p className="search-result-title">{song.title}</p>
                        <p className="search-result-artist">{song.artist}</p>
                      </div>
                      <p className="search-result-album">{song.album}</p>
                      <p className="search-result-duration">{song.duration}</p>
                      <button className="btn btn-ghost btn-icon play-overlay">
                        <Play size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="heading-lg">Browse all</h2>
                <div className="grid grid-cols-2 md-grid-cols-3 lg-grid-cols-4">
                  {genres.map((genre) => (
                    <div key={genre.name} className={`card genre-card ${genre.color}`}>
                      <div className="card-content-sm">
                        <h3 className="heading-md">{genre.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case "library":
        return (
          <div className="content-padding">
            <div className="library-header">
              <h1 className="heading-lg">Your Library</h1>
              <button className="btn btn-ghost btn-icon">
                <Plus size={20} />
              </button>
            </div>
            <div className="library-list">
              {recentlyPlayed.map((item) => (
                <div key={item.id} className="library-item">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="library-image" />
                  <div>
                    <p className="library-name">{item.name}</p>
                    <p className="library-type">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="content-padding">
            <div className="mb-8">
              <h1 className="heading-xl">Good evening</h1>
              <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3">
                {recentlyPlayed.slice(0, 6).map((item) => (
                  <div key={item.id} className="card recently-played-card">
                    <div className="recently-played-content">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="recently-played-image" />
                      <p className="recently-played-text">{item.name}</p>
                      <button className="btn btn-primary btn-icon play-overlay">
                        <Play size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="heading-lg">Made for you</h2>
              <div className="grid grid-cols-2 md-grid-cols-3 lg-grid-cols-5 xl-grid-cols-6">
                {featuredPlaylists.map((playlist) => (
                  <div key={playlist.id} className="playlist-card">
                    <div className="playlist-image-container">
                      <img src={playlist.image || "/placeholder.svg"} alt={playlist.name} className="playlist-image" />
                      <button className="play-overlay">
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
              <div className="grid grid-cols-2 md-grid-cols-3 lg-grid-cols-5 xl-grid-cols-6">
                {featuredPlaylists.slice(0, 5).map((playlist) => (
                  <div key={playlist.id} className="playlist-card">
                    <div className="playlist-image-container">
                      <img src={playlist.image || "/placeholder.svg"} alt={playlist.name} className="playlist-image" />
                      <button className="play-overlay">
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
        )
    }
  }

  return (
    <div className="spotify-container">
      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <Music size={32} />
              <span className="logo-text">SunZana</span>
            </div>
            <nav className="nav">
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

          <div className="sidebar-section">
            <div className="sidebar-buttons">
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
          </div>

          <div className="scroll-area">
            <div className="playlist-list">
              {[
                "My Playlist #1",
                "My Playlist #2",
                "My Playlist #3",
                "Chill Vibes",
                "Workout Mix",
                "Road Trip Songs",
              ].map((playlist) => (
                <button key={playlist} className="playlist-button">
                  {playlist}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">{renderMainContent()}</div>
      </div>

      {/* Music Player */}
      <div className="music-player">
        <div className="player-container">
          {/* Current Song Info */}
          <div className="current-song">
            <img src={currentSong.image || "/placeholder.svg"} alt={currentSong.title} className="current-song-image" />
            <div className="current-song-info">
              <p className="current-song-title">{currentSong.title}</p>
              <p className="current-song-artist">{currentSong.artist}</p>
            </div>
            <button className="btn btn-ghost btn-icon">
              <Heart size={16} />
            </button>
          </div>

          {/* Player Controls */}
          <div className="player-controls">
            <div className="control-buttons">
              <button className="btn btn-ghost btn-icon">
                <Shuffle size={16} />
              </button>
              <button className="btn btn-ghost btn-icon">
                <SkipBack size={20} />
              </button>
              <button className="btn btn-play" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button className="btn btn-ghost btn-icon">
                <SkipForward size={20} />
              </button>
              <button className="btn btn-ghost btn-icon">
                <Repeat size={16} />
              </button>
            </div>

            <div className="progress-container">
              <span className="progress-time">{formatTime(currentSong.currentTime)}</span>
              <div className="slider">
                <div className="slider-track">
                  <div className="slider-range" style={{ width: `${currentProgress[0]}%` }}></div>
                </div>
                <div className="slider-thumb" style={{ left: `${currentProgress[0]}%` }}></div>
              </div>
              <span className="progress-time">{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          {/* Volume and Options */}
          <div className="volume-controls">
            <button className="btn btn-ghost btn-icon">
              <ListMusic size={16} />
            </button>
            <button className="btn btn-ghost btn-icon">
              <Mic size={16} />
            </button>
            <button className="btn btn-ghost btn-icon">
              <Volume2 size={16} />
            </button>
            <div className="slider volume-slider">
              <div className="slider-track">
                <div className="slider-range" style={{ width: `${volume[0]}%` }}></div>
              </div>
              <div className="slider-thumb" style={{ left: `${volume[0]}%` }}></div>
            </div>
            <button className="btn btn-ghost btn-icon">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
