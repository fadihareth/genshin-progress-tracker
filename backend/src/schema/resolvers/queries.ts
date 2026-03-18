import { getAllBuilds, getBuildById } from '../../models/CharacterBuild';

export interface GraphQLContext {
    userId: number | null;
}

export const queryResolvers = {
    builds: (_: any, __: any, ctx: GraphQLContext) => {
        if (!ctx.userId) {
            throw new Error('Not authenticated');
        }
        return getAllBuilds(ctx.userId);
    },

    build: (_: any, args: { id: number }, ctx: GraphQLContext) => {
        if (!ctx.userId) {
            throw new Error('Not authenticated');
        }
        return getBuildById(args.id, ctx.userId);
    },
};