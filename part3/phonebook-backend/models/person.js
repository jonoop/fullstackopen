const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
  },
  number:{
    type:String,
    minLength:9,
    validate:{
      validator:function(v){
        return /^\d{2,3}-\d{5,}/.test(v)
      },
    }
  }
})

personSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id=returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person',personSchema)

module.exports = Person