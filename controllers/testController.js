export const testPostController = (req,res)=>{
    //destructuring
    const {name} = req.body;
    res.status(200).send(`your name is ${name}`); 

}

//export default {testPostController}