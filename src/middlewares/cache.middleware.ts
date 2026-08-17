import type { NextFunction, Response } from "express";
import type { QrRequest } from "../types";
import { redisClient, redisEnabled } from "../configs/redis";
import { generateQrImage } from "../services/qrcode.service";

export async function cache(req: QrRequest, res: Response, next: NextFunction) {
	if (!req.qrData) return next();

	const { type, data, colours } = req.qrData;

	const cacheKey = `qr:${type}:${JSON.stringify(data)}:${JSON.stringify(colours || {})}`;

	try {
		if (redisEnabled) {
			const cachedImage = await redisClient.get(cacheKey);

			if (cachedImage) {
				req.qrImage = Buffer.from(cachedImage, "base64");
				return next();
			}
		}

		const image = await generateQrImage(req.qrData);

		req.qrImage = image;

		if (redisEnabled) {
			await redisClient.set(cacheKey, image.toString("base64"), {
				EX: 3600,
			});
		}

		return next();
	} catch (error) {
		console.error("Redis cache middleware error:", error);

		try {
			req.qrImage = await generateQrImage(req.qrData);

			return next();
		} catch (generationError) {
			return next(generationError);
		}
	}
}
