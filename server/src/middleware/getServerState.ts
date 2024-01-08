import { Request, Response } from "express";

import { Client } from "../types";

type GetServerStateHandlerArgs = {
  getClients: () => Client[];
};

export const getServerStateHandler =
  ({ getClients }: GetServerStateHandlerArgs) =>
  (request: Request, response: Response) => {
    const clients = getClients();
    response.json({ clients: clients.length });
  };
