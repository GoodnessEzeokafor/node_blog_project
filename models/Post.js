const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    
    title: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: 'public',
    },
    body: {
        type: String,
        required: true
    },
    file: {
        type: String,
    },

    allowComments:{
        type: Boolean,
        require: true,
    }

});
module.exports = mongoose.model('Posts',PostSchema);





