module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGODB: process.env.MONGODB_URI || 'mongodb+srv://prajval:prajval123@cluster0-vwiws.mongodb.net/test?retryWrites=true&w=majority'
}