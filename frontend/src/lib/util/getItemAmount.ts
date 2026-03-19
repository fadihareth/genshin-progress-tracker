/*
    ##########
    Character ascension formulas
    ##########
*/

type AscensionItemType = 'gemstone' | 'mora' | 'exp' | 'worldDrop' | 'localSpecialty' | 'worldBoss';

export function calculateAscensionAmount(itemType: AscensionItemType, target: string, rarity?: number): number {
    switch (itemType) {
        case 'gemstone':
            return calculateGemstoneAmount(Number(target), rarity ?? 0);
        case 'mora':
            return calculateAscensionMoraAmount(Number(target));
        case 'exp':
            return calculateEXPAmount(Number(target));
        case 'worldDrop':
            return calculateWorldDropAmount(Number(target), rarity ?? 0);
        case 'localSpecialty':
            return calculateLocalSpecialtyAmount(Number(target));
        case 'worldBoss':
            return calculateWorldBossAmount(Number(target));
    }
}

function calculateGemstoneAmount(target: number, rarity: number): number {
    return {
        0: target >= 30 ? 1 : 0,
        1: target >= 60 ? 9 : target >= 50 ? 3 : 0,
        2: target >= 80 ? 9 : target >= 70 ? 3 : 0,
        3: target >= 90 ? 6 : 0
    }[rarity] ?? 0;
}

function calculateAscensionMoraAmount(target: number): number {
    if (target >= 90) return 420000;
    if (target >= 80) return 300000;
    if (target >= 70) return 200000;
    if (target >= 60) return 120000;
    if (target >= 50) return 60000;
    if (target >= 30) return 20000;
    return 0;
}

function calculateEXPAmount(target: number): number {
    if (target >= 90) return 419;
    if (target >= 80) return 247;
    if (target >= 70) return 167;
    if (target >= 60) return 107;
    if (target >= 50) return 64;
    if (target >= 40) return 35;
    if (target >= 30) return 17;
    if (target >= 20) return 7;
    if (target >= 10) return 2;
    return 0;
}

function calculateWorldDropAmount(target: number, rarity: number): number {
    return {
        0: target >= 50 ? 18 : target >= 30 ? 3 : 0,
        1: target >= 70 ? 30 : target >= 60 ? 12 : 0,
        2: target >= 90 ? 36 : target >= 80 ? 12 : 0
    }[rarity] ?? 0;
}

function calculateLocalSpecialtyAmount(target: number) {
    if (target >= 90) return 168;
    if (target >= 80) return 108;
    if (target >= 70) return 63;
    if (target >= 60) return 33;
    if (target >= 50) return 13;
    if (target >= 30) return 3;
    return 0;
}

function calculateWorldBossAmount(target: number) {
    if (target >= 90) return 46;
    if (target >= 80) return 26;
    if (target >= 70) return 14;
    if (target >= 60) return 6;
    if (target >= 50) return 2;
    return 0;
}

/*
    ##########
    Character talents formulas
    ##########
*/

type TalentsItemType = 'talentsMaterial' | 'worldDrop' | 'mora' | 'crown' | 'weeklyBoss';

export function calculateTalentsAmount(itemType: TalentsItemType, target1: string, target2: string, target3: string, rarity?: number): number {
    switch (itemType) {
        case 'talentsMaterial':
            return calculateTalentsMaterialAmount(Number(target1), rarity ?? 0) + calculateTalentsMaterialAmount(Number(target2), rarity ?? 0) + calculateTalentsMaterialAmount(Number(target3), rarity ?? 0);
        case 'worldDrop':
            return calculateTalentsWorldDropAmount(Number(target1), rarity ?? 0) + calculateTalentsWorldDropAmount(Number(target2), rarity ?? 0) + calculateTalentsWorldDropAmount(Number(target3), rarity ?? 0);
        case 'mora':
            return calculateTalentsMoraAmount(Number(target1)) + calculateTalentsMoraAmount(Number(target2)) + calculateTalentsMoraAmount(Number(target3));
        case 'crown':
            return calculateTalentsCrownAmount(Number(target1)) + calculateTalentsCrownAmount(Number(target2)) + calculateTalentsCrownAmount(Number(target3));
        case 'weeklyBoss':
            return calculateTalentsWeeklyBossAmount(Number(target1)) + calculateTalentsWeeklyBossAmount(Number(target2)) + calculateTalentsWeeklyBossAmount(Number(target3));
    }
}

