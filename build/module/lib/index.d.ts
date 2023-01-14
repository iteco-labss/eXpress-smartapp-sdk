/**
 * @param timeout
 */
declare const bridgeSendReady: (timeout?: number) => Promise<import("@expressms/smartapp-bridge/dist/types/eventEmitter").EmitterEventPayload> | undefined;
export { bridgeSendReady, };
