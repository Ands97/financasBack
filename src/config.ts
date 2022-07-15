import dotenv from 'dotenv';

dotenv.config()

export default {
    server: {
        port: process.env.PORT || 3000
    },
    db: {
        mongoURL: process.env.MONGO_URL as string
    },
    secret: {
        jwt: process.env.JWT_SECRET_KEY
    }
}