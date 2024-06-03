// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// const userRoutes = require('./routes/userRoutes');

// app.use('/api/users', userRoutes);

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('MongoDB connected');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Define CORS options to allow requests from your Netlify domain
const corsOptions = {
  origin: 'https://brilliant-croissant-205f6b.netlify.app', // Replace this with your Netlify domain
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
