import express from 'express'
import { dbManager } from './db/db.mjs'

const app = express()

app.get('/articles', async (req, res) => {
  try {
    const articles = await dbManager.getCollection(
      process.env.DB_NAME,
      'articles'
    )

    res.send(articles)
  } catch (error) {
    res.sendStatus(500)
  }
})

app.get('/articles/:id', async (req, res) => {
  const id = req.params.id
  try {
    const article = await dbManager.findOne(process.env.DB_NAME, 'articles', {
      articleId: id,
    })
    delete article._id
    res.send(article)
  } catch (error) {
    console.log(error)
    if (error.message === 'Error: Not found') res.sendStatus(404)
    else res.sendStatus(500)
  }
})

export default app
