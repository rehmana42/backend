import { request } from "express"
import { RequestModel } from "../models/requestSchema.js"
import userModel from "../models/userModel.js"
import { NotificationModel } from "../models/notification.js"
import mongoose from "mongoose"
// import { trans } from "../config/mailConfig.js"
import nodemailer from 'nodemailer'



export const sendRequest=async(req,res)=>{
    try{
        const{bloodT,urgency,home,area,city,pincode,unit}=req.body

         const request=await RequestModel.create({
            "userId":req.userId.id,
            "bloodType":bloodT,
            "unitsRequested":unit,
            address: {
                house:home,
                area,
                city,
                pincode
              },
              "urgency":urgency,
})    

   
   const user = await userModel.find({
    bloodType: bloodT,
    _id: { $ne: req.userId.id }
});

        

            for(const e of user){
                const notification=await NotificationModel.create({
                    "user":e._id,
                    "request":request._id,
                   
                })
               request.notification=notification._id
               
            }
            await request.save()
            return res.json({success:true,msg:"successfully submitted"})
        
    }
    catch(e){
        res.json({success:true,error:e.message})
        console.log(e.message)
    }
}

export const getNotification=(async(req,res)=>{
try{
    console.log(req.userId.id)

    const allRequest=await NotificationModel.find({user: req.userId.id}).populate('request');
    res.json({success:true,allRequest})
 
    
   

 


}
catch(e){
    res.json({success:false,error:e.message})
}
})


//accept the reqauest 

export const accept= (async(req,res)=>{
    try{
        const{id}=req.body
        const request=await RequestModel.findOneAndUpdate({_id:id},
            {
                status:"Accepted",
                matchedDonors:req.userId.id
            },
            {new:true}
        ) 
        console.log(request)
       
        res.json({success:true,request})



    }
    catch(e){
        res.json({success:false,error:e.message})
    }
})

export const Delete=( async(req,res)=>{
        try{
           const {id}=req.body
           console.log("aur bol bc ")
           console.log(id)
           const n=await NotificationModel.findOneAndDelete({request:id})
           console.log(n)
           res.json({success:true,error:"rejected"})
        }
        catch(e){
            res.json({success:false,error:e.message})
        }
})



export const userbloodRequest=(async(req,res)=>{
    try{
    const request=await RequestModel.find({"userId":req.userId.id}).populate("matchedDonors")
    // const request=Arequest.map(e=>e.matchedDonors).flat()
    // console.log(request)
    res.json({success:true, request})
    }
    catch(e){
        req.json({success:false,error:e.message})
    }
})

// const trans = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD
//     }
//   });
  
//delete blood request

export const deleteRequest=(async(req,res)=>{
    try{
        const {id}=req.body
        if(!id){
            console.log("id not found ")
        }
        console.log('bhai')
        console.log(id)
        const notification=await NotificationModel.findOne({"request":id}).populate('user')
        console.log(notification._id)
        console.log(process.env.EMAIL)
        console.log(process.env.PASSWORD)
        
        console.log(notification.user.email)

        // const mailOption={
        //     from: process.env.EMAIL,
        //     to: "ak6935846@gmail.com", // dealer's email
        //     subject: "Bid Accepted - Pickup Details",
        //     html: `
        //       Blood donated successfull '
        //     `
        //   }
          
        //  await trans.sendMail(mailOption)

        await RequestModel.findOneAndDelete({_id:id});
       

        await NotificationModel.findOneAndDelete({_id:notification._id})
        return res.json({success:true,msg:" Donated successfully"})

    }catch(e){
        console.log(e.message)
        return res.json({success:false,error:e.message})

    }
})

