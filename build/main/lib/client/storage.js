"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientStorageClear = exports.clientStorageRemove = exports.clientStorageSet = exports.clientStorageGet = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
/**
 * Get value for key from client storage
 * @param key Key
 * @returns Promise that'll be fullfilled with `payload.value` on success, otherwise rejected with reason
 */
const clientStorageGet = ({ key }) => {
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    return smartapp_bridge_1.default
        .sendClientEvent({
        method: types_1.METHODS.CLIENT_STORAGE_GET,
        params: { key },
    })
        .then(event => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { payload } = event;
        const deserializedValue = JSON.parse(payload.value);
        return Object.assign(Object.assign({}, event), { payload: Object.assign(Object.assign({}, payload), { value: deserializedValue }) });
    });
};
exports.clientStorageGet = clientStorageGet;
/**
 * Save value in client storage
 * @param key Key
 * @param value Data to be stored
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
const clientStorageSet = ({ key, value }) => {
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    const serializedValue = JSON.stringify(value);
    return smartapp_bridge_1.default
        .sendClientEvent({
        method: types_1.METHODS.CLIENT_STORAGE_SET,
        params: {
            key,
            value: serializedValue,
        },
    })
        .then(event => event);
};
exports.clientStorageSet = clientStorageSet;
/**
 * Remove record from client storage
 * @param key Key
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
const clientStorageRemove = ({ key }) => {
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    return smartapp_bridge_1.default
        .sendClientEvent({
        method: types_1.METHODS.CLIENT_STORAGE_REMOVE,
        params: { key },
    })
        .then(event => event);
};
exports.clientStorageRemove = clientStorageRemove;
/**
 * Clear all records from client storage
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
const clientStorageClear = () => {
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    return smartapp_bridge_1.default
        .sendClientEvent({
        method: types_1.METHODS.CLIENT_STORAGE_CLEAR,
        params: {},
    })
        .then(event => event);
};
exports.clientStorageClear = clientStorageClear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2xpZW50L3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUZBQStDO0FBQy9DLHVDQUE4RztBQUU5Rzs7OztHQUlHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFtQixFQUFxQyxFQUFFO0lBQ3ZGLElBQUksQ0FBQyx5QkFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRXpELE9BQU8seUJBQU07U0FDVixlQUFlLENBQUM7UUFDZixNQUFNLEVBQUUsZUFBTyxDQUFDLGtCQUFrQjtRQUNsQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUU7S0FDaEIsQ0FBQztTQUNELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNaLDhEQUE4RDtRQUM5RCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQXFCLEtBQUssQ0FBQTtRQUUzQyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBELE9BQU8sZ0NBQ0YsS0FBSyxLQUNSLE9BQU8sa0NBQ0YsT0FBTyxLQUNWLEtBQUssRUFBRSxpQkFBaUIsTUFFQyxDQUFBO0lBQy9CLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBdURRLDRDQUFnQjtBQXJEekI7Ozs7O0dBS0c7QUFDSCxNQUFNLGdCQUFnQixHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUE0QyxFQUEyQixFQUFFO0lBQzdHLElBQUksQ0FBQyx5QkFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRXpELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFN0MsT0FBTyx5QkFBTTtTQUNWLGVBQWUsQ0FBQztRQUNmLE1BQU0sRUFBRSxlQUFPLENBQUMsa0JBQWtCO1FBQ2xDLE1BQU0sRUFBRTtZQUNOLEdBQUc7WUFDSCxLQUFLLEVBQUUsZUFBZTtTQUN2QjtLQUNGLENBQUM7U0FDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUF1QixDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFBO0FBaUMwQiw0Q0FBZ0I7QUEvQjNDOzs7O0dBSUc7QUFDSCxNQUFNLG1CQUFtQixHQUFHLENBQUMsRUFBRSxHQUFHLEVBQW1CLEVBQTJCLEVBQUU7SUFDaEYsSUFBSSxDQUFDLHlCQUFNO1FBQUUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFekQsT0FBTyx5QkFBTTtTQUNWLGVBQWUsQ0FBQztRQUNmLE1BQU0sRUFBRSxlQUFPLENBQUMscUJBQXFCO1FBQ3JDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRTtLQUNoQixDQUFDO1NBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBdUIsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQWlCNEMsa0RBQW1CO0FBZmhFOzs7R0FHRztBQUNILE1BQU0sa0JBQWtCLEdBQUcsR0FBNEIsRUFBRTtJQUN2RCxJQUFJLENBQUMseUJBQU07UUFBRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUV6RCxPQUFPLHlCQUFNO1NBQ1YsZUFBZSxDQUFDO1FBQ2YsTUFBTSxFQUFFLGVBQU8sQ0FBQyxvQkFBb0I7UUFDcEMsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFDO1NBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBdUIsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQUVpRSxnREFBa0IifQ==