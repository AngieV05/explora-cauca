import mongoose, { Schema, type Document } from "mongoose"

export interface IUserPreferences extends Document {
  userId: mongoose.Types.ObjectId
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    activityVisible: boolean
  }
  preferences: {
    language: string
    theme: string
    region: string
  }
  createdAt: Date
  updatedAt: Date
}

const UserPreferencesSchema = new Schema<IUserPreferences>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
      sms: { type: Boolean, default: false },
    },
    privacy: {
      profileVisible: { type: Boolean, default: true },
      activityVisible: { type: Boolean, default: false },
    },
    preferences: {
      language: { type: String, default: "es" },
      theme: { type: String, default: "system" },
      region: { type: String, default: "cauca" },
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
UserPreferencesSchema.index({ userId: 1 })

export default mongoose.models.UserPreferences ||
  mongoose.model<IUserPreferences>("UserPreferences", UserPreferencesSchema)
