const pool=require("../../config/database");

module.exports={
create:(data,callback)=>{
    console.log("At UserService and operation is create : "+data);
        const {first_name,last_name}=data;
        console.log(first_name);

    pool.query('insert into registration (firstName,lastName,gender,email,password,number) value(?,?,?,?,?,?)',
    [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
    ],(error,results,fields)=>{
        if(error){
            return callback(error);
        }
            return callback(null,results);
    }
    );
},
getUsers:callback=>{
    console.log("At UserService and operation is getAllUsers.");
pool.query(`select id,firstName,lastName,gender,email,number from registration`,[],

(error,results,fields)=>{
    if(error){
        return callback(error);
    }
    return callback(null,results);
});
},
getUserById:(id,callback)=>{
    console.log("At UserService and operation is getUserById for ID "+id);
    pool.query(`select id,firstName,lastName,gender,email,number from registration where id=?`,[id],
    (error,results,fields)=>{
        if(error){
            return callback(error);
        }
        return callback(null,results[0]);
    });
},
updateUser:(data,callback)=>{
    console.log(data);
    pool.query(`update registration set firstName=?,lastName=?,gender=?,email=?,number=? where id=${data.id}`,
    [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.number
    ],
    (error,results,fields)=>{
        if(error){
            return callback(error);
        }
        return callback(null,results[0]);
    });
},
deleteUser:(id,callback)=>{
    console.log("At UserService and operation is delete for ID "+id);
    pool.query(
        `delete from registration where id=?`,[id],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results[0]);
        });
},
getUserByEmail:(email,callback)=>{
    console.log("At UserService and operation is getUserByEmail for EMAIL "+email);
    pool.query(`select * from registration where email=?`,[email],
    (err,results,fields)=>{
        if(err){
            console.log(err);
            callback(err);
        }
        console.log(results);
        return callback(null,results[0]);
    });
}
};

