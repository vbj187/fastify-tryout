// Instantiation
const fastify = require('fastify')();

// You can pass additional options to this line like so:
// implement such an instantiation whenever required
// const fastifyWithOptions = require('fastify')({ logger: { prettyPrint: true } });




// SETTING UP A ROUTE
// Both of these implementations do the exact same thing and have the same performance,
// so simply use whichever makes the most sense to you. 

// Method 1
fastify.get('/', (request, reply) => { reply.send({ hello: 'world' }); });

// Method 2
fastify.route({
    method: 'GET',
    url: '/route',
    handler: function (request, reply) {
        reply.send({ hello: 'Shasha' });
    }
});


// Plugin
// Plugin Instantiation
const fp = require('fastify-plugin');


function superPlugin(fastify, opts, next) {
    fastify.decorate(
        'superMethod',
        () => { console.log(`Secret code: ${opts.secretCode}`); }
    );
    next();
}

// register plugin onto fastify instance
fastify.register(superPlugin, { secretCode: 'JavaScript is awesome!' });


// no new routes defined after listen are called
fastify.listen(3000, err => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
});

// calling super method
// fastify.listen(3000, err => {  fastify.superMethod()})