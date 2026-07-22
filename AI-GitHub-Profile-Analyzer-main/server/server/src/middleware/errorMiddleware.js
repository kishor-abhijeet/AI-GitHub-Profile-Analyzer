export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || error.response?.status || 500;

  const message =
    statusCode === 403
      ? 'GitHub API rate limit reached. Add a GITHUB_TOKEN in server/.env and try again.'
      : error.message || 'Something went wrong while analyzing this profile.';

  res.status(statusCode).json({
    message,
    statusCode
  });
};
