import { ClientStorageGetResponse, StatusResponse, StorageValueType } from '../../types';
/**
 * Get value for key from client storage
 * @param key Key
 * @returns Promise that'll be fullfilled with `payload.value` on success, otherwise rejected with reason
 */
declare const clientStorageGet: ({ key }: {
    key: string;
}) => Promise<ClientStorageGetResponse>;
/**
 * Save value in client storage
 * @param key Key
 * @param value Data to be stored
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
declare const clientStorageSet: ({ key, value }: {
    key: string;
    value: StorageValueType;
}) => Promise<StatusResponse>;
/**
 * Remove record from client storage
 * @param key Key
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
declare const clientStorageRemove: ({ key }: {
    key: string;
}) => Promise<StatusResponse>;
/**
 * Clear all records from client storage
 * @returns Promise that'll be fullfilled on success or rejected with reason
 */
declare const clientStorageClear: () => Promise<StatusResponse>;
export { clientStorageGet, clientStorageSet, clientStorageRemove, clientStorageClear };
