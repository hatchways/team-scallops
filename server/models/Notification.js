const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    sender: {type:mongoose.Schema.Types.ObjectId, ref:'User'}, 
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enum:['serviceRequest', 'serviceAvailable'],
    title: String,
    message: String,
    isRead: Boolean,
    created_at:{type: Date, default: Date.now},
    
});

module.exports =  Notification = mongoose.model('notification', notificationSchema);