import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './schema';
import { config } from './config';
import { getDatabase, closeDatabase } from './db';
import { getUserByToken } from './models/User';

// Initialize database connection
getDatabase();

const yoga = createYoga({
    schema,
    graphiql:
        process.env.NODE_ENV !== 'production'
            ? {
                  title: 'Genshin Build Progress API',
              }
            : false,
    cors: config.cors,
    context: ({ request }) => {
        const authHeader = request.headers.get('authorization') || '';
        let userId: number | null = null;

        if (authHeader.toLowerCase().startsWith('bearer ')) {
            const token = authHeader.slice(7).trim();
            if (token) {
                const user = getUserByToken(token);
                if (user) {
                    userId = user.id;
                }
            }
        }

        return { request, userId };
    },
    // Error handling
    maskedErrors: {
        isDev: process.env.NODE_ENV !== 'production',
    },
});

const server = createServer(yoga);

server.listen(config.port, () => {
    console.log(`GraphQL server running on http://localhost:${config.port}/graphql`);
    console.log(`GraphiQL available at http://localhost:${config.port}/graphql`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    closeDatabase();
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server...');
    closeDatabase();
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});