# raiderio-ts

TypeScript library for the RaiderIO API, providing World of Warcraft character and guild data.

## Installation

```bash
npm install raiderio-ts
# or
pnpm add raiderio-ts
# or  
yarn add raiderio-ts
```

## Quick Start

```typescript
import { RaiderIOClient, type CharacterProfile } from 'raiderio-ts';

const client = new RaiderIOClient();

// Get basic character profile
const character: CharacterProfile = await client.character.getProfile('characterName', 'realmName', 'us');
console.log(character.name, character.class, character.active_spec_name);

// Get character with gear data (TypeScript automatically infers the extended type)
const characterWithGear = await client.character.getProfile('characterName', 'realmName', 'us', {
  include: { gear: true }
});
console.log(characterWithGear.gear.item_level_equipped); // Type-safe access to gear data
```

## API Reference

### `client.character.getProfile(name, realm, region, options?)`

Fetches a character profile from RaiderIO with optional relationship data.

**Parameters:**
- `name` - Character name
- `realm` - Server realm name  
- `region` - Region code (e.g., 'us', 'eu')
- `options.include` - Object specifying which relationships to include
  - `options.include.gear` - Include gear data (boolean)

**Returns:** 
- `CharacterProfile` - Base character profile
- `CharacterProfile & { gear: Gear }` - Profile with gear data when `include.gear: true`

The method uses TypeScript overloading to provide type-safe conditional returns based on the include options specified.

## Type Exports

The library exports TypeScript types for enhanced type safety:

```typescript
import type { 
  CharacterProfile,
  Gear,
  RaiderIOAPIError 
} from 'raiderio-ts';

// Type the character profile response
const character: CharacterProfile = await client.character.getProfile('name', 'realm', 'us');

// When including gear, TypeScript automatically infers the extended type
const characterWithGear = await client.character.getProfile('name', 'realm', 'us', { 
  include: { gear: true } 
});
// characterWithGear.gear is typed as Gear
```

## Error Handling

The library provides a custom error class for API-related errors:

```typescript
import { RaiderIOClient, RaiderIOAPIError } from 'raiderio-ts';

try {
  const character = await client.character.getProfile('name', 'realm', 'us');
} catch (error) {
  if (error instanceof RaiderIOAPIError) {
    console.error(`API Error ${error.status}: ${error.message}`);
  }
}
```

## Development

```bash
# Build the library
pnpm build

# Run type checking  
pnpm typecheck

# Run linting/formatting
pnpm check
pnpm check:write
```

## License

MIT