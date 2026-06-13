const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: 'Invalid request data.',
      issues: err.errors.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid identifier.' });
  }

  return res.status(statusCode).json({
    message: statusCode === 500 ? 'Something went wrong.' : err.message
  });
};

module.exports = { notFound, errorHandler };
