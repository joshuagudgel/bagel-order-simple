import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true, 
    enum: ['customer', 'staff', 'dev'] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  passwordMigrated: { 
    type: Boolean, 
    default: false 
  }
});

const User = mongoose.model('User', userSchema);

export default User;