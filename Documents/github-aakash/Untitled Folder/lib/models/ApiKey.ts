import mongoose, { Schema, Document } from 'mongoose'

export interface IApiKey extends Document {
  userId: mongoose.Types.ObjectId
  name: string
  hash: string
  masked: string
  createdAt: Date
}

const ApiKeySchema = new Schema<IApiKey>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  hash: { type: String, required: true },
  masked: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

ApiKeySchema.index({ userId: 1 })
ApiKeySchema.index({ hash: 1 }, { unique: true })

export const ApiKey = mongoose.models.ApiKey || mongoose.model<IApiKey>('ApiKey', ApiKeySchema)
