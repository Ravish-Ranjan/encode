export const parseParam = async (
	req: QrExpress.QrRequest,
	res: QrExpress.Response,
	next: QrExpress.NextFunction
) => {
	try {
		const { type: rawType } = req.params;
		const type: QrFormat = Object.values(QrFormat).includes(
			rawType as QrFormat
		)
			? (rawType as QrFormat)
			: QrFormat.TEXT_URL;

		req.qrData = {
			type,
			data: req.query as QrFormatMap[typeof type],
		};
	} catch (error) {
		console.log("error", error);
		return res.status(500).json({ msg: error });
	}
};

export const parseBody = async (
	req: QrExpress.QrRequest,
	res: QrExpress.Response,
	next: QrExpress.NextFunction
) => {
	try {
		const { type: rawType } = req.params;
		const type: QrFormat = Object.values(QrFormat).includes(
			rawType as QrFormat
		)
			? (rawType as QrFormat)
			: QrFormat.TEXT_URL;

		req.qrData = {
			type,
			data: req.body as QrFormatMap[typeof type],
		};
		next();
	} catch (error) {
		console.log("error", error);
		return res.status(500).json({ msg: error });
	}
};
