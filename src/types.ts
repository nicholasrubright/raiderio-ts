// Generic relationship schema constraint - used by all endpoints
export type RelationshipSchema = Record<string, unknown>;

// Generic include type that works with any relationship schema
export type Include<TRelations extends RelationshipSchema> = {
	[K in keyof TRelations]?: boolean;
};

// Official TypeScript utility for forcing type expansion in IDEs
export type Evaluate<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// Generic result type that works with any base type and relationship schema
export type WithIncludes<
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
