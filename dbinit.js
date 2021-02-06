const mongoose = require('mongoose')

const connectDB = async () => {
	const options = {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
	}

	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, options)
		console.log(`Mongo DB connected to: ${conn.connection.host}`)
	} catch (err) {
		console.log(err + ' -> Could not connect to DB, retry...')
		connectDB()
	}
}

module.exports = connectDB
