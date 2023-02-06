const express=require('express');
const router=express.Router();

router.get('/', (req,res)=>{
    res.render("index",{
        titulo:"titulo dinamico"
    })
})

router.get('/servicios',(req, res)=>{
    res.render("servicios",{tituloSer: "servowo"})
})

module.exports=router;