import mongoose, { Mongoose } from "mongoose";

const requestSchema =mongoose.Schema({
    

  
  "userId": {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  "bloodType":{
    type:String,
    enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"]
} ,
  "unitsRequested": Number,
  address: {
    house: { type: String },   // House no. / Street
    area: { type: String, },    // Locality / Area
    city: { type: String},    // City
    pincode: { type: String  }  // Pincode
  },

  
  "urgency":{
    type:String,
    enum:["low","medium","high"]
  },
  "status":{
    type:String,
    enum:["Accepted","Reject"]
  },
  "notification":{
    type:mongoose.Schema.Types.ObjectId,
    ref:"notification"
  },
 
  "matchedDonors": [{ 
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   }],
 
  "createdAt": Date
}
)
export const RequestModel=mongoose.model('request',requestSchema)