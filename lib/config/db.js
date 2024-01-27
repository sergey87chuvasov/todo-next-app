import mongoose from 'mongoose';

export const ConnectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://sergetechno:stereox87@cluster0.f0cvljo.mongodb.net/todo-app'
  );
  console.log('DB Connected');
};
