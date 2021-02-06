const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = async (req, res, next) => {
	try {
		const user = await User.findOne({ name: req.body.name })

		if (await bcrypt.compare(req.body.password, user.password)) {
			//create Token
			const accessToken = jwt.sign(
				user.name,
				process.env.ACCESS_TOKEN_SECRET
			)
			res.json({ user: user.name, accessToken: accessToken })
		} else {
			res.send('failed')
		}
	} catch (err) {
		next(err)
	}
}

module.exports = { createToken }
