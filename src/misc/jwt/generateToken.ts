import jwt from 'jsonwebtoken';
export type jwtPayload = {
    user: string;
};
export default function generateToken(payload: jwtPayload) {
    if (process.env.ACCESS_TOKEN_SECRET === undefined) throw Error('Internal State Error');
    // else {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
    // }
}
