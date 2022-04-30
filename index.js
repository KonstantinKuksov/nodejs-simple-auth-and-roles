import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:41452376@cluster0.1ounp.mongodb.net/auth_roles?retryWrites=true&w=majority');
        app.listen(PORT, () => {
          console.log(`Server has been started on port ${PORT}`);
        });
    } catch (e) {
      console.log(e);
    }
}

start();
