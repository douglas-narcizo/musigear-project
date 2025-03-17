const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const setupSwagger = require('./swagger');
const passport = require('passport');
const helmet = require('helmet');
require('./controllers/auth')(passport);
const { pool } = require('./db'); // Import the pool instance

require('dotenv').config();
const { PORT, SESSION_SECRET, DATABASE_URL } = require('./config');

// Routers imports
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://checkout.stripe.com',
  'https://stripe.com',
  'https://stripe.network'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Configure helmet for CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://checkout.stripe.com", "https://js.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://*.stripe.com"],
      connectSrc: ["'self'", "https://*.stripe.com", process.env.BACKEND_URL],
      frameSrc: ["'self'", "https://js.stripe.com"],
    },
  },
}));

//  Manually configure CSP
/* app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://js.stripe.com https://checkout.stripe.com process.env.BACKEND_URL; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://*.stripe.com; connect-src 'self' https://*.stripe.com process.env.BACKEND_URL; frame-src 'self' https://js.stripe.com;"
  );
  next();
});
 */
// Configure session
app.use(
  session({
    store: new pgSession({
      pool: pool, // Use the imported pool instance
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Ensure the cookie is only sent over HTTPS
      sameSite: 'None', // Allow cross-site cookies
      domain: '.musigear.com', // Share cookie across subdomains
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

app.get('/health', (req, res) => { 
  res.sendStatus(200); 
});

setupSwagger(app);

// render index.html for root URL
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
