import qr from "qrcode";
import type { QrData, QrFormats } from "../types";
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

export function formatQrData(qrData: QrData): string {
	const { type, data } = qrData;

	switch (type) {
		case QrFormat.BITCOIN: {
			const bitcoinData = data as QrFormats.BitCoin;
			const params: string[] = [];

			if (bitcoinData.amount)
				params.push(`amount=${encodeURIComponent(bitcoinData.amount)}`);

			if (bitcoinData.label)
				params.push(`label=${encodeURIComponent(bitcoinData.label)}`);

			if (bitcoinData.message)
				params.push(
					`message=${encodeURIComponent(bitcoinData.message)}`,
				);

			const queryString = params.length ? `?${params.join("&")}` : "";

			return `bitcoin:${bitcoinData.address}${queryString}`;
		}

		case QrFormat.EMAIL: {
			const emailData = data as QrFormats.Email;
			const params: string[] = [];

			if (emailData.subject)
				params.push(`subject=${encodeURIComponent(emailData.subject)}`);

			if (emailData.body)
				params.push(`body=${encodeURIComponent(emailData.body)}`);

			const queryString = params.length ? `?${params.join("&")}` : "";

			return `mailto:${emailData.email}${queryString}`;
		}

		case QrFormat.EVENT: {
			const eventData = data as QrFormats.Event;

			const form: string[] = [
				"BEGIN:VCALENDAR",
				"VERSION:2.0",
				"BEGIN:VEVENT",
				`SUMMARY:${eventData.summary}`,
			];

			if (eventData.dateStart)
				form.push(
					`DTSTART:${toBasicISO(new Date(eventData.dateStart))}`,
				);

			if (eventData.dateEnd)
				form.push(`DTEND:${toBasicISO(new Date(eventData.dateEnd))}`);

			if (eventData.location) form.push(`LOCATION:${eventData.location}`);

			if (eventData.description)
				form.push(`DESCRIPTION:${eventData.description}`);

			form.push("END:VEVENT", "END:VCALENDAR");

			return form.join("\r\n");
		}

		case QrFormat.GEO_LOCATION: {
			const geoLocationData = data as QrFormats.GeoLocation;

			const label = geoLocationData.label
				? `?q=${encodeURIComponent(geoLocationData.label)}`
				: "";

			return `geo:${geoLocationData.latitude},${geoLocationData.longitude}${label}`;
		}

		case QrFormat.MECARD: {
			const mecardData = data as QrFormats.MeCard;

			let base = `MECARD:N:${mecardData.name.replaceAll(" ", ",")};`;

			if (mecardData.telephone) base += `TEL:${mecardData.telephone};`;
			if (mecardData.email) base += `EMAIL:${mecardData.email};`;
			if (mecardData.address) base += `ADR:${mecardData.address};`;
			if (mecardData.url) base += `URL:${mecardData.url};`;

			return `${base};`;
		}

		case QrFormat.SMS: {
			const smsData = data as QrFormats.Sms;

			return `SMSTO:${smsData.to}:${smsData.message || ""}`;
		}

		case QrFormat.TELEPHONE: {
			const telephoneData = data as QrFormats.Telephone;

			return `tel:${telephoneData.telephone}`;
		}

		case QrFormat.TEXT_URL: {
			const textUrlData = data as QrFormats.TextUrl;

			return textUrlData.text_url;
		}

		case QrFormat.UPI: {
			const upiData = data as QrFormats.Upi;

			const params: string[] = [`pa=${upiData.upi_id}`];

			if (upiData.name)
				params.push(`pn=${encodeURIComponent(upiData.name)}`);

			if (upiData.amount) params.push(`am=${upiData.amount}`);

			params.push(`cu=${upiData.currency || "INR"}`);

			if (upiData.note)
				params.push(`tn=${encodeURIComponent(upiData.note)}`);

			return `upi://pay?${params.join("&")}`;
		}

		case QrFormat.VCARD: {
			const vcardData = data as QrFormats.VCard;

			const form: string[] = [
				"BEGIN:VCARD",
				"VERSION:3.0",
				`N:${vcardData.lastName || ""};${vcardData.firstName || ""};;;`,
				`FN:${(vcardData.firstName || "") + " " + (vcardData.lastName || "")}`,
			];

			if (vcardData.orgName) form.push(`ORG:${vcardData.orgName}`);

			if (vcardData.title) form.push(`TITLE:${vcardData.title}`);

			if (vcardData.telephoneCell)
				form.push(`TEL;TYPE=CELL,VOICE:${vcardData.telephoneCell}`);

			if (vcardData.telephoneWork)
				form.push(`TEL;TYPE=WORK,VOICE:${vcardData.telephoneWork}`);

			if (vcardData.email)
				form.push(`EMAIL;TYPE=PREF,INTERNET:${vcardData.email}`);

			if (vcardData.url) form.push(`URL:${vcardData.url}`);

			if (vcardData.address)
				form.push(`ADR;TYPE=HOME:;;${vcardData.address};;;;`);

			form.push("END:VCARD");

			return form.join("\r\n");
		}

		case QrFormat.WIFI: {
			const wifiData = data as QrFormats.Wifi;

			const password =
				wifiData.type !== "nopass" && wifiData.password
					? `P:${wifiData.password};`
					: "";

			return `WIFI:T:${wifiData.type};S:${wifiData.ssid || ""};${password};`;
		}

		default: {
			let result = "";

			Object.keys(data).forEach((key) => {
				result += `${key}:${data[key]},`;
			});

			return result;
		}
	}
}

export async function generateQrImage(qrData: QrData): Promise<Buffer> {
	const payload = formatQrData(qrData);

	return qr.toBuffer(payload, {
		type: "png",
		width: 400,
		color: {
			light: qrData.colours?.bg ?? "#ffffff",
			dark: qrData.colours?.fg ?? "#000000",
		},
	});
}
