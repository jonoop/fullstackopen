const express = require('express')
const morgan = require('morgan')
const app = express()
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(morgan('tiny'))

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/info',(req,res)=>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p>`+new Date())
})

app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    const person = persons.find(person=>person.id===id)
    if(person){
        res.json(person)
    }else{
        res.status(404).json({
            error:'person not found'
        })
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person=>person.id!==id)
    res.status(204).end()
})
const generateId = () =>{
    const maxId = persons.length>0?Math.max(...persons.map(n=>n.id)):0
    return maxId + 1
}
app.post('/api/persons',(req,res)=>{
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({
            error:'name or number missing'
        })
    }
    if(persons.find(person=>person.name === body.name)){
        console.log('name must be unique')
        return res.status(400).json({
            error:'name must be unique'
        })
    }
    const newPerson = {
        id:generateId(),
        name:body.name,
        number:body.number
    }
    persons = [...persons,newPerson]
    
    res.status(201).json(newPerson)
})

  

app.listen(3001)