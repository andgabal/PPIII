const mongoose=require('mongoose');
const {Schema}=mongoose;

const socSchema= new Schema({
        socioName:{type:String,required:true},
        sociodni:{type:Number,required:true},
        sociodomcall:{type:String,required:true},
        sociodomnum:{type:Number,required:true},
        socionum:{type:Number,required:true},
        sociofdn:{type:Date,required:true},
        date: {type:Date, default:Date.now}
});
module.exports=mongoose.model('Socio', socSchema);