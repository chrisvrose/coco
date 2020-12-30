import Application from './Application';

const port = parseInt(process.env.PORT || '3000');
const res = Application(port, true);

res.then(appliance => {
    appliance.start();
    console.log('Server running on port:', port);
}).catch(err => {
    console.error('E>Could not connect to db:', err?.message ?? err?.msg ?? err?.name ?? 'General error');
});
