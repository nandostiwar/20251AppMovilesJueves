const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define el esquema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Define el modelo y especifica el nombre de la colección
const User = mongoose.model('User', userSchema, 'users'); // El tercer argumento ('users') fuerza el nombre de la colección
module.exports = User;