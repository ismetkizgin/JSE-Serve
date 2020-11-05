const express = require('express');
const app = express();
const routers = require('./routers');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.json('JSE Serve Project');
});

app.use(routers.authRouter);
app.use(routers.userRouter);
app.use(routers.blogMenuRouter);
app.use(routers.slideRouter);
app.use(routers.projectRouter);
app.use(routers.blogRouter);

app.use((req, res, next) => {
    res.send("404 NOT FOUND");
});

module.exports = app;