import { NotFoundError } from "../types";

export default class AppError extends Error {
	requiredFields: string[];
	optionalFields: string[] | undefined;
	constructor(errorData: NotFoundError) {
		super(errorData.message || "An error occured");

		this.message = errorData.message;
		this.requiredFields = errorData.requiredFields;
		this.optionalFields = errorData.optionalFields;
	}
}
