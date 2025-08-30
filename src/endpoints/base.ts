import { HTTPError, type KyInstance } from "ky";
import { RaiderIOAPIError } from "../errors";
import type { Include, RelationshipSchema } from "../types";

export abstract class BaseEndpoint {
	constructor(protected http: KyInstance) {}

	protected async fetch<T>(
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

	protected createSearchParams<
		TRelations extends RelationshipSchema,
		TInclude extends Include<TRelations>,
	>(
		baseParams: Record<string, string | number | boolean>,
		relationshipMap: TRelations,
		options?: { include?: TInclude },
	): Record<string, string | number | boolean> {
		const searchParams = { ...baseParams };

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
}
