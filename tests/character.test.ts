import test from 'ava';
import { CharacterEndpoint } from '../src/endpoints/character';

// Mock KyInstance for testing
const mockHttp = {
	get: (endpoint: string, options?: any) => ({
		json: async () => mockResponse
	})
} as any;

let mockResponse: any;

test.beforeEach(t => {
	mockResponse = {
		name: 'Testchar',
		race: 'Human',
		class: 'Warrior',
		active_spec_name: 'Protection',
		active_spec_role: 'TANK',
		gender: 'Male',
		faction: 'Alliance',
		achievement_points: 12345,
		thumbnail_url: 'https://example.com/thumb.jpg',
		region: 'us',
		realm: 'stormrage',
		last_crawled_at: '2023-01-01T00:00:00.000Z',
		profile_url: 'https://raider.io/characters/us/stormrage/Testchar',
		profile_banner: 'https://example.com/banner.jpg'
	};
});

test('CharacterEndpoint constructs correctly', t => {
	const endpoint = new CharacterEndpoint(mockHttp);
	t.truthy(endpoint);
	t.is(typeof endpoint.getProfile, 'function');
});

test('getProfile returns character profile without includes', async t => {
	const endpoint = new CharacterEndpoint(mockHttp);
	
	const profile = await endpoint.getProfile('testchar', 'stormrage', 'us');
	
	t.is(profile.name, 'Testchar');
	t.is(profile.realm, 'stormrage');
	t.is(profile.region, 'us');
	t.is(profile.class, 'Warrior');
});

test('getProfile with gear include adds gear data', async t => {
	mockResponse.gear = {
		created_at: '2023-01-01T00:00:00.000Z',
		updated_at: '2023-01-01T00:00:00.000Z',
		source: 'armory',
		item_level_equipped: 450,
		item_level_total: 460,
		artifact_traits: 0,
		corruption: { added: 0, resisted: 0, total: 0 },
		items: {}
	};

	const endpoint = new CharacterEndpoint(mockHttp);
	
	const profile = await endpoint.getProfile('testchar', 'stormrage', 'us', { gear: true });
	
	t.is(profile.name, 'Testchar');
	t.truthy((profile as any).gear);
	t.is((profile as any).gear.item_level_equipped, 450);
});

test('createSearchParams builds correct base parameters', t => {
	const endpoint = new CharacterEndpoint(mockHttp);
	
	// Access protected method for testing
	const searchParams = (endpoint as any).createSearchParams(
		{ region: 'us', realm: 'stormrage', name: 'testchar' },
		{ gear: {} },
		undefined
	);
	
	t.is(searchParams.region, 'us');
	t.is(searchParams.realm, 'stormrage');
	t.is(searchParams.name, 'testchar');
	t.is(searchParams.fields, undefined);
});

test('createSearchParams includes fields when includes provided', t => {
	const endpoint = new CharacterEndpoint(mockHttp);
	
	// Access protected method for testing
	const searchParams = (endpoint as any).createSearchParams(
		{ region: 'us', realm: 'stormrage', name: 'testchar' },
		{ gear: {} },
		{ gear: true }
	);
	
	t.is(searchParams.region, 'us');
	t.is(searchParams.realm, 'stormrage');
	t.is(searchParams.name, 'testchar');
	t.is(searchParams.fields, 'gear');
});