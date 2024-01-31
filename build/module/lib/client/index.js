import bridge from '@expressms/smartapp-bridge';
import { ERROR_CODES, METHODS } from '../../types';
export * from './events';
export * from './storage';
const openClientSettings = () => {
    return bridge?.sendClientEvent({
        method: METHODS.OPEN_CLIENT_SETTINGS,
        params: {},
    });
};
const getChats = ({ filter = null }) => {
    return bridge?.sendClientEvent({
        method: METHODS.GET_CHATS,
        params: { filter },
    });
};
const searchCorporatePhonebook = ({ filter = null }) => {
    return bridge?.sendClientEvent({
        method: METHODS.SEARCH_CORPORATE_PHONEBOOK,
        params: { filter },
    });
};
const openGroupChat = ({ groupChatId }) => {
    return bridge?.sendClientEvent({
        method: METHODS.OPEN_GROUP_CHAT,
        params: { groupChatId },
    });
};
const openFile = (file) => {
    return bridge?.sendClientEvent({
        method: METHODS.OPEN_FILE,
        params: file,
    });
};
const sendBotCommand = ({ userHuid, body, data, }) => {
    if (typeof data !== 'object')
        return;
    return bridge?.sendClientEvent({
        method: METHODS.SEND_BOT_COMMAND,
        params: {
            userHuid,
            message: {
                body,
                data,
            },
        },
    });
};
const requestLocation = () => {
    return bridge?.sendClientEvent({
        method: METHODS.REQUEST_LOCATION,
        params: {},
    });
};
/**
 * Get client current connection status. It's based on client's WebSocket connection state.
 * @returns Promise that'll be fullfilled with status data on success, otherwise rejected with reason
 */
const getConnectionStatus = async () => {
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    const response = await bridge.sendClientEvent({
        method: METHODS.GET_CONNECTION_STATUS,
        params: {},
    });
    return response;
};
/**
 * Create deeplink URL to open SmartApp
 * @param appId ID of SmartApp
 * @param meta Array of params to be included in deeplink
 * @returns Promise that'll be fullfilled with deeplink data on success, otherwise rejected with reason
 */
const createDeeplink = async (appId, meta) => {
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    const response = await bridge.sendClientEvent({
        method: METHODS.CREATE_DEEPLINK,
        params: { appId, meta },
    });
    return response;
};
/**
 * Open message in chat
 * @param groupChatId Chat identifier
 * @param syncId Message identifier
 * @returns Promise that'll be fullfilled with success response
 */
const openChatMessage = async ({ groupChatId, syncId, }) => {
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    return await bridge.sendClientEvent({
        method: METHODS.OPEN_CHAT_MESSAGE,
        params: { groupChatId, syncId },
    });
};
export { openFile, openClientSettings, getChats, searchCorporatePhonebook, openGroupChat, sendBotCommand, requestLocation, getConnectionStatus, createDeeplink, openChatMessage, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSw0QkFBNEIsQ0FBQTtBQUUvQyxPQUFPLEVBQTBCLFdBQVcsRUFBcUMsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQzdHLGNBQWMsVUFBVSxDQUFBO0FBQ3hCLGNBQWMsV0FBVyxDQUFBO0FBR3pCLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxFQUE2QixFQUFFLEVBQUU7SUFDaEUsT0FBTyxNQUFNLEVBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUztRQUN6QixNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUU7S0FDbkIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBNkIsRUFBRSxFQUFFO0lBQ2hGLE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLDBCQUEwQjtRQUMxQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUU7S0FDbkIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSxhQUFhLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBMkIsRUFBRSxFQUFFO0lBQ2pFLE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLGVBQWU7UUFDL0IsTUFBTSxFQUFFLEVB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