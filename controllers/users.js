const User = require('../models/User')
const bcrypt = require('bcrypt')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const createUser = async (req, res, next) => {
	//sanitize input
	const sanitizedInput = dompurify.sanitize(req.body.password)
	//create user and hash password
	try {
		const hashedPass = await bcrypt.hash(sanitizedInput, 10)

		let user = new User({
			name: req.body.name,
			password: hashedPass,
		})
		user = await user.save()
		res.status(201).send()
	} catch (err) {
		next(err)
	}
}

const getUsers = async (req, res, next) => {
	try {
		const users = await User.find()
		res.json({ success: true, data: users })
	} catch (err) {
		next(err)
	}
}

module.exports = { createUser, getUsers }
