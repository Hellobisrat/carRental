import User from "../models/User.js";


export const changeRoleToOwner = async (req,res)=>{
  try {
    const {_id}=req.user;
    await User.findByIdAndUpdate(_id,{role:"owner"})
    res.json({success:true,message:"Now you can list cars"})
  } catch (error) {
    console.log(error);
    res.json({sucess:false,message:error.message})
  }

}

export default addCar = async(req,res)=>{
  try {
    const {_id}=req.user;
    let car = JSON.parse(req.body.carData)
    const imageFile = req.file;
    
  } catch (error) {
    console.log(error);
    res.json({sucess:false,message:error.message})
  }
}