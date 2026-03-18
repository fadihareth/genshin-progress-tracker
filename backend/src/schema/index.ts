import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { AuthPayloadType, CharacterBuildType } from './types';
import { mutationResolvers, queryResolvers } from './resolvers';
import { createUser, loginUser } from '../models/User';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        builds: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CharacterBuildType))),
            resolve: queryResolvers.builds,
        },
        build: {
            type: CharacterBuildType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: queryResolvers.build,
        },
    },
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBuild: {
            type: new GraphQLNonNull(CharacterBuildType),
            args: mutationResolvers.createBuild.args,
            resolve: mutationResolvers.createBuild.resolve,
        },
        updateBuild: {
            type: new GraphQLNonNull(CharacterBuildType),
            args: mutationResolvers.updateBuild.args,
            resolve: mutationResolvers.updateBuild.resolve,
        },
        deleteBuild: {
            type: new GraphQLNonNull(GraphQLInt),
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: mutationResolvers.deleteBuild,
        },

        signup: {
            type: new GraphQLNonNull(AuthPayloadType),
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (_source, args: { email: string; password: string }) => {
                return createUser(args.email, args.password);
            },
        },

        login: {
            type: new GraphQLNonNull(AuthPayloadType),
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (_source, args: { email: string; password: string }) => {
                return loginUser(args.email, args.password);
            },
        },
    },
});

export const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});