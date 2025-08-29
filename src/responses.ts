export interface CharacterProfile {
	name: string;
	race: string;
	class: string;
	active_spec_name: string;
	active_spec_role: string;
	gender: string;
	faction: string;
	achievement_points: number;
	thumbnail_url: string;
	region: string;
	realm: string;
	last_crawled_at: string;
	profile_url: string;
	profile_banner: string;
}

interface AzeriteSpell {
	id: number;
	school: number;
	icon: string;
	name: string;
	rank: number | null;
}

interface AzeritePower {
	id: number;
	spell: AzeriteSpell;
	tier: number;
}

interface Corruption {
	added: number;
	resisted: number;
	total: number;
	cloakRank?: number;
	spells?: unknown[];
}

interface GemDetail {
	id: number;
	name: string;
	icon: string;
}

interface EnchantDetail {
	id: number;
	name: string;
	icon: string;
}

interface GearItem {
	item_id: number;
	item_level: number;
	icon: string;
	name: string;
	item_quality: number;
	is_legendary: boolean;
	is_azerite_armor: boolean;
	azerite_powers: (AzeritePower | null)[];
	corruption: Corruption;
	domination_shards: unknown[];
	tier?: string;
	gems: number[];
	gems_detail: GemDetail[];
	enchants: number[];
	enchants_detail: EnchantDetail[];
	bonuses: number[];
	enchant?: number;
}

interface GearItems {
	head: GearItem;
	neck: GearItem;
	shoulder: GearItem;
	back: GearItem;
	chest: GearItem;
	waist: GearItem;
	wrist: GearItem;
	hands: GearItem;
	legs: GearItem;
	feet: GearItem;
	finger1: GearItem;
	finger2: GearItem;
	trinket1: GearItem;
	trinket2: GearItem;
	mainhand: GearItem;
	offhand?: GearItem;
}

interface Gear {
	created_at: string;
	updated_at: string;
	source: string;
	item_level_equipped: number;
	item_level_total: number;
	artifact_traits: number;
	corruption: Corruption;
	items: GearItems;
}

export type { Gear };
