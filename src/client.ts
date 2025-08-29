import ky, { HTTPError, type KyInstance } from "ky";
import { RaiderIOAPIError } from "./errors";
import type { CharacterProfile, Gear } from "./responses";
import type {
	CharacterFieldConfig,
	CharacterInclude,
	CharacterWithIncludes,
	Include,
	RelationshipSchema,
} from "./types";

export class RaiderIOClient {
	private http: KyInstance;

	constructor() {
		this.http = ky.create({
			prefixUrl: "https://raider.io/api/v1",
		});
	}

	private async fetch<T>(
		endpoint: string,
		searchParams: Record<string, string | number | boolean>,
	): Promise<T> {
		try {
			return await this.http.get(endpoint, { searchParams }).json<T>();
		} catch (error) {
			if (error instanceof HTTPError) {
				throw new RaiderIOAPIError(
					`Failed to fetch from ${endpoint}: ${error.message}`,
					error.response.status,
				);
			}
			throw new RaiderIOAPIError(`Failed to fetch from ${endpoint}: ${error}`, 500);
		}
	}

	/**
	 * Generic method that builds search parameters based on relationship schema and include options.
	 * Takes base parameters and a relationship schema, then returns search parameters with
	 * a 'fields' parameter built from the requested relationships.
	 *
	 * @param baseParams - Base search parameters (e.g., region, realm, name)
	 * @param relationshipMap - Schema defining available relationships for this entity type
	 * @param options - Configuration object with include property specifying which relationships to include
	 * @returns Search parameters object ready for API requests
	 */
	private createSearchParams<
		TRelations extends RelationshipSchema,
		TInclude extends Include<TRelations>,
	>(
		baseParams: Record<string, string | number | boolean>,
		relationshipMap: TRelations,
		options?: { include?: TInclude },
	): Record<string, string | number | boolean> {
		// Start with base parameters
		const searchParams = { ...baseParams };

		// Build fields parameter from include options
		if (options?.include) {
			const fields = Object.entries(options.include)
				.filter(([key, shouldInclude]) => shouldInclude && key in relationshipMap)
				.map(([key, _]) => key)
				.join(",");

			if (fields) {
				searchParams.fields = fields;
			}
		}

		return searchParams;
	}

	async getCharacter(name: string, realm: string, region: string): Promise<CharacterProfile>;
	async getCharacter<T extends CharacterInclude>(
		name: string,
		realm: string,
		region: string,
		options: { include: T },
	): Promise<CharacterWithIncludes<T>>;
	async getCharacter<T extends CharacterInclude>(
		name: string,
		realm: string,
		region: string,
		options?: { include?: T },
	): Promise<CharacterProfile | CharacterWithIncludes<T>> {
		// Define base parameters
		const baseParams = {
			region: "us", // Default region, could be made configurable
			realm: realm,
			name: name,
		};

		// Define character relations schema
		const characterRelations: CharacterFieldConfig = {
			gear: {} as Gear,
		};

		// Build search parameters using the generic method
		const searchParams = this.createSearchParams(baseParams, characterRelations, options);

		// Use the fetch method to make the actual API call
		return this.fetch<CharacterProfile | CharacterWithIncludes<T>>(
			"characters/profile",
			searchParams,
		);
	}
}
