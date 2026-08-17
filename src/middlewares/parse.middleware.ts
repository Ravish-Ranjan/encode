import AppError from "../services/apperror.service";
import {
	QrFormat as QrF,
	QrRequest,
	QrFormatMap,
	QrData,
	NotFoundError,
} from "../types";
import { QrFormat } from "../types";
import type { Response, NextFunction } from "express";

function typemap(type: string): QrF {
	switch (type) {
		case "text_url":
			return QrFormat.TEXT_URL;
		case "vcard":
			return QrFormat.VCARD;
		case "mecard":
			return QrFormat.MECARD;
		case "wifi":
			return QrFormat.WIFI;
		case "email":
			return QrFormat.EMAIL;
		case "sms":
			return QrFormat.SMS;
		case "telephone":
			return QrFormat.TELEPHONE;
		case "geo_location":
			return QrFormat.GEO_LOCATION;
		case "calendar_event":
			return QrFormat.EVENT;
		case "bitcoin":
			return QrFormat.BITCOIN;
		case "upi":
			return QrFormat.UPI;
		default:
			return QrFormat.TEXT_URL;
	}
}

function notFoundMessage(
	requiredFields: string[],
	optionalFields?: string[],
): NotFoundError {
	return {
		message: "Required fields are not given",
		requiredFields,
		optionalFields,
	};
}

function keysChecker(
	data: Record<string, any>,
	qrType: QrF,
): NotFoundError | undefined {
	const keys = Object.keys(data);

	switch (qrType) {
		case QrF.BITCOIN:
			if (!keys.includes("address")) {
				return notFoundMessage(
					["address"],
					["amount", "label", "message"],
				);
			}
			break;

		case QrF.EMAIL:
			if (!keys.includes("email")) {
				return notFoundMessage(["email"], ["subject", "body"]);
			}
			break;

		case QrF.EVENT:
			if (!keys.includes("summary")) {
				return notFoundMessage(
					["summary"],
					["dateStart", "dateEnd", "location", "description"],
				);
			}
			break;

		case QrF.GEO_LOCATION:
			if (!keys.includes("latitude") || !keys.includes("longitude")) {
				return notFoundMessage(["latitude", "longitude"], ["label"]);
			}
			break;

		case QrF.MECARD:
			if (!keys.includes("name")) {
				return notFoundMessage(
					["name"],
					["telephone", "email", "address", "url"],
				);
			}
			break;

		case QrF.SMS:
			if (!keys.includes("to")) {
				return notFoundMessage(["to"], ["message"]);
			}
			break;

		case QrF.TELEPHONE:
			if (!keys.includes("telephone")) {
				return notFoundMessage(["telephone"]);
			}
			break;

		case QrF.TEXT_URL:
			if (!keys.includes("text_url")) {
				return notFoundMessage(["text_url"]);
			}
			break;

		case QrF.UPI:
			if (!keys.includes("upi_id") || !keys.includes("amount")) {
				return notFoundMessage(
					["upi_id", "amount"],
					["name", "currency", "note"],
				);
			}
			break;

		case QrF.VCARD:
			if (!keys.includes("firstName")) {
				return notFoundMessage(
					["firstName"],
					[
						"lastName",
						"orgName",
						"title",
						"telephoneCell",
						"telephoneWork",
						"email",
						"url",
						"address",
					],
				);
			}
			break;

		case QrF.WIFI:
			if (!keys.includes("type") || !keys.includes("ssid")) {
				return notFoundMessage(["type", "ssid"], ["password"]);
			}
			break;
	}
}

function isHexColor(value: string): boolean {
	return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(value);
}

function parseQrRequest(req: QrRequest, source: Record<string, any>): QrData {
	const qrType = typemap(
		typeof req.params.type === "string" ? req.params.type : "",
	);

	const error = keysChecker(source, qrType);

	if (error) throw new AppError(error);

	const { fg, bg } = source;

	const colours: {
		fg?: string;
		bg?: string;
	} = {};

	if (typeof fg === "string" && isHexColor(fg.trim())) colours.fg = fg.trim();
	if (typeof bg === "string" && isHexColor(bg.trim())) colours.bg = bg.trim();

	return {
		type: qrType,
		data: source as QrFormatMap[typeof qrType],
		colours,
	} as QrData;
}

export const parseParam = (
	req: QrRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.qrData = parseQrRequest(req, req.query);
		next();
	} catch (error) {
		if (error instanceof AppError) {
			return res.status(404).json({
				message: error.message,
				requiredFields: error.requiredFields,
				optionalFields: error.optionalFields,
			});
		}

		return res.status(404).json({
			msg: error instanceof Error ? error.message : error,
		});
	}
};

export const parseBody = (
	req: QrRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.qrData = parseQrRequest(req, req.body);
		next();
	} catch (error) {
		if (error instanceof AppError) {
			return res.status(404).json({
				message: error.message,
				requiredFields: error.requiredFields,
				optionalFields: error.optionalFields,
			});
		}

		return res.status(404).json({
			msg: error instanceof Error ? error.message : error,
		});
	}
};
