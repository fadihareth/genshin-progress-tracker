import { getAllBuilds, getBuildById } from '../../models/CharacterBuild';

export const queryResolvers = {
    builds: () => {
        return getAllBuilds();
    },

    build: (_: any, args: { id: number }) => {
        return getBuildById(args.id);
    },
};