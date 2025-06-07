import mongoose, { type Document, Schema } from "mongoose"

export interface IUserSession extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  sessionToken: string
  expiresAt: Date
  createdAt: Date
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
      index: { expireAfterSeconds: 0 }, // MongoDB TTL index
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
UserSessionSchema.index({ userId: 1 })
UserSessionSchema.index({ sessionToken: 1 })

export default mongoose.models.UserSession || mongoose.model<IUserSession>("UserSession", UserSessionSchema)
