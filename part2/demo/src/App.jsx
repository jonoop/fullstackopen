import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage,setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then(data => {
        setNotes(data)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService.create(noteObject)
    .then(data => {
      setNotes(notes.concat(data))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  const toggleImportance = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    noteService.update(id,changedNote).then(data => {
      setNotes(notes.map(note => note.id !== id ? note : data))
    }).catch(()=>{
      setErrorMessage(`Note '${note.content}' was already removed from server`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    })
  }

  const Footer=()=>{
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return <div style={footerStyle}>
      <br/>
      <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportance(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
      <Footer/>
    </div>
  )
}

export default App