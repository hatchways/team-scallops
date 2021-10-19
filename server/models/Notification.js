const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notifications: [{
        type: {
            type: String,
            enum: ['serviceRequest', 'serviceAvailable'], 
        },
        sender: {type:mongoose.Schema.Types.ObjectId, ref:'User'}, 
        title: {type: String},
        message: {type: String},
        isRead: {type: Boolean,default: false},
        created_at:{type: Date, default: Date.now},
    }
        
  ]
    
    
});

module.exports =  Notification = mongoose.model('notification', notificationSchema);