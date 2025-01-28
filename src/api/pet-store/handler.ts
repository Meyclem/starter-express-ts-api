import { apiErrorResponse, NotFoundError } from "src/utils/error";
import { z } from "zod";

import { Handler } from "../../internals/handler";

import type { paths, components } from "./types/pet-store";

// Data for handlers example
const pets: components["schemas"]["Pet"][] = [
  { id: 1, name: "Garfield", tag: "Cat" },
  { id: 2, name: "Odie", tag: "Dog" },
  { id: 3, name: "Fanklin", tag: "Turtle" },
];

export const getParamsSchema = z.object({
  id: z.string({
    required_error: "id is required",
  }),
});
export const getBodySchema = z.object({});

export const get: Handler<
  typeof getParamsSchema,
  typeof getBodySchema,
  paths["/pets/{petId}"]["get"]["responses"]["200"]["content"]["application/json"] | null
> = ({ params }) => async (request, response) => {
  try {
    const pet = pets.find((pet) => pet.id === Number(params.id));

    if (!pet) {
      throw new NotFoundError(`Pet with 'id' ${params.id} not found.`);
    }

    response.json(pet);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return apiErrorResponse(response, 404, {
        title: "Not Found",
        detail: error.message,
        instance: request.url,
      });
    }
  }
};

export const postParamsSchema = z.object({});
export const postBodySchema = z.object({
  name: z.string({
    required_error: "name is required",
  }),
  tag: z.string().optional(),
});

export const post: Handler<
  typeof postParamsSchema,
  typeof postBodySchema,
  paths["/pets"]["post"]["responses"]["201"]["content"]["application/json"]
> = ({ body }) => async (request, response) => {
  const newPet = {
    id: pets.length + 1,
    name: body.name,
    tag: body.tag,
  };

  pets.push(newPet);

  response.status(201).json(newPet);
};

export const listParamsSchema = z.object({});
export const listBodySchema = z.object({});

export const list: Handler<
  typeof listParamsSchema,
  typeof listBodySchema,
  paths["/pets"]["get"]["responses"]["200"]["content"]["application/json"]
> = () => async (request, response) => {
  response.json(pets);
};
