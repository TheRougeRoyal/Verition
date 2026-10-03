import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  name?: string
  passwordHash: string
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: { type: String, trim: true },
  passwordHash: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
})

// Ensure unique index is created
UserSchema.index({ email: 1 }, { unique: true })

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
