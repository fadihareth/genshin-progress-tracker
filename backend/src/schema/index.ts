import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql';
import { CharacterBuildType } from './types';
import { mutationResolvers, queryResolvers } from './resolvers';

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
    },
});

export const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});