const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
}

const password = process.argv[2]

const url =`mongodb+srv://jon:${password}@jonoop0.gae9acx.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name:String,
  number:String
})

const Person = mongoose.model('Person',personSchema)

if(process.argv.length === 5)
{
  const person = new Person({
    name:process.argv[3],
    number:process.argv[4]
  })

  person.save().then(
    result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)

      mongoose.connection.close()
    }
  )
} else {

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })

    mongoose.connection.close()
  })
}

