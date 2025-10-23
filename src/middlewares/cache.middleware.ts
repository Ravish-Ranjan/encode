import type { NextFunction, Response } from "express";
import type { QrRequest } from "../types";
import { redisClient } from "../index";

export async function cache(req: QrRequest, res: Response, next: NextFunction) {
	if (!req.qrData) return next();

	const { type, data, colours } = req.qrData;
	const cacheKey = `qr:${type}:${JSON.stringify(data)}:${JSON.stringify(
		colours || {}
	)}`;

	try {
		const cachedImage = await redisClient.get(cacheKey);
		if (cachedImage) {
			console.log("REDIS : Cache hit");

			const buffer = Buffer.from(cachedImage, "base64");
			res.setHeader("Content-Type", "image/png");
			res.setHeader("Content-Length", buffer.length);
			return res.end(buffer);
		}

		const originalEnd = res.end.bind(res);
		const originalWrite = res.write.bind(res);
		const chunks: Buffer[] = [];

		res.write = ((chunk: any, ...args: any[]) => {
			if (Buffer.isBuffer(chunk)) chunks.push(chunk);
			return originalWrite(chunk, ...args);
		}) as any;

		res.end = (async (chunk?: any, ...args: any[]) => {
			if (Buffer.isBuffer(chunk)) chunks.push(chunk);
			const buffer = Buffer.concat(chunks);
			if (
				res.getHeader("Content-Type")?.toString().includes("image/png")
			) {
				await redisClient.set(cacheKey, buffer.toString("base64"), {
					EX: 3600,
				});
			}
			return originalEnd(chunk, ...args);
		}) as any;

		next();
	} catch (err) {
		console.error("Redis cache middleware error:", err);
		next();
	}
}
