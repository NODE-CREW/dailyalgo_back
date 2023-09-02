import { NextFunction, Request, Response } from "express";

const middleware = (err: Error,  req: Request, res: Response, next: NextFunction) => {
  if (err.message === 'NOT_FOUND') {
    res.status(404).json({ message: err.message })
  }
  else if (req.xhr) {
    res.status(500).json({ message: 'XMLHttpRequest occurs an Error' })
  } else {
    next(err)
  }
}

export default middleware