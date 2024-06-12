const asynceHandler = (requstHandler) =>{
  return (res, req, next) =>{
  Promise.resolve(requstHandler(req, res, next))
  .catch((error) => next(error))
  }
};

export {asynceHandler};