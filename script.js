const audio = document.getElementById('audio')
const playButton = document.getElementById('play')
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const songTitle = document.getElementById('song-title')
const songArtist = document.getElementById('song-artist')
const fileUpload = document.getElementById('file-upload')

let songs = [
  { title: 'Song 1', artist: 'Artist 1', src: 'song1.mp3' },
  { title: 'Song 2', artist: 'Artist 2', src: 'song2.mp3' }
  // Add more songs here
]

let currentSongIndex = 0

function loadSong (index) {
  audio.src = songs[index].src
  songTitle.textContent = songs[index].title
  songArtist.textContent = songs[index].artist
}

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    playButton.textContent = 'Pause'
  } else {
    audio.pause()
    playButton.textContent = 'Play'
  }
})

prevButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length
  loadSong(currentSongIndex)
  audio.play()
})

nextButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length
  loadSong(currentSongIndex)
  audio.play()
})

audio.addEventListener('ended', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length
  loadSong(currentSongIndex)
  audio.play()
})

fileUpload.addEventListener('change', event => {
  const file = event.target.files[0]
  if (file) {
    const url = URL.createObjectURL(file)
    const artist = prompt('Enter the artist name:', 'Unknown')
    const newSong = {
      title: file.name.split('.')[0],
      artist: artist || 'Unknown',
      src: url
    }
    songs.push(newSong)
    saveSongsToLocalStorage()
    loadSong(songs.length - 1)
    audio.play()
  }
})

function saveSongsToLocalStorage () {
  localStorage.setItem('songs', JSON.stringify(songs))
}

function loadSongsFromLocalStorage () {
  const storedSongs = localStorage.getItem('songs')
  if (storedSongs) {
    songs = JSON.parse(storedSongs)
  }
}

loadSongsFromLocalStorage()
loadSong(currentSongIndex)
