import { getDatabase } from '../db';

export interface CharacterBuildInput {
    characterId: number;
    order?: number;
    levelComplete?: boolean;
    targetLevel?: string;
    constellationComplete?: boolean;
    targetConstellation?: string;
    weaponId?: number | null;
    weaponLevelComplete?: boolean;
    targetWeaponLevel?: string;
    weaponRefineComplete?: boolean;
    targetWeaponRefine?: string;
    artifact1Id?: number | null;
    artifact2Id?: number | null;
    flowerComplete?: boolean;
    plumeComplete?: boolean;
    sandsStat?: string | null;
    sandsComplete?: boolean;
    gobletStat?: string | null;
    gobletComplete?: boolean;
    circletStat?: string | null;
    circletComplete?: boolean;
    artifactSubstats?: string[];
    talent1LevelComplete?: boolean;
    targetTalent1Level?: string;
    talent2LevelComplete?: boolean;
    targetTalent2Level?: string;
    talent3LevelComplete?: boolean;
    targetTalent3Level?: string;
}

export interface CharacterBuildRow {
    id: number;
    character_id: number;
    sort_order: number;
    level_complete: number;
    target_level: string;
    constellation_complete: number;
    target_constellation: string;
    weapon_id: number | null;
    weapon_level_complete: number;
    target_weapon_level: string;
    weapon_refine_complete: number;
    target_weapon_refine: string;
    artifact1_id: number | null;
    artifact2_id: number | null;
    flower_complete: number;
    plume_complete: number;
    sands_stat: string | null;
    sands_complete: number;
    goblet_stat: string | null;
    goblet_complete: number;
    circlet_stat: string | null;
    circlet_complete: number;
    artifact_substats: string;
    talent1_level_complete: number;
    target_talent1_level: string;
    talent2_level_complete: number;
    target_talent2_level: string;
    talent3_level_complete: number;
    target_talent3_level: string;
}

// Convert database row to GraphQL object
export function rowToBuild(row: CharacterBuildRow) {
    return {
        id: row.id,
        characterId: row.character_id,
        order: row.sort_order,
        levelComplete: Boolean(row.level_complete),
        targetLevel: row.target_level,
        constellationComplete: Boolean(row.constellation_complete),
        targetConstellation: row.target_constellation,
        weaponId: row.weapon_id,
        weaponLevelComplete: Boolean(row.weapon_level_complete),
        targetWeaponLevel: row.target_weapon_level,
        weaponRefineComplete: Boolean(row.weapon_refine_complete),
        targetWeaponRefine: row.target_weapon_refine,
        artifact1Id: row.artifact1_id,
        artifact2Id: row.artifact2_id,
        flowerComplete: Boolean(row.flower_complete),
        plumeComplete: Boolean(row.plume_complete),
        sandsStat: row.sands_stat,
        sandsComplete: Boolean(row.sands_complete),
        gobletStat: row.goblet_stat,
        gobletComplete: Boolean(row.goblet_complete),
        circletStat: row.circlet_stat,
        circletComplete: Boolean(row.circlet_complete),
        artifactSubstats: JSON.parse(row.artifact_substats),
        talent1LevelComplete: Boolean(row.talent1_level_complete),
        targetTalent1Level: row.target_talent1_level,
        talent2LevelComplete: Boolean(row.talent2_level_complete),
        targetTalent2Level: row.target_talent2_level,
        talent3LevelComplete: Boolean(row.talent3_level_complete),
        targetTalent3Level: row.target_talent3_level,
    };
}

// Get all builds
export function getAllBuilds() {
    const db = getDatabase();
    const rows = db.prepare('SELECT * FROM character_builds ORDER BY sort_order ASC, id ASC').all() as CharacterBuildRow[];
    return rows.map(rowToBuild);
}

// Get build by ID
export function getBuildById(id: number) {
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM character_builds WHERE id = ?').get(id) as CharacterBuildRow | undefined;
    return row ? rowToBuild(row) : null;
}

