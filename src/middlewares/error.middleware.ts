import { Request, Response, NextFunction } from 'express';
import MyError from '../constants/MyError';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("========== err ===========")
    console.log(err)
    const message = err.message || 'Internal Server Error';
    const code = (err instanceof MyError) ? err.code : 500;
    res.status(code).json({error:message,statusCode:code})
  };