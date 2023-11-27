const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',(req,res,next) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  }).catch(error => next(error))
}
)

blogsRouter.get('/:id',(req,res,next) => {
  Blog.findById(req.params.id).then(blog => {
    if(blog){
      res.json(blog)
    }else{
      res.status(404).end()
    }
  }).catch(error => next(error))
})

blogsRouter.post('/',(req,res,next) => {
  const blog = new Blog(req.body)
  blog.save().then(result => {
    res.status(201).json(result)
  }).catch(error => next(error))
})

blogsRouter.delete('/:id',(req,res,next) => {
  Blog.findByIdAndDelete(req.params.id).then(result => {
    res.status(204).json(result)
  }).catch(error => next(error))
})

blogsRouter.put('/:id',(req,res,next) => {
  Blog.findByIdAndUpdate(req.params.id,req.body,{ new:true }).then(result => {
    res.json(result)
  }).catch(error => next(error))
})

module.exports = blogsRouter

