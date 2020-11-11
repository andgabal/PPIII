const bcrypt = require ('bcryptjs');
const express = require('express');
const helpers = {};


helpers.encryptPassword = async (password) => {
   const salt = await bcrypt.getSalt(20);
   const hash = await bcrypt.hash(password, salt);
   return hash;
};

helpers.matchPassword = async (password, savedPassword) => {

    try {
       return await bcrypt.compare(password, savedPassword);
    } catch (express) {
        console.log(express);
    }
}
module.exports = helpers;