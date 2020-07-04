const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const providerSchema = new Schema({
    username:{
        type: String,
        required:true,
        trim: true,
        minlength: 3
    },
    slots:[{date: Date, requester: String, slot_status: {type: Number}}],
    provider_status:{type: Boolean},
},
    {
        timestamps:true,
    
});

const Provider = mongoose.model('Seller', providerSchema);

module.exports = Provider;