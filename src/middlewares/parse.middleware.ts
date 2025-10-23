import { QrFormat as QrF, QrRequest, QrFormatMap, QrData } from "../types";
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

function notFoundMesage(fields: string[]): string {
	return `Required files are not given (${fields.join(",")})`;
}

function keysChecker(ob: Object, QrType: QrF): string | undefined {
	const keys = Object.keys(ob);
	if (QrType === QrF.BITCOIN) {
		if (!keys.includes("address")) return notFoundMesage(["address"]);
	} else if (QrType === QrF.EMAIL) {
		if (!keys.includes("email")) return notFoundMesage(["email"]);
	} else if (QrType === QrF.EVENT) {
		if (!keys.includes("summary")) return notFoundMesage(["summary"]);
	} else if (QrType === QrF.GEO_LOCATION) {
		if (!keys.includes("latitude") || !keys.includes("longitude"))
			return notFoundMesage(["latitude", "longitude"]);
	} else if (QrType == QrF.MECARD) {
		if (!keys.includes("name")) return notFoundMesage(["name"]);
	} else if (QrType == QrF.SMS) {
		if (!keys.includes("to")) return notFoundMesage(["to"]);
	} else if (QrType == QrF.TELEPHONE) {
		if (!keys.includes("telephone")) return notFoundMesage(["telephone"]);
	} else if (QrType == QrF.TEXT_URL) {
		if (!keys.includes("text_url")) return notFoundMesage(["text_url"]);
	} else if (QrType == QrF.UPI) {
		if (!keys.includes("upi_id") || !keys.includes("amount"))
			return notFoundMesage(["upi_id", "amount"]);
	} else if (QrType == QrF.VCARD) {
		if (!keys.includes("firstName")) return notFoundMesage(["firstName"]);
	} else if (QrType == QrF.WIFI) {
		if (!keys.includes("type") || !keys.includes("ssid"))
			return notFoundMesage(["type", "ssid"]);
	}
}

function isHexColor(str: string) {
	return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(str);
}

export const parseParam = async (
	req: QrRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { type } = req.params;
		const QrType = type ? typemap(type) : QrFormat.TEXT_URL;
		const { fg, bg } = req.query;
		const err = keysChecker(req.query, QrType);
		if (err) return res.status(404).json({ msg: err });

		const qrColours: {
			fg?: string;
			bg?: string;
		} = {};

		if (typeof fg === "string" && isHexColor(fg.trim())) {
			qrColours.fg = fg.trim();
		}

		if (typeof bg === "string" && isHexColor(bg.trim())) {
			qrColours.bg = bg.trim();
		}

		req.qrData = {
			type: QrType,
			data: req.query as QrFormatMap[QrF],
			colours: qrColours,
		} as QrData;
		next();
	} catch (error) {
		console.log("error", error);
		return res.status(500).json({ msg: error });
	}
};

export const parseBody = async (
	req: QrRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { type } = req.params;
		const QrType = type ? typemap(type) : QrFormat.TEXT_URL;
		const { fg, bg } = req.body;
		const err = keysChecker(req.body, QrType);
		if (err) return res.status(404).json({ msg: err });

		const qrColours: {
			fg?: string;
			bg?: string;
		} = {};

		if (typeof fg === "string" && isHexColor(fg.trim())) {
			qrColours.fg = fg.trim();
		}

		if (typeof bg === "string" && isHexColor(bg.trim())) {
			qrColours.bg = bg.trim();
		}

		req.qrData = {
			type: QrType,
			data: req.body as QrFormatMap[QrF],
			colours: qrColours,
		} as QrData;
		next();
	} catch (error) {
		console.log("error", error);
		return res.status(500).json({ msg: error });
	}
};
