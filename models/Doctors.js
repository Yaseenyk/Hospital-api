const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
    required:true,
    },
});

doctorSchema.pre('save',async function (next){
    try{
        const password = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,password);
        this.password = hashedPassword;
        next();
    }catch(error){
        next(error)
    }
})

const Doctor = mongoose.model("Doctor",doctorSchema);

module.exports = Doctor;