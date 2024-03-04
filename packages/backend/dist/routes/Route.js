var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Route_path, _Route_router;
import { Router } from "express";
export class Route {
    get path() {
        return __classPrivateFieldGet(this, _Route_path, "f");
    }
    get router() {
        return __classPrivateFieldGet(this, _Route_router, "f");
    }
    constructor(path) {
        _Route_path.set(this, void 0);
        _Route_router.set(this, Router());
        __classPrivateFieldSet(this, _Route_path, path, "f");
    }
    setupEndpoints() {
        this.endpoints().forEach((route) => {
            const { method, path, middlewares, handler } = route;
            const fullPath = `${this.path}${path}`;
            const pipeline = middlewares ? [...middlewares, handler] : [handler];
            this.router[method](fullPath, ...pipeline);
        });
    }
}
_Route_path = new WeakMap(), _Route_router = new WeakMap();
//# sourceMappingURL=Route.js.map