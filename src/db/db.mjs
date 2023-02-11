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
      console.error('Error connecting to MongoDB:', error)
    }
  }

  getDb(dbName) {
    return this.client.db(dbName)
  }

  async insertOne(dbName, collectionName, document) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      await collection.insertOne(document)
      console.log('Document inserted successfully.')
    } catch (error) {
      console.error('Error inserting document:', error)
    }
  }
  async getCollection(dbName, collectionName) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      const results = await collection.find({}).toArray()
      console.log('Collection retrieved successfully.')
      return results
    } catch (error) {
      console.error('Error retrieving collection:', error)
    }
  }

  async findOne(dbName, collectionName, query) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      const result = await collection.findOne(query)
      console.log('Document found successfully.')
      return result
    } catch (error) {
      console.error('Error finding document:', error)
    }
  }

  async updateOne(dbName, collectionName, query, update) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      await collection.updateOne(query, update)
      console.log('Document updated successfully.')
    } catch (error) {
      console.error('Error updating document:', error)
    }
  }

  async deleteOne(dbName, collectionName, query) {
    try {
      const db = this.getDb(dbName)
      const collection = db.collection(collectionName)
      await collection.deleteOne(query)
      console.log('Document deleted successfully.')
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  async close() {
    try {
      await this.client.close()
      console.log('Successfully disconnected from MongoDB.')
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error)
    }
  }
}

export const dbManager = new DbManager(process.env.DB_URI)
