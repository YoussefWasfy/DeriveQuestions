import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  articleId: { type: mongoose.Types.ObjectId },
  articleName: String,
  articleText: String,
  questions: [String],
})

export const Document = mongoose.model('Document', schema)

export default { Document }
