// May 2024 Geir Hilmersen
const {
    cleanUp: mongoCleanUp
} = require('./dbhandler');
const {
    cleanUp: redisCleanUp
} = require('./redishandler');

process.on('SIGTERM', appCleanUp);
process.on('SIGINT', appCleanUp);
process.on('SIGUSR1', appCleanUp);
process.on('SIGUSR2', appCleanUp);

async function appCleanUp(){
    console.info('\nAttempting graceful shutdown!\n'+
            '---------------------------------------');
    try {
        await redisCleanUp();
        await mongoCleanUp();
    } catch(error){
        console.error(error);
    } finally {
        console.info('\napplication shutdown complete!');
        process.exit(0);
    }
}