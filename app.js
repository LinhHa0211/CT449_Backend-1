// app.mjs
import express from 'express';
import cors from 'cors';

const app = express();
import contactsRouter from './app/routes/contact.route';

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
//handle 404 response
app.use((req, res, next) => {
  // Code này sẽ chạy khi không có route được định nghĩa nào
  //khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.use() and routes calls
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  //Middleware xử lý lỗi tập trung.
  //Trong các đoạn code xử lý lỗi ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
  // eslint-disable-next-line no-undef
  return res.status(err.statusCode || 500).json({
    // eslint-disable-next-line no-undef
    message: err.message || "Internal Server Error",
  });
});


// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the contact book application.' });
});

// Export đối tượng app
export default app;

