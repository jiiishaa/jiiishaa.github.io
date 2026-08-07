const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));
app.use('/api/projects', require('./src/routes/projectRoutes'));
app.use('/api/skills', require('./src/routes/skillRoutes'));
app.use('/api/experience', require('./src/routes/experienceRoutes'));
app.use('/api/education', require('./src/routes/educationRoutes'));
app.use('/api/messages', require('./src/routes/messageRoutes'));
// Root health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

// Create a default admin user on startup if it doesn't exist.
const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'jishajayaprakash336@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'jisha2005@';

    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(adminPassword, salt);
      await User.create({ name: 'Admin', email: adminEmail, password: hashed });
      console.log(`Default admin user created: ${adminEmail}`);
    } else {
      console.log(`Admin user already exists: ${adminEmail}`);
    }
  } catch (err) {
    console.error('Admin creation error:', err);
  }
};

// Error handling middleware
const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    await createAdminUser();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
