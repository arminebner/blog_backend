const express = require('express')
const api = express.Router()
const Post = require('../../models/Post')
const path = require('path')
const multer = require('multer')
const uploadPath = path.join('public', Post.imageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png']
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadPath)
	},
	fileFilter: function (req, file, cb) {
		cb(null, imageMimeTypes.includes(file.mimetype))
	},
	filename: function (req, file, cb) {
		cb(null, `${file.originalname}`)
	},
})
const upload = multer({ storage: storage })
const {
	getPosts,
	createPost,
	getPostPerSlug,
	deletePostPerId,
	editPost,
} = require('../../controllers/posts')
const authenticateToken = require('../../middleware/authenticator')

api.route('/')
	.get(getPosts)
	.post(
		upload.fields([
			{
				name: 'headerImage',
				maxCount: 1,
			},
			{
				name: 'image1',
				maxCount: 1,
			},
			{
				name: 'image2',
				maxCount: 1,
			},
			{
				name: 'image3',
				maxCount: 1,
			},
			{
				name: 'image4',
				maxCount: 1,
			},
		]),
		createPost
	)

api.route('/:slug').get(getPostPerSlug)

api.route('/delete/:id').delete(authenticateToken, deletePostPerId)

api.route('/edit/:id').put(authenticateToken, editPost)

module.exports = api
