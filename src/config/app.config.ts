export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  log: {
    access_log: process.env.ACCESS_LOG
      ? process.env.ACCESS_LOG
      : `:remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms`,
  },
});
