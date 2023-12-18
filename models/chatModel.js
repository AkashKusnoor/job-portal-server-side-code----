import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User'
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User'
    },
    message:{
        type:String,
        require:true
    }
},
    { timestamps: true }
);

export default  mongoose.model('Chat', chatSchema);
