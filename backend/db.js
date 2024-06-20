const mongoose=require('mongoose');
const mongourl = "mongodb://127.0.0.1:27017/inotebook?directConnection=true"

const connecttomongo =()=>{
    mongoose.connect(mongourl).then(()=>console.log("Connected")).catch((e)=>console.log(e.message))

}

module.exports=connecttomongo;