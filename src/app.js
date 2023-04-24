import express from "express";
import indexRoutes from './routes/index.routes.js';
import userRoutes from './routes/users.routes.js';

const app = express();

// Get json encoded data from client
app.use(express.json());


app.use('/api', indexRoutes);
app.use('/api', userRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not fount"
    });
});

export default app;