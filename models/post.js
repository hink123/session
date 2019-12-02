var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

var postSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]

}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);