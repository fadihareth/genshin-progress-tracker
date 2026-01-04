import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './schema';
import { config } from './config';
import { getDatabase, closeDatabase } from './db';

// Initialize database connection
getDatabase();

const yoga = createYoga({
    schema,
    graphiql: process.env.NODE_ENV !== 'production' ? {
        title: 'Genshin Build Progress API',
    } : false,
    cors: config.cors,
    context: (req) => {
        // You can add request context here if needed later
        return { req };
    },
    // Error handling
    maskedErrors: {
        isDev: process.env.NODE_ENV !== 'production',
    },
});

const server = createServer(yoga);

server.listen(config.port, () => {
    console.log(`🚀 GraphQL server running on http://localhost:${config.port}/graphql`);
    console.log(`📊 GraphiQL available at http://localhost:${config.port}/graphql`);
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