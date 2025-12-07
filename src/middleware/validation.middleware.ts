import { Request, Response, NextFunction } from 'express';

export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const payload = {
    body: req.body,
    query: req.query,
    params: req.params,
  };

  const result = schema.safeParse(payload);

  if (result.success) {
    return next();
  }

  const formattedErrors = result.error.errors.map((err: any) => ({
    path: err.path.join('.'),
    message: err.message,
    expected: err.expected ?? null,
    received: err.received ?? null,
    code: err.code,
  }));

  return res.status(400).json({
    success: false,
    message: 'Validation Failed',
    errors: formattedErrors,
  });
};
