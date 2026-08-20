import { env } from "./configs/env";
import { createApp } from "./app";
import { connectRedis, disconnectRedis } from "./configs/redis";

const PORT = Number(env.port) || 8001;

async function bootstrap() {
	try {
		await connectRedis();

		const app = createApp();

		const server = app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});

		const shutdown = async (signal: string) => {
			console.log(`${signal} received. Shutting down...`);

			server.close(async () => {
				await disconnectRedis();

				console.log("Server shut down.");
				process.exit(0);
			});
		};

		process.on("SIGTERM", () => shutdown("SIGTERM"));
		process.on("SIGINT", () => shutdown("SIGINT"));
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
}

bootstrap();
