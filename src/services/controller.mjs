import { getQuestions } from '../utils/deriveQuesions.mjs'
import { dbManager } from '../db/db.mjs'

export const saveQuestions = async (articles) => {
  await articles.forEach(async (article) => {
    const questions = await getQuestions(article)
    const document = {
      articleId: article._id,
      articleName: article.name,
      articleText: article.searchContent,
      questions,
    }

    await dbManager.insertOne(process.env.DB_NAME, 'articles', document)
  })
}
