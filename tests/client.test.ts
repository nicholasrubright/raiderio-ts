import test from 'ava';
import { RaiderIOClient } from '../src/client';
import { CharacterEndpoint } from '../src/endpoints/character';

test('RaiderIOClient initializes correctly', t => {
	const client = new RaiderIOClient();
	
	t.truthy(client);
	t.truthy(client.character);
	t.true(client.character instanceof CharacterEndpoint);
});

test('RaiderIOClient character endpoint is accessible', t => {
	const client = new RaiderIOClient();
	
	t.truthy(client.character);
	t.is(typeof client.character.getProfile, 'function');
});