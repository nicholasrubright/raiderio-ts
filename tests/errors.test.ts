import test from 'ava';
import { RaiderIOAPIError } from '../src/errors';

test('RaiderIOAPIError constructs correctly', t => {
	const error = new RaiderIOAPIError('Test error message', 404);
	
	t.is(error.name, 'RaiderIOAPIError');
	t.is(error.message, 'Test error message');
	t.is(error.status, 404);
	t.true(error instanceof Error);
	t.true(error instanceof RaiderIOAPIError);
});

test('RaiderIOAPIError inherits from Error', t => {
	const error = new RaiderIOAPIError('Test error', 500);
	
	t.true(error instanceof Error);
	t.is(error.name, 'RaiderIOAPIError');
});

test('RaiderIOAPIError preserves stack trace', t => {
	const error = new RaiderIOAPIError('Test error', 400);
	
	t.truthy(error.stack);
	t.true(error.stack!.includes('RaiderIOAPIError'));
});

test('RaiderIOAPIError with different status codes', t => {
	const error404 = new RaiderIOAPIError('Not found', 404);
	const error500 = new RaiderIOAPIError('Server error', 500);
	const error401 = new RaiderIOAPIError('Unauthorized', 401);
	
	t.is(error404.status, 404);
	t.is(error500.status, 500);
	t.is(error401.status, 401);
	
	t.is(error404.message, 'Not found');
	t.is(error500.message, 'Server error');
	t.is(error401.message, 'Unauthorized');
});