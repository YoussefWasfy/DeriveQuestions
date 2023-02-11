import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'
import axios from 'axios'

const CHATGPT_URL = 'https://api.openai.com/v1/completions'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: 'org - nCH1DnOgTlnbmDznewnxn6lL',
})

const getRandomInt = (max) => Math.floor(Math.random() * max) + 1

const generateQuestionOpenApi = async (article) => {
  const axiosConfig = {
    method: 'post',
    url: CHATGPT_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
    },
    data: {
      model: 'text-davinci-003',
      prompt: `Given the following article, generate question relevant to the article:\n${article}`,
    },
  }

  const resp = await (await axios(axiosConfig)).data
  const question = resp.choices[0].text
  return question
}
function removeUnwantedString(questions) {
  return questions.map((question) => {
    return question.replace(/^\n\n\n1\./g, '').trim()
  })
}

export const getQuestions = async (article) => {
  const questions = []
  const numberOfQuestions = getRandomInt(10)
  for (let index = 0; index < Math.ceil(numberOfQuestions / 2); index++) {
    try {
      const question = await generateQuestionOpenApi(article.searchContent)
      questions.push(`${question.split('.').at(-1)}?`)
    } catch (error) {
      console.log(error)
    }
  }
  return questions
}
