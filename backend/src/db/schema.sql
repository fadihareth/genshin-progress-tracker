CREATE TABLE IF NOT EXISTS character_builds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    -- Level Progress
    level_complete INTEGER NOT NULL DEFAULT 0,
    target_level TEXT NOT NULL DEFAULT '90',
    constellation_complete INTEGER NOT NULL DEFAULT 0,
    target_constellation TEXT NOT NULL DEFAULT 'C0',
    
    -- Weapon Progress
    weapon_id INTEGER,
    weapon_level_complete INTEGER NOT NULL DEFAULT 0,
    target_weapon_level TEXT NOT NULL DEFAULT '90',
    weapon_refine_complete INTEGER NOT NULL DEFAULT 0,
    target_weapon_refine TEXT NOT NULL DEFAULT 'R5',
    
    -- Artifact Progress
    artifact1_id INTEGER,
    artifact2_id INTEGER,
    flower_complete INTEGER NOT NULL DEFAULT 0,
    plume_complete INTEGER NOT NULL DEFAULT 0,
    sands_stat TEXT,
    sands_complete INTEGER NOT NULL DEFAULT 0,
    goblet_stat TEXT,
    goblet_complete INTEGER NOT NULL DEFAULT 0,
    circlet_stat TEXT,
    circlet_complete INTEGER NOT NULL DEFAULT 0,
    artifact_substats TEXT NOT NULL DEFAULT '[]', -- JSON array
    
    -- Talents Progress
    talent1_level_complete INTEGER NOT NULL DEFAULT 0,
    target_talent1_level TEXT NOT NULL DEFAULT '10',
    talent2_level_complete INTEGER NOT NULL DEFAULT 0,
    target_talent2_level TEXT NOT NULL DEFAULT '10',
    talent3_level_complete INTEGER NOT NULL DEFAULT 0,
    target_talent3_level TEXT NOT NULL DEFAULT '10',
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_character_builds_character_id ON character_builds(character_id);
CREATE INDEX IF NOT EXISTS idx_character_builds_sort_order ON character_builds(sort_order);