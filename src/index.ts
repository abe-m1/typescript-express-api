import mongoose from 'mongoose';
import { formatDiagnostic } from 'typescript';
import { app } from './app';

const port: string | number = process.env.PORT || 5000;

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined')
  }
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('connected')
  } catch (err) {
    console.log(err)
  }

  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });
}

start()
