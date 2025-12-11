import User from '../../models/User';
import generateToken from '../../utils/generateToken';
import { connectDB } from '../../utils/db';

export const onRequestPost = async (context) => {
  const { request, env } = context;

  try {
    // Connect to DB
    if (env.MONGO_URI) {
      const dbPromise = connectDB(env.MONGO_URI);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timed out')), 15000)
      );
      await Promise.race([dbPromise, timeoutPromise]);
    }

    const { name, email, password, phoneNumber } = await request.json();
    const normalizedEmail = String(email || '').toLowerCase().trim();

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      phoneNumber,
    });

    if (user) {
      return new Response(JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        isMfaEnabled: user.isMfaEnabled,
        token: generateToken(user._id, env.JWT_SECRET),
      }), { status: 201 });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid user data' }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
