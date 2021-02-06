const Post = require('../models/Post')
const jwt = require('jsonwebtoken')

const getPosts = async (req, res, next) => {
	try {
		const posts = await Post.find().sort({
			createdAt: -1,
		})
		res.json({ success: true, msg: 'show all posts', data: posts })
	} catch (err) {
		next(err)
	}
}

const getPostPerSlug = async (req, res, next) => {
	try {
		const { slug } = req.params
		const post = await Post.find({ slug: slug })
		res.json({ success: true, msg: 'show post per slug', data: post })
	} catch (err) {
		next(err)
	}
}

const createPost = (req, res, next) => {
	const processForm = async () => {
		const image1 = req.files.image1 ? req.files.image1[0].originalname : ''
		const image2 = req.files.image2 ? req.files.image2[0].originalname : ''
		const image3 = req.files.image3 ? req.files.image3[0].originalname : ''
		const image4 = req.files.image4 ? req.files.image4[0].originalname : ''

		let post = new Post({
			headerImage: req.files.headerImage[0].originalname,
			image1: image1,
			image2: image2,
			image3: image3,
			image4: image4,
			title: req.body.title,
			short_description: req.body.short_description,
			markdown1: req.body.markdown1,
			markdown2: req.body.markdown2,
			markdown3: req.body.markdown3,
			markdown4: req.body.markdown4,
			markdown5: req.body.markdown5,
		})
		try {
			post = await post.save()
			res.redirect(`http://192.168.178.28:3000/blog/${post.slug}`)
		} catch (err) {
			next(err)
		}
	}
	//check for hidden form field
	if (req.body.token) {
		const authHeader = req.body.token
		const token = authHeader && authHeader.split(' ')[1]
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) return res.sendStatus(403)
			processForm()
		})
	}
}

const editPost = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title, short_description, markdown } = req.body

		let oldPost = await Post.findById(id)
		oldPost.title = title
		oldPost.short_description = short_description
		oldPost.markdown = markdown
		oldPost.last_updated = new Date()
		/*  const { title, short_description, markdown, last_updated } = req.body;
        const post = await Post.findByIdAndUpdate(id, { title, short_description, markdown, last_updated }, { new: true }); */
		const updatedPost = await oldPost.save()
		res.redirect(`http://192.168.178.28:3000/blog/${updatedPost.slug}`)
	} catch (err) {
		next(err)
	}
}

const deletePostPerId = async (req, res, next) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id)
		res.redirect('http://192.168.178.28:3000/blog')
		//res.json({ success: true, msg: 'delete post per id', data: post })
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getPosts,
	getPostPerSlug,
	createPost,
	deletePostPerId,
	editPost,
}
