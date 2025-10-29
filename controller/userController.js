
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


//token function 
const createToken=(id,role)=>{
    return jwt.sign({id},process.env.JWT_SECRATE)
}
//Registor 
export const Registor=async(req,res)=>{
try{
 const {name,email,password}=req.body
 const user= await userModel.findOne({email})
 if(user)return res.json({success:false, error:"user already exist"})
  const salt=await bcrypt.genSalt(10)
  const hash=await bcrypt.hash(password,salt)
  const Newuser= await  userModel.create({
    name,
    email,
    password:hash
  })
  
console.log(Newuser)
const token =createToken(Newuser._id)
console.log(token)
return res.json({success:true, token})


}
catch(e){
    res.json({success:false,error:e.message})
    console.log(e.message)
}
}

//Login

export const Login=async(req,res)=>{
    try{
       const {email,password}=req.body
       console.log(password)
        const user=await userModel.findOne({email})
        if(!user)return res.json({success:false,error:'user not found'})

        else{
            const isMatch=await bcrypt.compare(password,user.password)
            if(isMatch){
                const token=createToken(user._id)
                console.log(token)
               return res.json({success:true,token})
            }
            else{
                res.json({success:false,error:'wrong password'})
            }
        }

        

    }
    catch(e){
        return res.json({success:true, error:e.message})
    }
} 

//set profile
export const setProfile=async(req,res)=>{
    
        // console.log(req.userId.id)
        const {role,phone,bloodT,home,area,city,pincode,availability}=req.body
        console.log(home),
        console.log(phone),
        console.log(bloodT),
        console.log(area),
        console.log(city),
        console.log(pincode),
        console.log(availability)
        const findUser=await userModel.findOne({_id:req.userId.id})

        if(findUser){
            findUser.role=role,
            findUser.phone=phone,
            findUser.bloodType=bloodT,
            findUser.availability=availability,
            findUser.address.house=home,
            findUser.address.area=area,
            findUser.address.city=city,
            findUser.address.pincode=pincode
            await findUser.save()

            res.json({success:true,findUser})
        }
        else{
            res.json({success:true,error:'msg not find '})
        }
    //}
    // catch(e){
    //     res.json({success:true,error:e.message})
    //     // console.log("hii luck");
    //     // console.log(e)
    // }
}


export const getProfile=(async(req,res)=>{
try{
const user=await userModel.findOne({_id:req.userId.id})
return res.json({success:true,user})
}
catch(e){
return res.json({success:true,error:e.message})
}
})