import ky, { type KyInstance } from "ky";
import { CharacterEndpoint } from "./endpoints/character";

export class RaiderIOClient {
	private http: KyInstance;
	public readonly character: CharacterEndpoint;

	constructor() {
		this.http = ky.create({
			prefixUrl: "https://raider.io/api/v1",
		});

		this.character = new CharacterEndpoint(this.http);
	}
}
