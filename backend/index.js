require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const connection = require('./database');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const passwordResetRoutes = require('./routes/passwordReset');
const UserInfoRoutes = require('./routes/userProfile_info');
const EcoEventRoutes = require('./routes/EcoEvent');
const locationRoutes = require('./routes/location.route');
//database connection
connection();


//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/userInfo', UserInfoRoutes);
app.use('/api/Event', EcoEventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/location', locationRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;