const { Schema, model } = require('mongoose')

const Todo = new Schema({
  _id: String,
  title: String,
  description: String,
  done: Boolean
})

module.exports = model('Todo', Todo)