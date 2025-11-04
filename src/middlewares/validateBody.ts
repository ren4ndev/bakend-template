import { Request, Response, NextFunction } from "express";
import { flattenError, ZodObject, ZodError } from "zod";

export const validateBody = (schema: ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: flattenError(error),
        });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
