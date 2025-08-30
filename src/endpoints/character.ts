import type { CharacterProfile, Gear } from "../responses";
import type { Include, RelationshipSchema, WithIncludes } from "../types";
import { BaseEndpoint } from "./base";

// Character-specific type configuration
export interface CharacterFieldConfig extends RelationshipSchema {
	gear: Gear;
}

export type CharacterInclude = Include<CharacterFieldConfig>;
export type CharacterWithIncludes<T extends CharacterInclude = Record<string, never>> =
	WithIncludes<CharacterProfile, CharacterFieldConfig, T>;

export class CharacterEndpoint extends BaseEndpoint {
	async getProfile(name: string, realm: string, region: string): Promise<CharacterProfile>;
	async getProfile<T extends CharacterInclude>(
		name: string,
		realm: string,
		region: string,
		include: T,
	): Promise<CharacterWithIncludes<T>>;
	async getProfile<T extends CharacterInclude>(
		name: string,
		realm: string,
		region: string,
		include?: T,
	): Promise<CharacterProfile | CharacterWithIncludes<T>> {
		const baseParams = {
			region: region,
			realm: realm,
			name: name,
		};

		const characterRelations: CharacterFieldConfig = {
			gear: {} as Gear,
		};

		const searchParams = this.createSearchParams(baseParams, characterRelations, include);

		return this.fetch<CharacterProfile | CharacterWithIncludes<T>>(
			"characters/profile",
			searchParams,
		);
	}
}
