import mongoose from 'mongoose';

const mongoURL = process.env.DATABASE_URL as string;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongoURL);
    console.log(connect.connection.name, connect.connection.host);
  } catch (error: any) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
