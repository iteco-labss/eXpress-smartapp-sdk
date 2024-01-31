"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openChatMessage = exports.createDeeplink = exports.getConnectionStatus = exports.requestLocation = exports.sendBotCommand = exports.openGroupChat = exports.searchCorporatePhonebook = exports.getChats = exports.openClientSettings = exports.openFile = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
__exportStar(require("./events"), exports);
__exportStar(require("./storage"), exports);
const openClientSettings = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_CLIENT_SETTINGS,
        params: {},
    });
};
exports.openClientSettings = openClientSettings;
const getChats = ({ filter = null }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.GET_CHATS,
        params: { filter },
    });
};
exports.getChats = getChats;
const searchCorporatePhonebook = ({ filter = null }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.SEARCH_CORPORATE_PHONEBOOK,
        params: { filter },
    });
};
exports.searchCorporatePhonebook = searchCorporatePhonebook;
const openGroupChat = ({ groupChatId }) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_GROUP_CHAT,
        params: { groupChatId },
    });
};
exports.openGroupChat = openGroupChat;
const openFile = (file) => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_FILE,
        params: file,
    });
};
exports.openFile = openFile;
const sendBotCommand = ({ userHuid, body, data, }) => {
    if (typeof data !== 'object')
        return;
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.SEND_BOT_COMMAND,
        params: {
            userHuid,
            message: {
                body,
                data,
            },
        },
    });
};
exports.sendBotCommand = sendBotCommand;
const requestLocation = () => {
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.REQUEST_LOCATION,
        params: {},
    });
};
exports.requestLocation = requestLocation;
/**
 * Get client current connection status. It's based on client's WebSocket connection state.
 * @returns Promise that'll be fullfilled with status data on success, otherwise rejected with reason
 */
const getConnectionStatus = async () => {
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    const response = await smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.GET_CONNECTION_STATUS,
        params: {},
    });
    return response;
};
exports.getConnectionStatus = getConnectionStatus;
/**
 * Create deeplink URL to open SmartApp
 * @param appId ID of SmartApp
 * @param meta Array of params to be included in deeplink
 * @returns Promise that'll be fullfilled with deeplink data on success, otherwise rejected with reason
 */
const createDeeplink = async (appId, meta) => {
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    const response = await smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.CREATE_DEEPLINK,
        params: { appId, meta },
    });
    return response;
};
exports.createDeeplink = createDeeplink;
/**
 * Open message in chat
 * @param groupChatId Chat identifier
 * @param syncId Message identifier
 * @returns Promise that'll be fullfilled with success response
 */
const openChatMessage = async ({ groupChatId, syncId, }) => {
    if (!smartapp_bridge_1.default)
        return Promise.reject(types_1.ERROR_CODES.NO_BRIDGE);
    return await smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.OPEN_CHAT_MESSAGE,
        params: { groupChatId, syncId },
    });
};
exports.openChatMessage = openChatMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlGQUErQztBQUUvQyx1Q0FBNkc7QUFDN0csMkNBQXdCO0FBQ3hCLDRDQUF5QjtBQUd6QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtJQUM5QixPQUFPLHlCQUFNLGFBQU4seUJBQU0sdUJBQU4seUJBQU0sQ0FBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLGVBQU8sQ0FBQyxvQkFBb0I7UUFDcEMsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFzSEMsZ0RBQWtCO0FBcEhwQixNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBNkIsRUFBRSxFQUFFO0lBQ2hFLE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsZUFBTyxDQUFDLFNBQVM7UUFDekIsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFO0tBQ25CLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWdIQyw0QkFBUTtBQTlHVixNQUFNLHdCQUF3QixHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxFQUE2QixFQUFFLEVBQUU7SUFDaEYsT0FBTyx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxlQUFPLENBQUMsMEJBQTBCO1FBQzFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRTtLQUNuQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUEwR0MsNERBQXdCO0FBeEcxQixNQUFNLGFBQWEsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUEyQixFQUFFLEVBQUU7SUFDakUsT0FBTyx5QkFBTSxhQUFO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