// Create a new build
export function createBuild(input: CharacterBuildInput) {
    const db = getDatabase();

    // Get max sort_order to append at end
    const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), 0) as max_order FROM character_builds').get() as { max_order: number };
    const sortOrder = input.order ?? maxOrder.max_order + 1;

    const stmt = db.prepare(`
    INSERT INTO character_builds (
      character_id, sort_order,
      level_complete, target_level, constellation_complete, target_constellation,
      weapon_id, weapon_level_complete, target_weapon_level, weapon_refine_complete, target_weapon_refine,
      artifact1_id, artifact2_id, flower_complete, plume_complete, sands_stat, sands_complete,
      goblet_stat, goblet_complete, circlet_stat, circlet_complete, artifact_substats,
      talent1_level_complete, target_talent1_level,
      talent2_level_complete, target_talent2_level,
      talent3_level_complete, target_talent3_level
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    const result = stmt.run(
        input.characterId,
        sortOrder,
        input.levelComplete ? 1 : 0,
        input.targetLevel ?? '90',
        input.constellationComplete ? 1 : 0,
        input.targetConstellation ?? 'C0',
        input.weaponId ?? null,
        input.weaponLevelComplete ? 1 : 0,
        input.targetWeaponLevel ?? '90',
        input.weaponRefineComplete ? 1 : 0,
        input.targetWeaponRefine ?? 'R5',
        input.artifact1Id ?? null,
        input.artifact2Id ?? null,
        input.flowerComplete ? 1 : 0,
        input.plumeComplete ? 1 : 0,
        input.sandsStat ?? null,
        input.sandsComplete ? 1 : 0,
        input.gobletStat ?? null,
        input.gobletComplete ? 1 : 0,
        input.circletStat ?? null,
        input.circletComplete ? 1 : 0,
        JSON.stringify(input.artifactSubstats ?? []),
        input.talent1LevelComplete ? 1 : 0,
        input.targetTalent1Level ?? '10',
        input.talent2LevelComplete ? 1 : 0,
        input.targetTalent2Level ?? '10',
        input.talent3LevelComplete ? 1 : 0,
        input.targetTalent3Level ?? '10',
    );

    return getBuildById(result.lastInsertRowid as number)!;
}

// Update a build
export function updateBuild(id: number, input: Partial<CharacterBuildInput>) {
    const db = getDatabase();

    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];

    if (input.characterId !== undefined) {
        updates.push('character_id = ?');
        values.push(input.characterId);
    }
    if (input.order !== undefined) {
        updates.push('sort_order = ?');
        values.push(input.order);
    }
    if (input.levelComplete !== undefined) {
        updates.push('level_complete = ?');
        values.push(input.levelComplete ? 1 : 0);
    }
    if (input.targetLevel !== undefined) {
        updates.push('target_level = ?');
        values.push(input.targetLevel);
    }
    if (input.constellationComplete !== undefined) {
        updates.push('constellation_complete = ?');
        values.push(input.constellationComplete ? 1 : 0);
    }
    if (input.targetConstellation !== undefined) {
        updates.push('target_constellation = ?');
        values.push(input.targetConstellation);
    }
    if (input.weaponId !== undefined) {
        updates.push('weapon_id = ?');
        values.push(input.weaponId);
    }
    if (input.weaponLevelComplete !== undefined) {
        updates.push('weapon_level_complete = ?');
        values.push(input.weaponLevelComplete ? 1 : 0);
    }
    if (input.targetWeaponLevel !== undefined) {
        updates.push('target_weapon_level = ?');
        values.push(input.targetWeaponLevel);
    }
    if (input.weaponRefineComplete !== undefined) {
        updates.push('weapon_refine_complete = ?');
        values.push(input.weaponRefineComplete ? 1 : 0);
    }
    if (input.targetWeaponRefine !== undefined) {
        updates.push('target_weapon_refine = ?');
        values.push(input.targetWeaponRefine);
    }
    if (input.artifact1Id !== undefined) {
        updates.push('artifact1_id = ?');
        values.push(input.artifact1Id);
    }
    if (input.artifact2Id !== undefined) {
        updates.push('artifact2_id = ?');
        values.push(input.artifact2Id);
    }
    if (input.flowerComplete !== undefined) {
        updates.push('flower_complete = ?');
        values.push(input.flowerComplete ? 1 : 0);
    }
    if (input.plumeComplete !== undefined) {
        updates.push('plume_complete = ?');
        values.push(input.plumeComplete ? 1 : 0);
    }
    if (input.sandsStat !== undefined) {
        updates.push('sands_stat = ?');
        values.push(input.sandsStat);
    }
    if (input.sandsComplete !== undefined) {
        updates.push('sands_complete = ?');
        values.push(input.sandsComplete ? 1 : 0);
    }
    if (input.gobletStat !== undefined) {
        updates.push('goblet_stat = ?');
        values.push(input.gobletStat);
    }
    if (input.gobletComplete !== undefined) {
        updates.push('goblet_complete = ?');
        values.push(input.gobletComplete ? 1 : 0);
    }
    if (input.circletStat !== undefined) {
        updates.push('circlet_stat = ?');
        values.push(input.circletStat);
    }
    if (input.circletComplete !== undefined) {
        updates.push('circlet_complete = ?');
        values.push(input.circletComplete ? 1 : 0);
    }
    if (input.artifactSubstats !== undefined) {
        updates.push('artifact_substats = ?');
        values.push(JSON.stringify(input.artifactSubstats));
    }
    if (input.talent1LevelComplete !== undefined) {
        updates.push('talent1_level_complete = ?');
        values.push(input.talent1LevelComplete ? 1 : 0);
    }
    if (input.targetTalent1Level !== undefined) {
        updates.push('target_talent1_level = ?');
        values.push(input.targetTalent1Level);
    }
    if (input.talent2LevelComplete !== undefined) {
        updates.push('talent2_level_complete = ?');
        values.push(input.talent2LevelComplete ? 1 : 0);
    }
    if (input.targetTalent2Level !== undefined) {
        updates.push('target_talent2_level = ?');
        values.push(input.targetTalent2Level);
    }
    if (input.talent3LevelComplete !== undefined) {
        updates.push('talent3_level_complete = ?');
        values.push(input.talent3LevelComplete ? 1 : 0);
    }
    if (input.targetTalent3Level !== undefined) {
        updates.push('target_talent3_level = ?');
        values.push(input.targetTalent3Level);
    }

    if (updates.length === 0) {
        return getBuildById(id);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(`UPDATE character_builds SET ${updates.join(', ')} WHERE id = ?`);
    stmt.run(...values);

    return getBuildById(id)!;
}

// Delete a build
export function deleteBuild(id: number): number {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM character_builds WHERE id = ?');
    const result = stmt.run(id);
    return id;
}