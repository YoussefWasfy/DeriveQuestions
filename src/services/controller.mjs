import { getQuestions } from '../utils/deriveQuesions.mjs'
import { dbManager } from '../db/db.mjs'

export const saveQuestions = async (articles) => {
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]
    const questions = await getQuestions(article)
    const document = {
      articleId: article._id,
      articleName: article.name,
      articleText: article.searchContent,
      questions,
    }

    await dbManager.insertOne(process.env.DB_NAME, 'articles', document)
  }
}
