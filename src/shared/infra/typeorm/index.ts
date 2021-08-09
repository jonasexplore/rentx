import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const connection = Object.assign(defaultOptions, {
    database:
      process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database,
  });

  return createConnection(connection);
};
