const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req,res) => {
    res.render('clientes/add');
});

router.post('/add', async (req, res) => {
const{ id,nombre,apellido,cuit,direccion,fechNac,departamento,codigo_postal,telefono,jubilado}=req.body;
const newCliente = {id,nombre,
    apellido,
    cuit,
    direccion,
    fechNac,
    departamento,
    codigo_postal,
    telefono,
    jubilado
};
await pool.query('INSERT INTO clientes set ?', [newCliente]);
req.flash('success', 'Cliente guardado correctamente');

res.redirect('/clientes');
});

router.get('/', isLoggedIn, async (req, res, next) => {
    const cliente = await pool.query('SELECT * FROM clientes');
    res.render('clientes/list', { cliente });
});

router.get('/delete/:id', async (req, res) => {
         const { id } = req.params ;
         const preg = confirm("desea eliminar el socio?");
         if (preg){
         await pool.query('DELETE FROM clientes WHERE ID = ?', [id]);
         req.flash('success', 'Cliente eliminado correctamente');
         res.redirect('/clientes');
         }else {
            req.flash('message', 'Cliente no ha podido ser eliminado, intente nuevamente');
             res.redirect('/clientes');
         }
});
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const cli = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    res.render('clientes/edit', {cli: cli[0]});
})
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre,
        apellido,
        cuit,
        direccion,
        fechNac,
        departamento,
        codigo_postal,
        telefono,
        jubilado } = req.body;
    const newCliente = {nombre,
        apellido,
        cuit,
        direccion,
        fechNac,
        departamento,
        codigo_postal,
        telefono,
        jubilado};
    await pool.query('UPDATE clientes set ? WHERE id = ?', [newCliente,id]);
    req.flash('success', 'Cliente modificado correctamente');
    res.redirect('/clientes');   
})
module.exports = router;