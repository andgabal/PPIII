const passport=require('passport');
const localStategy=require('passport-local').Strategy;
const user = require('../models/usuarios');
passport.use(new localStategy({
    usernameField: 'email'},
    async (email,password,done)=>{
    const user = await user.findOne({email: email});
    if(!user){
        return done(null, false, {message: 'No hay un usuario con ese Usuario'});
    } else{
        const match = await user.matchPassword(password);
        if(match){return done (null, user);
        }else {return done(null, false,{message: 'Contraseña Incorrecta'});}
    }
}));
passport.serializeUser((user, done)=>{
    done(null, user._id);
});
passport.deserializeUser((id, done)=>{
    user.findById(id, (err,user)=>{
        done(err,user);
    });
});