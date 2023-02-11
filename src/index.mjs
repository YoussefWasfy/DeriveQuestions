// const db = require("./db/db");
// const Model = require("./models/document");
import { dbManager } from './db/db.mjs'
import { getArticles } from './services/api.mjs'
import { saveQuestions } from './services/controller.mjs'
import app from './server.mjs'

await dbManager.connect()

const data = await getArticles()
const articles = data.data.articles.Articles
await saveQuestions([articles[0]])

const collection = await dbManager.getCollection(
  process.env.DB_NAME,
  'articles'
)
console.log(collection)

await dbManager.close()
// Start the server
// const port = process.env.PORT || 3000
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`)
// })
