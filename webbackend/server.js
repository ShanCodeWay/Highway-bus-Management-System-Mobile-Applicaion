// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bcrypt from 'bcrypt';
// import crypto from 'crypto';
// import Joi from 'joi';
// import nodemailer from 'nodemailer';
// import jwt from 'jsonwebtoken';
// import passwordComplexity from 'joi-password-complexity';
// import dotenv from 'dotenv';

// dotenv.config();

// const port = 1337;
// const app = express();
// app.use(express.json());

// // Middleware
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect('mongodb://127.0.0.1:27017/bus_crud', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected to the database successfully');
//   })
//   .catch((error) => {
//     console.error('Error connecting to the database:', error);
//   });

// // Define Token schema
// const tokenSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'user',
//     unique: true,
//   },
//   token: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now, expires: 3600 },
// });

// // Define User schema
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   verified: { type: Boolean, default: false },
// });

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
//     expiresIn: '7d',
//   });
//   return token;
// };

// const User = mongoose.model('user', userSchema);
// const Token = mongoose.model('token', tokenSchema);

// const validate = (data) => {
//   const schema = Joi.object({
//     firstName: Joi.string().required().label('First Name'),
//     lastName: Joi.string().required().label('Last Name'),
//     email: Joi.string().email().required().label('Email'),
//     password: passwordComplexity().required().label('Password'),
//   });
//   return schema.validate(data);
// };

// // Send email using nodemailer
// const sendEmail = async (email, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.HOST,
//       service: process.env.SERVICE,
//       port: Number(process.env.EMAIL_PORT),
//       secure: Boolean(process.env.SECURE),
//       auth: {
//         user: process.env.USER,
//         pass: process.env.PASS,
//       },
//       tls: {
//         rejectUnauthorized: false, // Disable SSL verification
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.USER,
//       to: email,
//       subject: subject,
//       text: text,
//     });
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.log('Email not sent!');
//     console.log(error);
//     return error;
//   }
// };

// // Routes
// app.post('/api/auth', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send({ message: 'Invalid email or password' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(400).send({ message: 'Invalid email or password' });
//     }

//     const token = user.generateAuthToken();

//     res.send({ token });
//   } catch (error) {
//     console.log('Error:', error);
//     res.status(500).send({ message: 'An error occurred. Please try again later.' });
//   }
// });

// app.post('/api/users', async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) {
//       return res.status(400).send({ message: error.details[0].message });
//     }

//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).send({ message: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const user = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     await user.save();

//     const token = new Token({
//       userId: user._id,
//       token: crypto.randomBytes(16).toString('hex'),
//     });

//     await token.save();

//     const verificationLink = `${process.env.BASE_URL}verify/${token.token}`;
//     // const verificationLink = `${process.env.BASE_URL}api/users/${user._id}/verify/${token.token}`;

//     const emailSubject = 'Account Verification';
//     const emailText = `Click on the following link to verify your account:\n${verificationLink}`;

//     await sendEmail(user.email, emailSubject, emailText);

//     res.send({ message: 'Registration successful. Please check your email for verification.' });
//   } catch (error) {
//     console.log('Error:', error);
//     res.status(500).send({ message: 'An error occurred. Please try again later.' });
//   }
// });

// app.get('/api/users/:id/verify/:token', async (req, res) => {
//   try {
//     const token = req.params.token;

//     // Find the token in the database
//     const tokenDoc = await Token.findOne({ token });

//     if (!tokenDoc) {
//       // Token not found, handle the error or redirect to an error page
//       return res.status(400).send('Invalid verification token');
//     }

//     // Find the corresponding user in the database using the userId from the token
//     const user = await User.findById(tokenDoc.userId);

//     if (!user) {
//       // User not found, handle the error or redirect to an error page
//       return res.status(400).send('User not found');
//     }

//     // Update the user's verification status to true
//     user.verified = true;
//     await user.save();

//     // Delete the token from the database
//     await Token.deleteOne({ token });

//     // Redirect the user to a success page or send a success message
//     res.send('Account verified successfully');
//   } catch (error) {
//     // Handle any errors that occurred during the verification process
//     console.log('Error:', error);
//     res.status(500).send('An error occurred during verification');
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

import express from 'express';
import mongoose, { Schema, model } from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Joi from 'joi';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import passwordComplexity from 'joi-password-complexity';
import dotenv from 'dotenv';

dotenv.config();

const port = 1337;
const app = express();
app.use(express.json());

// Middleware
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/bus_crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Define the Employee schema --crud
const employeeSchema = new Schema(
  {
    busnum: String,
    route: String,
    stime: String,
    etime: String,
    price: String,
    delays: String,
  },
  { collection: 'bus_schedules' }
);

const Employee = model('bus_schedules', employeeSchema);

// Configure Express to parse JSON data
app.use(express.json());

// Define Token schema
const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nic: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '7d',
  });
  return token;
};

const User = mongoose.model('user', userSchema);
const Token = mongoose.model('token', tokenSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    nic: Joi.string().required().label('NIC'),
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });
  return schema.validate(data);
};

// Send email using nodemailer
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false, // Disable SSL verification
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Email not sent!');
    console.log(error);
    return error;
  }
};

// Routes - Login
app.post('/api/auth', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.send({ token });
  } catch (error) {
    console.log('Error:', error);
    res
      .status(500)
      .send({ message: 'An error occurred. Please try again later.' });
  }
});

// Routes - Signup
app.post('/api/users', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      nic: req.body.nic,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    });

    await token.save();

    const verificationLink = `${process.env.BASE_URL}verify/${token.token}`;

    const emailSubject = 'Account Verification';
    const emailText = `Click on the following link to verify your account:\n${verificationLink}`;

    await sendEmail(user.email, emailSubject, emailText);

    res.send({
      message: 'Registration successful. Please check your email for verification.',
    });
  } catch (error) {
    console.log('Error:', error);
    res
      .status(500)
      .send({ message: 'An error occurred. Please try again later.' });
  }
});

app.get('/api/users/:id/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;

    const tokenDoc = await Token.findOne({ token });

    if (!tokenDoc) {
      return res.status(400).send('Invalid verification token');
    }

    const user = await User.findById(tokenDoc.userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    user.verified = true;
    await user.save();

    await Token.deleteOne({ token });

    res.send('Account verified successfully');
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('An error occurred during verification');
  }
});

// CRUD Routes
app.get('/user/getAll', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ data: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get employees' });
  }
});

app.post('/user/create', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({ message: 'Employee created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

app.patch('/user/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

app.delete('/user/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

