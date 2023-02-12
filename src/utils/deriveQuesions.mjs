import dotenv from 'dotenv'
import axios from 'axios'
import nlp from 'compromise'

dotenv.config()

const getRandomInt = (max) => Math.floor(Math.random() * max)

function removeDuplicates(array) {
  return Array.from(new Set(array))
}
const getTagsAndCategories = (article) => {
  const tags = article.tags
  const categories = article.categories
  const tagsAndCategoriesArray = []
  tags.forEach((tag) => {
    tagsAndCategoriesArray.push(tag.name)
  })
  categories.forEach((category) => {
    tagsAndCategoriesArray.push(category.name)
  })

  return tagsAndCategoriesArray
}

const generateQuestions = (article, tags) => {
  const doc = nlp(article.searchContent)
  const questions = []
  const sentences = doc.sentences().data()
  sentences.forEach((sentenceObj) => {
    const sentence = sentenceObj.text
    if (sentence.includes('?')) questions.push(sentence)
    tags.forEach((tag) => {
      if (sentence.includes(tag)) {
        let question = ''
        switch (getRandomInt(3)) {
          case 0:
            question = `Was ist die Verwendung von ${tag}?`
            break
          case 1:
            question = `Warum ist ${tag} besser als der Konkurrent`
          default:
            question = `Was sind die vorteile von ${tag}`
            break
        }
        questions.push(question)
      }
    })
  })

  return removeDuplicates(questions)
}

export const getQuestions = (article) => {
  const keywords = getTagsAndCategories(article)
  let questions = generateQuestions(article, keywords)
  if (questions.length > 10) questions = questions.slice(0, 10)
  return questions
}
