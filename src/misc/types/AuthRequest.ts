import { Request } from 'express';
import core from 'express-serve-static-core';
export type AuthRequest<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = qs.ParsedQs> = Request<
    P,
    ResBody,
    ReqBody,
    ReqQuery
> & { uid?: string; atoken?: string };
