import { EmitterEventPayload } from '@expressms/smartapp-bridge/build/main/types/eventEmitter';
import { CreateDeeplinkResponse, File, GetConnectionStatusResponse } from '../../types';
export * from './events';
export * from './storage';
declare const openClientSettings: () => Promise<EmitterEventPayload> | undefined;
declare const getChats: ({ filter }: {
    filter: string | null;
}) => Promise<EmitterEventPayload> | undefined;
declare const searchCorporatePhonebook: ({ filter }: {
    filter: string | null;
}) => Promise<EmitterEventPayload> | undefined;
declare const openGroupChat: ({ groupChatId }: {
    groupChatId: string;
}) => Promise<EmitterEventPayload> | undefined;
declare const openFile: (file: File) => Promise<EmitterEventPayload> | undefined;
declare const sendBotCommand: ({ userHuid, body, data, }: {
    userHuid: string;
    body: string;
    data: {
        command: string;
    } | null;
}) => Promise<EmitterEventPayload> | undefined;
declare const requestLocation: () => Promise<EmitterEventPayload> | undefined;
/**
 * Get client current connection status. It's based on client's WebSocket connection state.
 * @returns Promise that'll be fullfilled with status data on success, otherwise rejected with reason
 */
declare const getConnectionStatus: () => Promise<GetConnectionStatusResponse>;
/**
 * Create deeplink URL to open SmartApp
 * @param appId ID of SmartApp
 * @param meta Array of params to be included in deeplink
 * @returns Promise that'll be fullfilled with deeplink data on success, otherwise rejected with reason
 */
declare const createDeeplink: (appId: string, meta: Array<{
    key: string;
    value: null | boolean | string | number;
}>) => Promise<CreateDeeplinkResponse>;
/**
 * Open message in chat
 * @param groupChatId Chat identifier
 * @param syncId Message identifier
 * @returns Promise that'll be fullfilled with success response
 */
declare const openChatMessage: ({ groupChatId, syncId, }: {
    groupChatId: string;
    syncId: string;
}) => Promise<EmitterEventPayload>;
export { openFile, openClientSettings, getChats, searchCorporatePhonebook, openGroupChat, sendBotCommand, requestLocation, getConnectionStatus, createDeeplink, openChatMessage, };
