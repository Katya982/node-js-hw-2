import { HttpError } from "../helpers/index.js";
 export const isNoImage = (req, res, next) => {
   const keys = Object.keys(req.file);

   if (!keys.length) {
     return next(HttpError(400, "Missing avatar photo"));
   }
   next();
 };