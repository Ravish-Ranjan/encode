import type { Response } from "express";
import qr from "qrcode";
import type { QrData, QrRequest, QrFormats } from "../types";
import { QrFormat } from "../types";

function toBasicISO(date: Date) {
	const pad = (n: number) => n.toString().padStart(2, "0");

	return (
		date.getUTCFullYear().toString() +
		pad(date.getUTCMonth() + 1) +
		pad(date.getUTCDate()) +
		"T" +
		pad(date.getUTCHours()) +
		pad(date.getUTCMinutes()) +
		pad(date.getUTCSeconds()) +
		"Z"
	);
}

function formatQrData(qrData: QrData): string {
	const { type, data } = qrData;

	switch (type) {
		case QrFormat.BITCOIN: {
			const BitcoinData = data as QrFormats.BitCoin;
			const params: string[] = [];
			if (BitcoinData.amount) params.push(`amount=${encodeURIComponent(BitcoinData.amount)}`);
			if (BitcoinData.label) params.push(`label=${encodeURIComponent(BitcoinData.label)}`);
			if (BitcoinData.message) params.push(`message=${encodeURIComponent(BitcoinData.message)}`);
			
			const queryString = params.length ? `?${params.join("&")}` : "";
			return `bitcoin:${BitcoinData.address}${queryString}`;
		}

		case QrFormat.EMAIL: {
			const EmailData = data as QrFormats.Email;
			const params: string[] = [];
			if (EmailData.subject) params.push(`subject=${encodeURIComponent(EmailData.subject)}`);
			if (EmailData.body) params.push(`body=${encodeURIComponent(EmailData.body)}`);
			
			const queryString = params.length ? `?${params.join("&")}` : "";
			return `mailto:${EmailData.email}${queryString}`;
		}

		case QrFormat.EVENT: {
			const EventData = data as QrFormats.Event;
			const form: string[] = [
				"BEGIN:VCALENDAR",
				"VERSION:2.0",
				"BEGIN:VEVENT",
				`SUMMARY:${EventData.summary}`,
			];
			if (EventData.dateStart) form.push(`DTSTART:${toBasicISO(new Date(EventData.dateStart))}`);
			if (EventData.dateEnd) form.push(`DTEND:${toBasicISO(new Date(EventData.dateEnd))}`);
			if (EventData.location) form.push(`LOCATION:${EventData.location}`);
			if (EventData.description) form.push(`DESCRIPTION:${EventData.description}`);
			
			form.push("END:VEVENT", "END:VCALENDAR");
			return form.join("\r\n");
		}

		case QrFormat.GEO_LOCATION: {
			const GeoLocationData = data as QrFormats.GeoLocation;
			const label = GeoLocationData.label
				? `?q=${encodeURIComponent(GeoLocationData.label)}`
				: "";
			return `geo:${GeoLocationData.latitude},${GeoLocationData.longitude}${label}`;
		}

		case QrFormat.MECARD: {
			const MeCardData = data as QrFormats.MeCard;
			let base = `MECARD:N:${MeCardData.name.replaceAll(" ", ",")};`;
			if (MeCardData.telephone) base += `TEL:${MeCardData.telephone};`;
			if (MeCardData.email) base += `EMAIL:${MeCardData.email};`;
			if (MeCardData.address) base += `ADR:${MeCardData.address};`;
			if (MeCardData.url) base += `URL:${MeCardData.url};`;
			return `${base};`;
		}

		case QrFormat.SMS: {
			const SmsData = data as QrFormats.Sms;
			return `SMSTO:${SmsData.to}:${SmsData.message || ""}`;
		}

		case QrFormat.TELEPHONE: {
			const TelephoneData = data as QrFormats.Telephone;
			return `tel:${TelephoneData.telephone}`; 
		}

		case QrFormat.TEXT_URL: {
			const TextUrlData = data as QrFormats.TextUrl;
			return `${TextUrlData.text_url}`;
		}

		case QrFormat.UPI: {
			const UpiData = data as QrFormats.Upi;
			const params: string[] = [`pa=${UpiData.upi_id}`];
			if (UpiData.name) params.push(`pn=${encodeURIComponent(UpiData.name)}`);
			if (UpiData.amount) params.push(`am=${UpiData.amount}`);
			params.push(`cu=${UpiData.currency || "INR"}`);
			if (UpiData.note) params.push(`tn=${encodeURIComponent(UpiData.note)}`);
			
			return `upi://pay?${params.join("&")}`;
		}

		case QrFormat.VCARD: {
			const VcardData = data as QrFormats.VCard;
			const form: string[] = [
				"BEGIN:VCARD",
				"VERSION:3.0",
				`N:${VcardData.lastName || ""};${VcardData.firstName || ""};;;`,
				`FN:${(VcardData.firstName || "") + " " + (VcardData.lastName || "")}`
			];
			if (VcardData.orgName) form.push(`ORG:${VcardData.orgName}`);
			if (VcardData.title) form.push(`TITLE:${VcardData.title}`);
			if (VcardData.telephoneCell) form.push(`TEL;TYPE=CELL,VOICE:${VcardData.telephoneCell}`);
			if (VcardData.telephoneWork) form.push(`TEL;TYPE=WORK,VOICE:${VcardData.telephoneWork}`);
			if (VcardData.email) form.push(`EMAIL;TYPE=PREF,INTERNET:${VcardData.email}`);
			if (VcardData.url) form.push(`URL:${VcardData.url}`);
			if (VcardData.address) form.push(`ADR;TYPE=HOME:;;${VcardData.address};;;;`);
			
			form.push("END:VCARD");
			return form.join("\r\n");
		}

		case QrFormat.WIFI: {
			const WifiData = data as QrFormats.Wifi;
			const pass = WifiData.type !== "nopass" && WifiData.password ? `P:${WifiData.password};` : "";
			return `WIFI:T:${WifiData.type};S:${WifiData.ssid || ""};${pass};`;
		}

		default: {
			let str = "";
			Object.keys(data).map((key) => {
				str += `${key}:${data[key]},`;
			});
			return str;
		}
	}
}

export const createQr = async (req: QrRequest, res: Response) => {
	try {
		const qrData = req.qrData;
		const colours = req.qrData?.colours;
		res.setHeader("Content-Type", "image/png");
		res.setHeader("Access-Control-Allow-Origin", "*"); 
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); 
		res.setHeader("Access-Control-Allow-Headers", "Content-Type"); 

		if (!qrData) {
			return res.status(404).json({ msg: "no data to create qrcode" });
		}
		const strData = formatQrData(qrData);
		await qr.toFileStream(res, strData, {
			width: 400,
			color: {
				light: colours?.bg ?? "#ffffff",
				dark: colours?.fg ?? "#000000",
			},
		});
	} catch (error) {
		console.log("Error :", error);
		return res.status(500).json({ msg: "error creating qrcode" });
	}
};