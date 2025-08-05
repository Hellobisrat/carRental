import User from "../models/User.js";
import Car from "../models/Car.js";

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
    await Car.create({...car,owner:_id,image})
    
  } catch (error) {
    console.log(error);
    res.json({sucess:false,message:error.message})
  }
}

export const getOwnerCars = async (req,res)=>{
  try {
    const {_id}=req.user;
    const cars = await Car.find({owner:_id})
    res.json({sucess:true,cars})
  } catch (error) {
    res.json({success:false,message:error.message});
    
  }
}

export const toggleCarAvailability = async(req,res)=>{
  try {
    const {_id}=req.user;
    const {carId} =req.body
    const car = await Car.findById(carId)
    if(car.owner.toString()!==_id.toString()){
      return res.json({success: false, message:"Unauthorized"})
    }
    car.isAvaliable =!car.isAvaliable;
    await car.save();
    res.json({sucess:true,message:'Availablity toggled'})
  } catch (error) {
    res.json({success:false,message:error.message});
    
  }
}

export const deleteCar = async(req,res)=>{
  try {
    const {_id}=req.user;
    const {carId} =req.body
    const car = await Car.findById(carId)
    if(car.owner.toString()!==_id.toString()){
      return res.json({success: false, message:"Unauthorized"})
    }
    car.owner =null;
    car.isAvaliable = false
    await car.save();
    res.json({sucess:true,message:'Car Removed'})
  } catch (error) {
    res.json({success:false,message:error.message});
    
  }
}

export const getDashboardData = async (req,res)=>{
  try {
    const {_id,role}=req.user;
    if(role !== "owner"){
      return res.json({success:false,message:"unauthorized"})
    }
    const cars = await Car.find({owner:_id})
    
  } catch (error) {
     res.json({success:false,message:error.message});
    
    
  }
}