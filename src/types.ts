import type { CharacterProfile, Gear } from "./responses";

// Generic relationship schema constraint
export type RelationshipSchema = Record<string, any>;

// Generic include type that works with any relationship schema
export type Include<TRelations extends RelationshipSchema> = {
	[K in keyof TRelations]?: boolean;
};

// Official TypeScript utility for forcing type expansion in IDEs
type Evaluate<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// Generic result type that works with any base type and relationship schema
type WithIncludes<
	TBase,
	TRelations extends RelationshipSchema,
	TInclude extends Include<TRelations>,
> = Evaluate<
	TBase & {
		[K in keyof TInclude as TInclude[K] extends true ? K : never]: K extends keyof TRelations
			? TRelations[K]
			: never;
	}
>;

// Entity Configuration
interface CharacterFieldConfig {
	gear: Gear;
}

type CharacterInclude = Include<CharacterFieldConfig>;
type CharacterWithIncludes<T extends CharacterInclude = {}> = WithIncludes<
	CharacterProfile,
	CharacterFieldConfig,
	T
>;

export type { CharacterFieldConfig, CharacterWithIncludes, CharacterInclude };
