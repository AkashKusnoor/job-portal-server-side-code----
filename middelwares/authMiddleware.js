import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// const userAuth = async (req, res, next) => {
//    const authHeader = req.headers.authorization
//    if (!authHeader || !authHeader.startsWith('Bearer')) {
//        next('Auth Failed')
//    }
//    const token = authHeader.split(" ")[1];
//    try {
//        const payload = JWT.verify(token, process.env.JWT_SECRET)
//        req.user = { userId: payload.userId }
//        next();

//    } catch (error) {
//        next('Auth Failed')
//     }
// };


//PROTECTED ROUTES TOKEN BASE
export const requireSignIn = async (req,res,next)=>{
    try {
       const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
       req.user = decode;
       next();
   } catch(error){
     console.log(error)
    }
 
 }



//ADMIN ACCESS
export const isAdmin = async (req,res,next)=>{
    try{
        //  console.log('req',req.user)
        const user = await userModel.findById(req.user.userId)

        // console.log(user)
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized Access'
            }) 
        } else{
            next();
        }
    }catch(error){
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin middleware',    
        })

    }
}

