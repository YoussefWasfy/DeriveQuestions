import mongodb from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

class DbManager {
  constructor(uri) {
    this.uri = uri
    this.client = new mongodb.MongoClient(uri, { useNewUrlParser: true })
  }

  async connect() {
    try {
      await this.client.connect()
      console.log('Successfully connected to MongoDB.')
    } catch (error) {
      throw new Error(error)
    }
  }

  getDb(dbName) {
    return this.client.db(dbName)
  }

  async insertOne(dbName, collectionName, document) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      const existingDocument = await collection.findOne({
        articleId: document.articleId,
      })
      if (existingDocument) {
        console.log(
          `Article with articleId '${document.articleId}' already exists in the database.`
        )
        return
      }
      await collection.insertOne(document)
      console.log('Document inserted successfully.')
    } catch (error) {
      throw new Error(error)
    }
  }
  async getCollection(dbName, collectionName) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      const results = await collection
        .find({}, { projection: { _id: 0 } })
        .toArray()
      console.log('Collection retrieved successfully.')
      return results
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(dbName, collectionName, query) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      const result = await collection.findOne(query)
      if (!result) throw new Error('Not found')
      console.log('Document found successfully.')
      return result
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateOne(dbName, collectionName, query, update) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      await collection.updateOne(query, update)
      console.log('Document updated successfully.')
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteOne(dbName, collectionName, query) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      await collection.deleteOne(query)
      console.log('Document deleted successfully.')
    } catch (error) {
      throw new Error(error)
    }
  }

  async close() {
    try {
      await this.client.close()
      console.log('Successfully disconnected from MongoDB.')
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const dbManager = new DbManager(process.env.DB_URI)
