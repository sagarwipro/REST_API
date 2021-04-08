
const {create,getUserById,getUsers,deleteUser,updateUser,getUserByEmail}=require("./user.service");
//We are using encryption so we have to install bcrypt and need to import that
//to create token we must install jsonwebtoken.
const {genSaltSync,hashSync,compareSync}=require('bcrypt');//compareSync is used to match password.
const { sign }=require("jsonwebtoken");

module.exports={
createUser:(req,res)=>{
    console.log("At UserController and operation is create "+req.body);
        const body=req.body;
        const salt = genSaltSync(10); //generating salt 10 times but for this we have to install bcrypt
        body.password=hashSync(body.password,salt); //now it will encrypt the password.
        console.log("body",body);
        create(body,(err,results)=>{
            if (err){
                console.log("error",err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error."
                });
            }else{
                console.log(results)
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });
},
getUserById:(req,res)=>{
    console.log("At UserController and operation is getUserById and ID is  "+req.params.id);
const id=req.params.id;
getUserById(id,(err,results)=>{
        if(err){
            console.log(err);
            return;
        }
        if(!results){
            return res.json({
                succes:0,
                message:"record not found"
            });
        }
        else{
            return res.json({
                succes:1,
                data:results
            });
        }
});
},
updateUser:(req,res)=>{
    console.log("At UserController and operation is updateUser "+req.body);
    const body=req.body;
    console.log("body",body);
    updateUser(body,(err,results)=>{
        if (err){
            console.log("error",err);
            return res.status(500).json({
                success:0,
                message:"Database connection error."
            });
        }else{
            console.log(results)
        }
        return res.status(200).json({
            success:1,
            data:results
        });
    });
},
deleteUser:(req,res)=>{
    console.log("At UserController and operation is deleteUser and ID is  "+req.params.id);
    const id=req.params.id;
    deleteUser(id,(err,results)=>{
        if(err){
            console.log(err);
            return;
        }
        if(!results){
            return res.json({
                success:0,
                message:"No record found to be deleted."
            });
        }
        else{
            return res.json({
                success:1,
                data:results
            });
        }
    });
},
getUsers:(req,res)=>{
    getUsers((err,results)=>{
        if(err){
            console.log(err);
            return;
        }
        if(!results){
            return res.json({
                success:0,
                message:"No record found"
            });
        }
        else{
            console.log("At UserController and operation is getUsers "+results);
            return res.json({
                success:1,
                data:results
            });
        }
    });
},
login:(req,res)=>{
    const body=req.body;
    getUserByEmail(body.email,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(!results){
            return res.json({
                success:0,
                message:"Invalid Email or password."
            });
        }
 
        const result=compareSync(body.password,results.password);
        console.log("body password is "+body.password +" and results password is "+results.password);
        console.log("We compared password via compareSync on UserController and result is "+result);
        if(result){
            results.password=undefined;
            const jsontoken = sign({
                result:results
            },
            process.env.TOKENKEY,
            {
                expiresIn:"1h"
            });
            return res.json({
                success:1,
                message:"Login Successfully!!!",
                token:jsontoken
            });
        }
        else{
            return res.json({
                success:0,
                data:"Invalid Email or Password."
            });
        }
    });
}
}