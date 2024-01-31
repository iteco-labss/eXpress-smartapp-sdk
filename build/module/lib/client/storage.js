import bridge from '@expressms/smartapp-bridge';
import { ERROR_CODES, METHODS } from '../../types';
/**
 * Get value for key from client storage
 * @param key Key
 * @returns Promise that'll be fullfilled with `payload.value` on success, otherwise rejected with reason
 */
const clientStorageGet = ({ key }) => {
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    return bridge
        .sendClientEvent({
        method: METHODS.CLIENT_STORAGE_GET,
        params: { key },
    })
        .then(event => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { payload } = event;
        const deserializedValue = JSON.parse(payload.value);
        return {
            ...event,
            payload: {
                ...payload,
                value: deserializedValue,
            }
        };
    });
};
/**
 * Save value in client storage
 * @param key Key
 * @param value Data to be stored
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
const clientStorageSet = ({ key, value }) => {
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    const serializedValue = JSON.stringify(value);
    return bridge
        .sendClientEvent({
        method: METHODS.CLIENT_STORAGE_SET,
        params: {
            key,
            value: serializedValue,
        },
    })
        .then(event => event);
};
/**
 * Remove record from client storage
 * @param key Key
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
const clientStorageRemove = ({ key }) => {
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    return bridge
        .sendClientEvent({
        method: METHODS.CLIENT_STORAGE_REMOVE,
        params: { key },
    })
        .then(event => event);
};
/**
 * Clear all records from client storage
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
const clientStorageClear = () => {
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    return bridge
        .sendClientEvent({
        method: METHODS.CLIENT_STORAGE_CLEAR,
        params: {},
    })
        .then(event => event);
};
export { clientStorageGet, clientStorageSet, clientStorageRemove, clientStorageClear };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2xpZW50L3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sNEJBQTRCLENBQUE7QUFDL0MsT0FBTyxFQUE0QixXQUFXLEVBQUUsT0FBTyxFQUFvQyxNQUFNLGFBQWEsQ0FBQTtBQUU5Rzs7OztHQUlHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFtQixFQUFxQyxFQUFFO0lBQ3ZGLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUV6RCxPQUFPLE1BQU07U0FDVixlQUFlLENBQUM7UUFDZixNQUFNLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjtRQUNsQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUU7S0FDaEIsQ0FBQztTQUNELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNaLDhEQUE4RDtRQUM5RCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQXFCLEtBQUssQ0FBQTtRQUUzQyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBELE9BQU87WUFDTCxHQUFHLEtBQUs7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsR0FBRyxPQUFPO2dCQUNWLEtBQUssRUFBRSxpQkFBaUI7YUFDekI7U0FDMEIsQ0FBQTtJQUMvQixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBNEMsRUFBMkIsRUFBRTtJQUM3RyxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFekQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUU3QyxPQUFPLE1BQU07U0FDVixlQUFlLENBQUM7UUFDZixNQUFNLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjtRQUNsQyxNQUFNLEVBQUU7WUFDTixHQUFHO1lBQ0gsS0FBSyxFQUFFLGVBQWU7U0FDdkI7S0FDRixDQUFDO1NBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBdUIsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLG1CQUFtQixHQUFHLENBQUMsRUFBRSxHQUFHLEVBQW1CLEVBQTJCLEVBQUU7SUFDaEYsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRXpELE9BQU8sTUFBTTtTQUNWLGVBQWUsQ0FBQztRQUNmLE1BQU0sRUFBRSxPQUFPLENBQUMscUJBQXFCO1FBQ3JDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRTtLQUNoQixDQUFDO1NBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBdUIsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQUVEOzs7R0FHRztBQUNILE1BQU0sa0JBQWtCLEdBQUcsR0FBNEIsRUFBRTtJQUN2RCxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFekQsT0FBTyxNQUFNO1NBQ1YsZUFBZSxDQUFDO1FBQ2YsTUFBTSxFQUFFLE9BQU8sQ0FBQyxvQkFBb0I7UUFDcEMsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFDO1NBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBdUIsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQUVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxDQUFBIn0=