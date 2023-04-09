const connectToMongo=require('./db');
const cors=require('cors');
connectToMongo();   
const express = require('express')
const app = express()
const port = process.env.port||5000;
const path=require("path")
app.use(cors());
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
////////////////severing the fornted////////////
app.use(express.static(path.join(__dirname,'./inotebook/build')))
app.get("*",(req,res)=>{
  res.sendFile(
    path.join(__dirname,"./inotebook/build/index.html"),
    function(err){
      res.status(500).send(err);
    }
  )
})
app.listen(port, () => {
  console.log(`inotebook app listening on port ${port}`)
})