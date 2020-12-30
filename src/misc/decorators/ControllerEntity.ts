/**
 * Add Entity to a Controller
 * @param entity Entity
 */
export default function ControllerEntity(entity: any): ClassDecorator {
    return function (target) {
        Reflect.defineMetadata('controllerEntity', entity, target);
    };
}
export function NoEntity(): ClassDecorator {
    return function (target) {
        Reflect.defineMetadata('controllerEntity', null, target);
    };
}
