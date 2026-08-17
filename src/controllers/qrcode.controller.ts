import type { NextFunction, Response } from "express";
import type { QrRequest } from "../types";

export const renderQr = async (
	req: QrRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.qrImage) {
			return res.status(500).json({
				msg: "failed to generate qrcode",
			});
		}

		res.setHeader("Content-Type", "image/png");
		res.setHeader("Content-Length", req.qrImage.length);
		return res.end(req.qrImage);
	} catch (error) {
		next(error);
	}
};
