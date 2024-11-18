const globalErrHandler = (err, req, res, next) => {
  
  const stack = err.stack;
  const messsage = err.message;
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({
    messsage,
    status,
    stack,
  });
};
module.exports = globalErrHandler;
