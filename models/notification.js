import mongoose from "mongoose";

const notificationSchema=mongoose.Schema({
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'  
    },
    "request":{
        type:mongoose.Schema.Types.ObjectId,
        ref:'request'
    }
})

export const NotificationModel=mongoose.model('notification',notificationSchema)