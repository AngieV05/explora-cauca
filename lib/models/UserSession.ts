import mongoose, { Schema, type Document } from "mongoose"

export interface IUserSession extends Document {
  userId: mongoose.Types.ObjectId
  sessionToken: string
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

const UserSessionSchema = new Schema<IUserSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // TTL index
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
UserSessionSchema.index({ sessionToken: 1 })
UserSessionSchema.index({ userId: 1 })

export default mongoose.models.UserSession || mongoose.model<IUserSession>("UserSession", UserSessionSchema)
