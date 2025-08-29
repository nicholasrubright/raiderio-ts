export class RaiderIOAPIError extends Error {
	public status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "RaiderIOAPIError";
		this.status = status;
	}
}
