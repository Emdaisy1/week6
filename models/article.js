var mongoose = require('mongoose');

// define the object schema
var articleSchema = new mongoose.Schema( {
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title is required'
    },
    content: {
        type: String,
        default: '',
        trim: true
    }
});

// make this public so the controller can see it
module.exports = mongoose.model('Article', articleSchema);
