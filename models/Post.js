const mongoose = require('mongoose')
const slugify = require('slugify')
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const Schema = mongoose.Schema

const imageBasePath = 'uploads/images'

const PostSchema = new Schema({
	headerImage: {
		type: String,
		required: true,
	},
	image1: {
		type: String,
	},
	image2: {
		type: String,
	},
	image3: {
		type: String,
	},
	image4: {
		type: String,
	},
	title: {
		type: String,
		required: true,
	},
	short_description: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		default: 'Armin Ebner',
	},
	markdown1: {
		type: String,
		required: true,
	},
	markdown2: {
		type: String,
	},
	markdown3: {
		type: String,
	},
	markdown4: {
		type: String,
	},
	markdown5: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	sanitizedHTML1: {
		type: String,
		required: true,
	},
	sanitizedHTML2: {
		type: String,
	},
	sanitizedHTML3: {
		type: String,
	},
	sanitizedHTML4: {
		type: String,
	},
	sanitizedHTML5: {
		type: String,
	},
	last_updated: {
		type: Date,
		default: null,
	},
	headerImagePath: {
		type: String,
		required: true,
	},
	image1Path: {
		type: String,
	},
	image2Path: {
		type: String,
	},
	image3Path: {
		type: String,
	},
	image4Path: {
		type: String,
	},
})

PostSchema.pre('validate', function (next) {
	if (this.title) {
		this.slug = slugify(this.title, { lower: true, strict: true })
	}
	if (this.markdown1) {
		this.sanitizedHTML1 = dompurify.sanitize(marked(this.markdown1))
	}
	if (this.markdown2) {
		this.sanitizedHTML2 = dompurify.sanitize(marked(this.markdown2))
	}
	if (this.markdown3) {
		this.sanitizedHTML3 = dompurify.sanitize(marked(this.markdown3))
	}
	if (this.markdown4) {
		this.sanitizedHTML4 = dompurify.sanitize(marked(this.markdown4))
	}
	if (this.markdown5) {
		this.sanitizedHTML5 = dompurify.sanitize(marked(this.markdown5))
	}
	if (this.headerImage) {
		this.headerImagePath = `https://content.arminebner.com/${imageBasePath}/${this.headerImage}`
	}
	if (this.image1) {
		this.image1Path = `https://content.arminebner.com/${imageBasePath}/${this.image1}`
	}
	if (this.image2) {
		this.image2Path = `https://content.arminebner.com/${imageBasePath}/${this.image2}`
	}
	if (this.image3) {
		this.image3Path = `https://content.arminebner.com/${imageBasePath}/${this.image3}`
	}
	if (this.image4) {
		this.image4Path = `https://content.arminebner.com/${imageBasePath}/${this.image4}`
	}
	/* if (this.imageNames) {
		//loop
		this.imageNames.forEach(imageName => {
			imageName.imagePath = `http://192.168.178.28:5000/${imageBasePath}/${imageName.originalname}`
		})
		//this.imagePath = `http://192.168.178.28:5000/${imageBasePath}/${this.headerImageName`
	} */
	next()
})

/* PostSchema.virtual('headerImagePath').get(function () {
	if (this.headerImage != null) {
		return path.join('/', imageBasePath, this.headerImageName)
	}
}) */

module.exports = mongoose.model('Post', PostSchema)
module.exports.imageBasePath = imageBasePath
