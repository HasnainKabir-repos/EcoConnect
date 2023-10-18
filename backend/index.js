require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./database');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const passwordResetRoutes = require('./routes/passwordReset');
const UserInfoRoutes = require('./routes/userProfile_info');
//database connection
connection();


//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/userInfo', UserInfoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));