function calculateTalentsMaterialAmount(target: number, rarity: number): number {
    return {
        0: target >= 2 ? 3 : 0,
        1: target >= 6 ? 21 : target >= 5 ? 12 : target >= 4 ? 6 : target >= 3 ? 2 : 0,
        2: target >= 10 ? 38 : target >= 9 ? 22 : target >= 8 ? 10 : target >= 7 ? 4 : 0
    }[rarity] ?? 0;
}

function calculateTalentsWorldDropAmount(target: number, rarity: number): number {
    return {
        0: target >= 2 ? 6 : 0,
        1: target >= 6 ? 22 : target >= 5 ? 13 : target >= 4 ? 7 : target >= 3 ? 3 : 0,
        2: target >= 10 ? 31 : target >= 9 ? 19 : target >= 8 ? 10 : target >= 7 ? 4 : 0
    }[rarity] ?? 0;
}

function calculateTalentsMoraAmount(target: number) {
    if (target >= 10) return 1652500
    if (target >= 9) return 952500
    if (target >= 8) return 502500
    if (target >= 7) return 242500
    if (target >= 6) return 122500
    if (target >= 5) return 85000
    if (target >= 4) return 55000
    if (target >= 3) return 30000
    if (target >= 2) return 12500
    return 0;
}

function calculateTalentsCrownAmount(target: number) {
    if (target >= 10) return 1;
    return 0;
}

function calculateTalentsWeeklyBossAmount(target: number) {
    if (target >= 10) return 6;
    if (target >= 9) return 4;
    if (target >= 8) return 2;
    if (target >= 7) return 1;
    return 0;
}

/*
    ##########
    Weapon ascension formulas
    ##########
*/

type WeaponItemType = 'weaponMaterial' | 'mora' | 'worldDrop1' | 'worldDrop2';

export function calculateWeaponAmount(itemType: WeaponItemType, target: string, rarity?: number): number {
    switch (itemType) {
        case 'weaponMaterial':
            return calculateWeaponMaterialAmount(Number(target), rarity ?? 0);
        case 'mora':
            return calculateWeaponMoraAmount(Number(target));
        case 'worldDrop1':
            return calculateWeaponWorldDrop1Amount(Number(target), rarity ?? 0);
        case 'worldDrop2':
            return calculateWeaponWorldDrop2Amount(Number(target), rarity ?? 0);
    }
}

function calculateWeaponMaterialAmount(target: number, rarity: number): number {
    return {
        0: target >= 30 ? 5 : 0,
        1: target >= 60 ? 14 : target >= 50 ? 5 : 0,
        2: target >= 80 ? 14 : target >= 70 ? 5 : 0,
        3: target >= 90 ? 6 : 0
    }[rarity] ?? 0;
}

function calculateWeaponMoraAmount(target: number): number {
    if (target >= 90) return 225000;
    if (target >= 80) return 160000;
    if (target >= 70) return 105000;
    if (target >= 60) return 60000;
    if (target >= 50) return 30000;
    if (target >= 30) return 10000;
    return 0;
}

function calculateWeaponWorldDrop1Amount(target: number, rarity: number): number {
    return {
        0: target >= 50 ? 23 : target >= 30 ? 5 : 0,
        1: target >= 70 ? 27 : target >= 60 ? 9 : 0,
        2: target >= 90 ? 41 : target >= 80 ? 14 : 0
    }[rarity] ?? 0;
}

function calculateWeaponWorldDrop2Amount(target: number, rarity: number): number {
    return {
        0: target >= 50 ? 15 : target >= 30 ? 3 : 0,
        1: target >= 70 ? 23 : target >= 60 ? 9 : 0,
        2: target >= 90 ? 27 : target >= 80 ? 9 : 0
    }[rarity] ?? 0;
}