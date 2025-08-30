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
import { RaiderIOClient } from 'raiderio-ts';

const client = new RaiderIOClient();

// Get basic character profile
const character = await client.getCharacter('characterName', 'realmName', 'us');
console.log(character.name, character.class, character.active_spec_name);

// Get character with gear data
const characterWithGear = await client.getCharacter('characterName', 'realmName', 'us', {
  include: { gear: true }
});
console.log(characterWithGear.gear.item_level_equipped);
```

## API Reference

### `getCharacter(name, realm, region, options?)`

Fetches a character profile from RaiderIO.

**Parameters:**
- `name` - Character name
- `realm` - Server realm name  
- `region` - Region code (e.g., 'us', 'eu')
- `options.include.gear` - Include gear data (optional)

**Returns:** Character profile with optional gear data

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