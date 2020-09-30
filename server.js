const express=require('express');
const bodyParser=require('body-parser')
const multer = require('multer')
const path = require('path')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))
app.get('/',(req,res)=>{
    title="Submit your data"
    res.render('home',{title:title})
})

var storage=multer.diskStorage({
    destination:"./public/upload",
    filename:function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname) )
    }
})

var upload=multer({storage:storage,limits: { fileSize: 1000000 },  
}).single('avatar')

// fileFilter: function (req, file, cb) {
//     if (path.extname(file.originalname) !== '.pdf') {
//       return cb(new Error('Only pdfs are allowed'))
//     }

//     cb(null, true)
//   }


app.post('/',(req,res)=>{
    upload(req, res, function (err) {
        if (err) {
         res.render('uploaded',{error:err})
        } else  {
            console.log(req.file)
            img='/upload/'+req.file.filename;
            res.render('uploaded',{error:"",img:img})
            
        }
    
      
      })
    })


    






app.listen(3000,()=>console.log("Server started at 3000"))