import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean, GraphQLNonNull } from 'graphql';

export const CharacterBuildType = new GraphQLObjectType({
    name: 'CharacterBuild',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        characterId: { type: new GraphQLNonNull(GraphQLInt) },
        order: { type: new GraphQLNonNull(GraphQLInt) },

        // Level Progress
        levelComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        targetLevel: { type: new GraphQLNonNull(GraphQLString) },
        constellationComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        targetConstellation: { type: new GraphQLNonNull(GraphQLString) },

        // Weapon Progress
        weaponId: { type: GraphQLInt },
        weaponLevelComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        targetWeaponLevel: { type: new GraphQLNonNull(GraphQLString) },
        weaponRefineComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        targetWeaponRefine: { type: new GraphQLNonNull(GraphQLString) },

        // Artifact Progress
        artifact1Id: { type: GraphQLInt },
        artifact2Id: { type: GraphQLInt },
        flowerComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        plumeComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        sandsStat: { type: GraphQLString },
        sandsComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        gobletStat: { type: GraphQLString },
        gobletComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        circletStat: { type: GraphQLString },
        circletComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        artifactSubstats: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },

        // Talents Progress
        talent1LevelComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        targetTalent1Level: { type: new GraphQLNonNull(GraphQLString) },
        talent2LevelComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        targetTalent2Level: { type: new GraphQLNonNull(GraphQLString) },
        talent3LevelComplete: { type: new GraphQLNonNull(GraphQLBoolean) },
        targetTalent3Level: { type: new GraphQLNonNull(GraphQLString) },
    }),
});