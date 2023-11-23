import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const onHandleAdd = (e) => {
    e.preventDefault()
    if(persons.find(person=>person.name === newName)) {alert(`${newName} already exists`)
    return}
    setPersons([...persons,{name:newName,number:newNumber}])
  }
  const onHandleFilter = (e) => {
    setFilter(e.target.value)
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>
          filter shown with <input onChange={onHandleFilter} value={filter}/>
          </p>
          <ul>

        {persons.filter(person=>person.name === filter).map(person=> <li key={person.name}>{person.name}</li>)}
          </ul>
      </div>
      <form onSubmit={onHandleAdd}>
        <div>
          name: <input onChange={(e)=>setNewName(e.target.value)} value={newName}/>
          
        </div>
        <div>number: <input onChange={(e)=>setNewNumber(e.target.value)} value={newNumber}/></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>


      {persons.map(person => <li key={person.name}>{person.name}</li>
      )}
      </ul>
    </div>
  )
}

export default App