const  mongoose  = require("mongoose");

const orderItemsSchema=mongoose.Schema({
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food"
    },
    quantity:Number,
    ingredients:[String],
    totalPrice:Number 

})
const OrderItem=mongoose.model("OrderItem",orderItemsSchema)

module.exports=OrderItem;