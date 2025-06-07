import express from 'express';
import mongoose from 'mongoose';
import config from './config';

import loginRouter from './routers/loginRouter';
import registerRouter from './routers/registerRouter';
import unknownEndpoint from './middlewares/unknownEndpoint';
import errorHandler from './middlewares/errorHandler';
import contactRouter from './routers/contactRouter';
import userRouter from './routers/userRouter';
import modifyToken from './middlewares/modifyToken';
import { jwtAuth } from './middlewares/jwtAuth';

const app = express();

console.log("connecting to ", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) =>
    console.log("error connecting to MongoDB: ", error.message)
  );

app.use(express.static("dist"));
app.use(express.json());

app.use(modifyToken);

// Public routes (no authentication required)
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

// Apply JWT authentication for protected routes
app.use("/api/users", jwtAuth, userRouter);
app.use("/api/contacts", jwtAuth, contactRouter);

// Handle unknown endpoints
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
