require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");


const applyRoutes = require('./routes/apply');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();
const PORT = process.env.PORT || 5000;

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://dummy@o0.ingest.sentry.io/0",
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0, 
  profilesSampleRate: 1.0,
});

Sentry.setupExpressErrorHandler(app);

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(cors());
app.use(express.json());
// Serve static uploads
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window`
  message: { error: 'Too many login attempts, please try again after 15 minutes' }
});

const applyLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 apply requests per `window`
  message: { error: 'Too many applications submitted, please try again later' }
});

app.use('/api/apply', applyLimiter, applyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/login', loginLimiter); // Apply only to login
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// Start server
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
