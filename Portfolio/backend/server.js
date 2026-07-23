const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

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
  res.send('API is running...');
});

// Error handling middleware
const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
