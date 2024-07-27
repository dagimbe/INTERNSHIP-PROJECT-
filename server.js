const {app}=require(".")
const connectDB = require("./config/db")
const port=4000
app.listen(port,async()=>{
    connectDB()
    console.log('server is running on port ',port)
}
)