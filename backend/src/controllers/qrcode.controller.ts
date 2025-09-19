import type { Response } from "express";
import qr from "qrcode";
import type { QrData, QrRequest, QrFormats } from "../../types";
import { QrFormat } from "../../types";

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
			const amount = BitcoinData.amount
				? encodeURIComponent(BitcoinData.amount)
				: "";
			const label = BitcoinData.label
				? encodeURIComponent(BitcoinData.label)
				: "";
			const message = BitcoinData.message
				? encodeURIComponent(BitcoinData.message)
				: "";
			return `bitcoin:${BitcoinData.address}?amount=${amount}&label=${label}&message=${message}`;
		}
		case QrFormat.EMAIL: {
			const EmailData = data as QrFormats.Email;
			const subject = EmailData.subject
				? encodeURIComponent(EmailData.subject)
				: "";
			const body = EmailData.body
				? encodeURIComponent(EmailData.body)
				: "";
			return `mailto:${EmailData.email}?subject=${subject}&body=${body}`;
		}
		case QrFormat.EVENT: {
			const EventData = data as QrFormats.Event;
			const form: string[] = [
				"BEGIN:VEVENT",
				`SUMMARY:${EventData.summary}`,
				`DTSTART:${
					EventData.dateStart
						? toBasicISO(new Date(EventData.dateStart))
						: ""
				}`,
				`DTEND:${
					EventData.dateEnd
						? toBasicISO(new Date(EventData.dateEnd))
						: ""
				}`,
				`LOCATION:${EventData.location || ""}`,
				`DESCRIPTION:${EventData.description || ""}`,
				"END:VEVENT",
			];
			return encodeURIComponent(form.join("\n"));
		}
		case QrFormat.GEO_LOCATION: {
			const GeoLocationData = data as QrFormats.GeoLocation;
			const label = GeoLocationData.label
				? `?q=${encodeURIComponent(GeoLocationData.label)}`
				: "";
			return (
				`geo:${GeoLocationData.latitude},${GeoLocationData.longitude}` +
				label
			);
		}
		case QrFormat.MECARD: {
			const MeCardData = data as QrFormats.MeCard;

			return `MECARD:N:${MeCardData.name.replaceAll(" ", ",")};TEL:${
				MeCardData.telephone || ""
			};EMAIL:${MeCardData.email || ""};ADR:${
				MeCardData.address || ""
			};URL:${MeCardData.url || ""};;`;
		}
		case QrFormat.SMS: {
			const SmsData = data as QrFormats.Sms;
			return `SMSTO:${SmsData.to}:${SmsData.message || ""}`;
		}
		case QrFormat.TELEPHONE: {
			const TelephoneData = data as QrFormats.Telephone;
			return `TEL:${TelephoneData.telephone}`;
		}
		case QrFormat.TEXT_URL: {
			const TextUrlData = data as QrFormats.TextUrl;
			return `${TextUrlData.text_url}`;
		}
		case QrFormat.UPI: {
			const UpiData = data as QrFormats.Upi;
			const name = encodeURIComponent(UpiData.name);
			const note = UpiData.note ? encodeURIComponent(UpiData.note) : "";
			return (
				`upi://pay?pa=${UpiData.upi_id}&pn=${name}` +
				(UpiData.amount ? `&am=${UpiData.amount}` : "") +
				`&cu=${UpiData.currency || "INR"}` +
				(UpiData.note ? `&tn=${note}` : "")
			);
		}
		case QrFormat.VCARD: {
			const VcardData = data as QrFormats.VCard;
			const form: string[] = [
				"BEGIN:VCARD;",
				"VERSION:3.0;",
				`N:${VcardData.firstName || ""};${VcardData.lastName || ""};;;`,
				`FN:${
					(VcardData.firstName || "") +
					" " +
					(VcardData.lastName || "")
				}`,
				`ORG:${VcardData.orgName || ""}`,
				`TITLE:${VcardData.title || ""}`,
				`TEL;TYPE=cell:${VcardData.telephoneCell || ""}`,
				`TEL;TYPE=work:${VcardData.telephoneWork || ""}`,
				`EMAIL:${VcardData.email || ""}`,
				`URL:${VcardData.url || ""}`,
				`ADR:${VcardData.address || ""}`,
				"END:VCARD",
			];
			return form.join("\n");
		}
		case QrFormat.WIFI: {
			const WifiData = data as QrFormats.Wifi;
			return `WIFI:T:${WifiData.type};S:${WifiData.ssid || ""};P:${
				WifiData.password || ""
			};;`;
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

		res.setHeader("Content-Type", "image/png");

		if (!qrData) {
			return res.status(404).json({ msg: "no data to create qrcode" });
		}
		const strData = formatQrData(qrData);
		await qr.toFileStream(res, strData);
	} catch (error) {
		console.log("Error :", error);
		return res.status(500).json({ msg: "error creating qrcode" });
	}
};
