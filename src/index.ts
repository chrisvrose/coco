import Application from './Application';

console.log('>Starting Server as main');
const port = parseInt(process.env.PORT || '3000');
const res = Application(port, true);

res.then(server => {
    console.log('Server running on port:', port);
    server.start();
}).catch(err => {
    console.error('E>Could not connect to db:', err?.message ?? err?.msg ?? err?.name ?? 'General error');
});
