/**
 * Add Entity to a Controller
 * @param entity Entity
 */
export default function ControllerEntity(entity: any): ClassDecorator {
    return function (target) {
        // console.info('Route decorator called');
        Reflect.defineMetadata('controllerEntity', entity, target);
    };
}
