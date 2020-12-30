import Application from './Application';
import PostController from './controllers/PostController';
import UserController from './controllers/UserController';
import routeIntegrator from './misc/routeIntegrator';

const port = parseInt(process.env.PORT || '3000');
const res = Application(port, true);

res.then(appliance => {
    routeIntegrator(appliance.app, PostController);
    routeIntegrator(appliance.app, UserController);
    appliance.start();
    console.log('Server running on port:', port);
}).catch(err => {
    console.error('E>Could not connect to db:', err?.message ?? err?.msg ?? err?.name ?? 'General error');
});
