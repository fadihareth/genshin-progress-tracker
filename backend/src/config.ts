export const config = {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
    dbPath: process.env.DB_PATH || './data.db',
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true,
    },
};