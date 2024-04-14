//import { Form, Types } from "@tsvdec/core";
import { TODO } from "@org/shared";
import { Form } from "@tsvdec/core";
import type { NextFunction, Request, Response } from "express";

export function validateForm(clazz: new (...args: TODO[]) => TODO) {
  return function (req: Request, res: Response, next: NextFunction) {
    const form = new Form(clazz);
    const body = req.body;
    const result = form.validate(body);

    if (!result.valid) {
      return res.status(400).json(result);
    }

    next();
  };
}
