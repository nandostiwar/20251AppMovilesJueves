const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define el esquema
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password antes de guardar
adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Define el modelo y especifica el nombre de la colección
const Admin = mongoose.model('Admin', adminSchema, 'admins'); // El tercer argumento ('admins') fuerza el nombre de la colección
module.exports = Admin;