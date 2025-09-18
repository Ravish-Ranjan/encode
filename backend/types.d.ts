declare enum QrFormat {
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

type QrFormatMap = {
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

declare namespace QrFormats {
	type TextUrl = {
		text_url: string;
	};

	type VCard = {
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

	type MeCard = {
		name: string;
		telephone?: string;
		email?: string;
		address?: string;
		url?: string;
	};

	type Wifi = {
		type: "WPA" | "WEP" | "nopass";
		ssid: string;
		password?: string;
	};

	type Email = {
		email: string;
		subject?: string;
		body?: string;
	};

	type Sms = {
		to: string;
		message?: string;
	};

	type Telephone = {
		telephone: string;
	};

	type GeoLocation = {
		latitude: number;
		longitude: number;
		label?: string;
	};

	type Event = {
		summary: string;
		dateStart?: string;
		dateEnd?: string;
		location?: string;
		description?: string;
	};

	type BitCoin = {
		address: string;
		amount?: number;
		label?: string;
		message?: string;
	};

	type Upi = {
		upiId: string;
		name: string;
		ammount?: number;
		currency?: string;
		note?: string;
	};
}

type QrData = {
	[k in keyof QrFormatMap]: {
		type: k;
		data: QrFormats[k];
	};
}[keyof QrFormatMap];

declare namespace QrExpress {
	type Request = import("express").Request;
	type Response = import("express").Response;
	type NextFunction = import("express").NextFunction;

	interface QrRequest extends Request {
		qrData?: QrData;
	}
}
