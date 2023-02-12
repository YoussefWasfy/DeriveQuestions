import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    articleId: { type: String, unique: true, index: { unique: true } },
    articleName: String,
    articleText: String,
    questions: [String],
  },
  { collection: 'articles' }
)

export const Document = mongoose.model('Document', schema)

export default { Document }
