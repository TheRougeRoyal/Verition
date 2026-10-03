import mongoose from 'mongoose'
import dbConnect from './mongodb'
import { User } from './models/User'
import { ApiKey } from './models/ApiKey'

export async function getDocById(collectionName: string, id: string) {
  await dbConnect()
  const Collection = mongoose.model(collectionName)
  return await Collection.findById(id).lean()
}

export async function getDocsByQuery(collectionName: string, query: any = {}) {
  await dbConnect()
  const Collection = mongoose.model(collectionName)
  return await Collection.find(query).lean()
}

export async function createDoc(collectionName: string, data: any) {
  await dbConnect()
  const Collection = mongoose.model(collectionName)
  const doc = new Collection(data)
  await doc.save()
  return doc.toObject()
}

export async function updateDocById(collectionName: string, id: string, data: any) {
  await dbConnect()
  const Collection = mongoose.model(collectionName)
  return await Collection.findByIdAndUpdate(id, data, { new: true }).lean()
}

export async function deleteDocById(collectionName: string, id: string, data: any) {
  await dbConnect()
  const Collection = mongoose.model(collectionName)
  return await Collection.findByIdAndDelete(id).lean()
}
