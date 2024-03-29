import { NextFunction, Request, Response } from "express";

const middleware = (err: Error,  req: Request, res: Response, next: NextFunction) => {
  console.log("** ERROR LOGGING **")
  console.log(req.originalUrl)
  console.error(err.stack)
  next(err)
}

export default middleware