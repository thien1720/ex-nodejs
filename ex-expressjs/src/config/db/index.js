const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/new_edu_nodejs_dev' ,{
        });

        console.log("connect done")
    }catch (error){
        console.log(error);
    }
}

module.exports = {connect}