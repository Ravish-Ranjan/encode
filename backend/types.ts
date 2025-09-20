import type { Request } from "express";

export enum QrFormat {
	TEXT_URL = "text_url",
	VCARD = "vcard",
	MECARD = "mecard",
	WIFI = "wifi",
	EMAIL = "email",
	SMS = "sms",
	TELEPHONE = "telephone",
	GEO_LOCATION = "geo_location",
	EVENT = "calendar_event",
	BITCOIN = "bitcoin",
	UPI = "upi",
}

export type QrFormatMap = {
	[QrFormat.BITCOIN]: QrFormats.BitCoin;
	[QrFormat.EMAIL]: QrFormats.Email;
	[QrFormat.EVENT]: QrFormats.Event;
	[QrFormat.GEO_LOCATION]: QrFormats.GeoLocation;
	[QrFormat.MECARD]: QrFormats.MeCard;
	[QrFormat.SMS]: QrFormats.Sms;
	[QrFormat.TELEPHONE]: QrFormats.Telephone;
	[QrFormat.TEXT_URL]: QrFormats.TextUrl;
	[QrFormat.UPI]: QrFormats.Upi;
	[QrFormat.VCARD]: QrFormats.VCard;
	[QrFormat.WIFI]: QrFormats.Wifi;
};

export namespace QrFormats {
	export type TextUrl = {
		text_url: string;
	};

	export type VCard = {
		firstName: string;
		lastName?: string;
		orgName?: string;
		title?: string;
		telephoneCell?: string;
		telephoneWork?: string;
		email?: string;
		url?: string;
		address?: string;
	};

	export type MeCard = {
		name: string;
		telephone?: string;
		email?: string;
		address?: string;
		url?: string;
	};

	export type Wifi = {
		type: "WPA" | "WEP" | "nopass";
		ssid: string;
		password?: string;
	};

	export type Email = {
		email: string;
		subject?: string;
		body?: string;
	};

	export type Sms = {
		to: string;
		message?: string;
	};

	export type Telephone = {
		telephone: string;
	};

	export type GeoLocation = {
		latitude: number;
		longitude: number;
		label?: string;
	};

	export type Event = {
		summary: string;
		dateStart?: string;
		dateEnd?: string;
		location?: string;
		description?: string;
	};

	export type BitCoin = {
		address: string;
		amount?: number;
		label?: string;
		message?: string;
	};

	export type Upi = {
		upi_id: string;
		amount: number;
		name?: string;
		currency?: string;
		note?: string;
	};
}

export type QrData = {
	[k in keyof QrFormatMap]: {
		type: k;
		data: QrFormatMap[k];
	};
}[keyof QrFormatMap];

export interface QrRequest extends Request {
	qrData?: QrData;
}
