const mongoose = require('mongoose')
const express = require('express')
const Todo = require('./Model')
const app = express()

mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/react_todolist'), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
}).catch(console.log)

app.use(express.json())

app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', '*')
  res.set('Access-Control-Allow-Headers', '*')
  res.set('Access-Control-Expose-Headers', '*')
  res.set({ 'Content-Type': 'application/json' })
  next()
})

app.get('/', (_req, res) => res.json({ success: true }))

app
  .route('/todo')
  .get(async (_req, res) => {
    const todos = await Todo.find()
    res.json(todos)
  })
  .post(async (req, res) => {
    try {
      const { id, title, description } = req.body
      const todo = new Todo({ _id: id, title, description, done: false })
      console.log(req)
      await todo.save()
      res.status(201).json(todo)
    } catch (e) {
      res.json(e)
    }
  })

app
  .route('/todo/:id')
  .delete(async (req, res) => {
    try {
      const { id } = req.params
      await Todo.findByIdAndDelete(id)
      res.sendStatus(204)
    } catch (e) {
      res.status(404).json(e)
    }
  })
  .patch(async (req, res) => {
    try {
			const { id } = req.params
      const todo = await Todo.findById(id)
      await todo.update({ done: !todo.done })
			res.sendStatus(204)
		} catch (e) {
			res.status(404).json(e)
		}
  })

app.listen(process.env.PORT || 3001, () => console.log('Working API'))
