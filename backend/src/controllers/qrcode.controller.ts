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
			return `upi://pay?pa=${UpiData.upiId}&pn=${name}` + UpiData.ammount
				? `&am=${UpiData.ammount}`
				: "" + `&cu=${UpiData.currency || "INR"}` + UpiData.note
				? `&tn=${note}`
				: "";
		}
		case QrFormat.VCARD: {
			const VcardData = data as QrFormats.VCard;
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

