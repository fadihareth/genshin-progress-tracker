import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export const AuthPayloadType = new GraphQLObjectType({
    name: 'AuthPayload',
    fields: () => ({
        token: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(UserType) },
    }),
});

