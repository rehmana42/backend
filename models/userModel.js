import mongoose from "mongoose";

const userSchema= mongoose.Schema(
    {
        "name": String,
        "email":String,
        "password":String,
        "phone": String,
        "role": {
            type:String,
            enum:["donor" ,"recipient"   ]
        }
         ,
        "bloodType":{
            type:String,
            enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"]
        } ,
        "lastDonationDate": Date,
        "availability":{
            type:String,
            enum:['Available', 'not Available'],
        },
        address: {
            house: { type: String },   // House no. / Street
            area: { type: String, },    // Locality / Area
            city: { type: String},    // City
            pincode: { type: String  }  // Pincode
          },
        
        reqId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'request'
        },

        //  "notification":{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"notification"
        //   },
      }
)
const  userModel=mongoose.model('user',userSchema);
export default userModel