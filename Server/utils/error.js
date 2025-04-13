export const errorHandler=(statuscode,message)=>{
    const error=new Error()
    error.statuscode=statuscode;
    error.message=message;
    return error;
}

// utils/error.js
export const errorMiddleware = (err, req, res, next) => {
    const status = err.statuscode || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({
      success: false,
      status,
      message,
    });
  };
  