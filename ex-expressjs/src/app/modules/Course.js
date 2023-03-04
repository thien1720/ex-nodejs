const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    _id : {type : Number, },
    author: ObjectId,
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, required: true, maxLength: 255 },
    level: { type: String  },
    slug:{type: String, slug:'name' , unique: true},
}, {
    _id:false,
    timestamps: true
});




// Add plugin
mongoose.plugin(slug);
Course.plugin(AutoIncrement)

Course.plugin(mongooseDelete , { 
    overrideMethods: 'all' ,
    deletedAt : true
})

module.exports = mongoose.model('Course', Course)