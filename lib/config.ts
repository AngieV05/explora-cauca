export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/explora-cauca",
  },
  auth: {
    sessionDuration: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  },
}
