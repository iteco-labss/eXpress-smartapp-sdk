declare const openClientSettings: () => Promise<import("@expressms/smartapp-bridge/dist/types/eventEmitter").EmitterEventPayload> | undefined;
/**
 * @param filter
 */
declare const getChats: ({ filter }: {
    filter: string | null;
}) => Promise<import("@expressms/smartapp-bridge/dist/types/eventEmitter").EmitterEventPayload> | undefined;
declare const searchCorporatePhonebook: ({ filter }: {
    filter: string | null;
}) => Promise<import("@expressms/smartapp-bridge/dist/types/eventEmitter").EmitterEventPayload> | undefined;
export { openClientSettings, getChats, searchCorporatePhonebook, };
