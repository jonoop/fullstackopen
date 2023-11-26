const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()

const Person = require('./models/person')


app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

const unknownEndpoint = (req,res)=>{
    res.status(404).send({error:'unknown endpoint'})
}

const errorHandler = (err,req,res,next)=>{
    if(err.name === 'CastError'){
        return res.status(400).send({error:'malformatted id'})
    }else if(err.name === 'ValidationError'){
        return res.status(400).send({error:err.message})
    }
    next(err)
}

app.get('/api/persons',(req,res)=>{
    Person.find({}).then(persons=>{
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                return res.status(200).send(person);
            } else {
                return res.status(404).end();
            }
        })
        .catch(error => {
            next(error);
        });
});

app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    Person.findOne({ name: body.name })
        .then(existingPerson => {
            if (existingPerson) {
                return res.status(400).json({
                    error: 'name must be unique'
                });
            }

            const person = new Person({
                name: body.name,
                number: body.number
            });
            person
                .save()
                .then(savedPerson => {
                    res.json(savedPerson);
                })
                .catch(error => {
                    next(error);
                });
        })
        .catch(error => {
            next(error);
        });
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            if (result) {
                return res.status(204).send(result);
            } else {
                return res.status(400).json({
                    error: 'person not found'
                });
            }
        })
        .catch(error => {
            next(error);
        });
});

app.put('/api/persons/:id',(req,res,next)=>{
    const body = req.body
    const person = {
        name:body.name,
        number:body.number
    }
    Person.findByIdAndUpdate(req.params.id,person,{new:true}).then(updatedPerson=>{
        if(updatedPerson){
            return res.json(updatedPerson)
        }else{
            return res.status(400).json({
                error: "person not found"
            })
        }   
    }).catch(error=>
        next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)  

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})