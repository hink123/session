var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String
    }
}, 
{
    timestamps: true
})

var postSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    time: {
        type: String
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String
    },
    comments: [commentSchema],
    day: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);