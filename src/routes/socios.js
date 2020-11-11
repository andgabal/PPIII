const { route } = require('.');

const router= require('express').Router();
const socio=require('../models/soc');

router.get('/socios', async(req, res)=>{
    const socios= await socio.find();
    res.render('socios/socioslist', {socios});
});
router.post('/socios/new-socio', async (req,res)=>{
 const {socioName, sociodni, sociodomcall, sociodomnum, socionum, sociofdn}=req.body;
 const errors=[];
 if(!socioName){
     errors.push({text: 'por favor ingrese un Nombre y Apellido'});
 }
 if(!sociodni){
     errors.push({text: 'por favor ingrese un Número de Documento'});
 }
 if(!sociodomcall){
     errors.push({text: 'por favor ingrese el Nombre de la calle del Domicilio'});
 }
 if(!sociodomnum){
     errors.push({text: 'por favor ingrese el Número de la calle del Domicilio'});
 }
 if(!socionum){
     errors.push({text: 'por favor ingrese un Número de teléfono fijo o Celular'});
 }
 if(!sociofdn){
     errors.push({text: 'por favor ingrese una Fecha de Nacimiento'});
 }
 if(errors.length>0){
    res.render('socios/new-socio',{
        errors,
        socioName,
        sociodni,
        sociodomcall,
        sociodomnum,
        socionum,
        sociofdn
    })
} else{ 
const newSocio = new socio({socioName,sociodni,sociodomcall,sociodomnum,socionum,sociofdn});
await newSocio.save();
req.flash('success_msg', 'socio agregado con éxito')
res.redirect('/socios');
}
});

router.get('/addsocio',(req, res)=>{
    res.render('socios/new-socio');
});

router.get('socio/edit/:id',async (req, res)=>{
   const socid= await socios.findById(req.params.id);
    res.render('/src/views/socios/edit-socio', {socid});
});

router.put('/socios/edit-socio/:id', async (res,req)=>{
   const {socioName,sociodni,sociodomcall,sociodomnum,socionum,sociofdn}= req.body;
   await socios.findByIdAndUpdate(req.params.id, {socioName,sociodni,sociodomcall,sociodomnum,socionum,sociofdn});
   req.flash('success_msg', 'Socio Modificado Correctamente')
   res.redirect('/socios');
});
router.delete('/socios/delete/:id', async (req, res)=>{
   await socios.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Socio Eliminado Correctamente');
   res.redirect('/socios');
});
module.exports=router;