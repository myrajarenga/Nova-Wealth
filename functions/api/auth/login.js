import User from '../../models/User.js';
import generateToken from '../../utils/generateToken.js';
import { connectDB } from '../../utils/db.js';
import nodemailer from 'nodemailer';

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

    const { email, password } = await request.json();
    const normalizedEmail = String(email || '').toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await user.matchPassword(password))) {
      if (user.isMfaEnabled) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        user.mfaEmailCode = code;
        user.mfaEmailExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        let sent = false;
        if (env.EMAIL_USER && env.EMAIL_PASS) {
            try {
              const transporter = nodemailer.createTransport({
                host: 'mail.novawealth.co.ke',
                port: 465,
                secure: true,
                auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASS }
              });
              await transporter.sendMail({
                from: env.EMAIL_USER,
                to: user.email,
                subject: 'Your Nova Wealth login code',
                text: `Your login verification code is ${code}. It expires in 10 minutes.`
              });
              sent = true;
            } catch (e) {
              console.error('Email send failed:', e);
              sent = false;
            }
        }

        return new Response(JSON.stringify({ 
            _id: user._id, 
            email: user.email, 
            mfaRequired: true, 
            devCode: sent ? undefined : code 
        }));
      } else {
        return new Response(JSON.stringify({
          _id: user._id,
          name: user.name,
          email: user.email,
          isMfaEnabled: user.isMfaEnabled,
          token: generateToken(user._id, env.JWT_SECRET),
        }));
      }
    } else {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
