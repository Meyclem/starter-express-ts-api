import type { Response } from "express";

export class BadRequestError extends Error {}
export class NotFoundError extends Error {}

export const apiErrorResponse = (
  response: Response,
  status: number,
  { title, type, detail, instance }: {
    title: string,
    type?: string,
    detail: string | string[],
    instance: string
  },
) => {
  response
    .status(status)
    .contentType("application/problem+json")
    .send({
      type: type || `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${status}`,
      title,
      detail,
      instance,
    });
};
