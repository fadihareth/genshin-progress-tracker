import { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { createBuild, updateBuild, deleteBuild, CharacterBuildInput } from '../../models/CharacterBuild';

// Input type for creating a build
const CreateBuildInputType = new GraphQLInputObjectType({
    name: 'CreateBuildInput',
    fields: {
        characterId: { type: new GraphQLNonNull(GraphQLInt) },
        order: { type: GraphQLInt },
        levelComplete: { type: GraphQLBoolean },
        targetLevel: { type: GraphQLString },
        constellationComplete: { type: GraphQLBoolean },
        targetConstellation: { type: GraphQLString },
        weaponId: { type: GraphQLInt },
        weaponLevelComplete: { type: GraphQLBoolean },
        targetWeaponLevel: { type: GraphQLString },
        weaponRefineComplete: { type: GraphQLBoolean },
        targetWeaponRefine: { type: GraphQLString },
        artifactIds: { type: new GraphQLList(GraphQLInt) },
        flowerComplete: { type: GraphQLBoolean },
        plumeComplete: { type: GraphQLBoolean },
        sandsStat: { type: GraphQLString },
        sandsComplete: { type: GraphQLBoolean },
        gobletStat: { type: GraphQLString },
        gobletComplete: { type: GraphQLBoolean },
        circletStat: { type: GraphQLString },
        circletComplete: { type: GraphQLBoolean },
        artifactSubstats: { type: new GraphQLList(GraphQLString) },
        talent1LevelComplete: { type: GraphQLBoolean },
        targetTalent1Level: { type: GraphQLString },
        talent2LevelComplete: { type: GraphQLBoolean },
        targetTalent2Level: { type: GraphQLString },
        talent3LevelComplete: { type: GraphQLBoolean },
        targetTalent3Level: { type: GraphQLString },
    },
});

// Input type for updating a build
const UpdateBuildInputType = new GraphQLInputObjectType({
    name: 'UpdateBuildInput',
    fields: {
        characterId: { type: GraphQLInt },
        order: { type: GraphQLInt },
        levelComplete: { type: GraphQLBoolean },
        targetLevel: { type: GraphQLString },
        constellationComplete: { type: GraphQLBoolean },
        targetConstellation: { type: GraphQLString },
        weaponId: { type: GraphQLInt },
        weaponLevelComplete: { type: GraphQLBoolean },
        targetWeaponLevel: { type: GraphQLString },
        weaponRefineComplete: { type: GraphQLBoolean },
        targetWeaponRefine: { type: GraphQLString },
        artifactIds: { type: new GraphQLList(GraphQLInt) },
        flowerComplete: { type: GraphQLBoolean },
        plumeComplete: { type: GraphQLBoolean },
        sandsStat: { type: GraphQLString },
        sandsComplete: { type: GraphQLBoolean },
        gobletStat: { type: GraphQLString },
        gobletComplete: { type: GraphQLBoolean },
        circletStat: { type: GraphQLString },
        circletComplete: { type: GraphQLBoolean },
        artifactSubstats: { type: new GraphQLList(GraphQLString) },
        talent1LevelComplete: { type: GraphQLBoolean },
        targetTalent1Level: { type: GraphQLString },
        talent2LevelComplete: { type: GraphQLBoolean },
        targetTalent2Level: { type: GraphQLString },
        talent3LevelComplete: { type: GraphQLBoolean },
        targetTalent3Level: { type: GraphQLString },
    },
});

export const mutationResolvers = {
    createBuild: {
        args: {
            input: { type: new GraphQLNonNull(CreateBuildInputType) },
        },
        resolve: (_: any, args: { input: CharacterBuildInput }) => {
            return createBuild(args.input);
        },
    },

    updateBuild: {
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            input: { type: new GraphQLNonNull(UpdateBuildInputType) },
        },
        resolve: (_: any, args: { id: number; input: Partial<CharacterBuildInput> }) => {
            return updateBuild(args.id, args.input);
        },
    },

    deleteBuild: (_: any, args: { id: number }) => {
        return deleteBuild(args.id);
    },
};