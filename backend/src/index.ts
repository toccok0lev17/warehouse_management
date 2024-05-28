import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';
import resolvers from './resolvers';
import { sequelize } from './models';

const typeDefs = importSchema(path.join(__dirname, 'schema/schema.graphql'));

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const startServer = async () => {
  const server = new ApolloServer({ schema });
  
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, async () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);

    try {
      await sequelize.sync();
      console.log('Database synchronized');
    } catch (error) {
      console.error('Unable to sync the database:', error);
    }
  });
};

startServer();
