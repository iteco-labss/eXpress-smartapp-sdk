import bridge from '@expressms/smartapp-bridge';
import { ERROR_CODES, METHODS, STATUS } from '../../types';
const subscriptions = [];
let bridgeEventListenerInstalled = false;
const isAnySubscriptionsOfType = (eventType) => {
    return subscriptions.some(sub => sub.eventType == eventType);
};
const installBridgeEventListener = () => {
    if (bridgeEventListenerInstalled || !bridge)
        return;
    bridgeEventListenerInstalled = true;
    bridge.onReceive(event => {
        subscriptions.filter(sub => sub.eventType === event.type).map(sub => sub.callback?.(event));
    });
};
/**
 * Subscribe to special client events
 * @param eventType Event from SubscriptionEventType enum to be subscribed
 * @param callback Optional function to be handled when event is coming
 * @returns Promise that'll be fullfilled on successful subscription, otherwise rejected with reason
 */
const subscribeClientEvents = (eventType, callback) => {
    const successResponse = { status: STATUS.SUCCESS };
    // No need to subscribe event twice on client
    if (isAnySubscriptionsOfType(eventType)) {
        subscriptions.push({ eventType, callback });
        return Promise.resolve(successResponse);
    }
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    return bridge
        .sendClientEvent({
        method: METHODS.SUBSCRIBE_CLIENT_EVENTS,
        params: {
            event: eventType,
        },
    })
        .then(() => {
        installBridgeEventListener();
        subscriptions.push({ eventType, callback });
        return successResponse;
    });
};
/**
 * Unsubscribe from previously subscribed client events
 * @param eventType Event from SubscriptionEventType enum to be unsubscribed
 * @param callback Function to be unsibscribed
 * @returns Promise that'll be fullfilled on successful unsubscription, otherwise rejected with reason
 */
const unsubscribeClientEvents = (eventType, callback) => {
    const successResponse = { status: STATUS.SUCCESS };
    const index = subscriptions.findIndex(sub => sub.eventType == eventType && sub.callback == callback);
    if (!bridge)
        return Promise.reject(ERROR_CODES.NO_BRIDGE);
    if (index == -1)
        return Promise.reject(ERROR_CODES.SUBSCRIPTION_NOT_FOUND);
    subscriptions.splice(index, 1);
    // Send unsubscribe to client only at last subscription
    if (isAnySubscriptionsOfType(eventType))
        return Promise.resolve(successResponse);
    return bridge
        .sendClientEvent({
        method: METHODS.UNSUBSCRIBE_CLIENT_EVENTS,
        params: {
            event: eventType,
        },
    })
        .then(() => successResponse);
};
export { subscribeClientEvents, unsubscribeClientEvents };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jbGllbnQvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLDRCQUE0QixDQUFBO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBeUIsTUFBTSxhQUFhLENBQUE7QUFFakYsTUFBTSxhQUFhLEdBQXFFLEVBQUUsQ0FBQTtBQUMxRixJQUFJLDRCQUE0QixHQUFHLEtBQUssQ0FBQTtBQUV4QyxNQUFNLHdCQUF3QixHQUFHLENBQUMsU0FBZ0MsRUFBRSxFQUFFO0lBQ3BFLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBRUQsTUFBTSwwQkFBMEIsR0FBRyxHQUFHLEVBQUU7SUFDdEMsSUFBSSw0QkFBNEIsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFNO0lBRW5ELDRCQUE0QixHQUFHLElBQUksQ0FBQTtJQUVuQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUM3RixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLFNBQWdDLEVBQUUsUUFBbUIsRUFBK0IsRUFBRTtJQUNuSCxNQUFNLGVBQWUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7SUFFbEQsNkNBQTZDO0lBQzdDLElBQUksd0JBQXdCLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdkMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzNDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtLQUN4QztJQUVELElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUV6RCxPQUFPLE1BQU07U0FDVixlQUFlLENBQUM7UUFDZixNQUFNLEVBQUUsT0FBTyxDQUFDLHVCQUF1QjtRQUN2QyxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsU0FBUztTQUNqQjtLQUNGLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsMEJBQTBCLEVBQUUsQ0FBQTtRQUM1QixhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDM0MsT0FBTyxlQUFlLENBQUE7SUFDeEIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUE7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxTQUFnQyxFQUFFLFFBQW1CLEVBQStCLEVBQUU7SUFDckgsTUFBTSxlQUFlLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRWxELE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFBO0lBRXBHLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6RCxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7UUFBRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFFMUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFFOUIsdURBQXVEO0lBQ3ZELElBQUksd0JBQXdCLENBQUMsU0FBUyxDQUFDO1FBQUUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBRWhGLE9BQU8sTUFBTTtTQUNWLGVBQWUsQ0FBQztRQUNmLE1BQU0sRUFBRSxPQUFPLENBQUMseUJBQXlCO1FBQ3pDLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRSxTQUFTO1NBQ2pCO0tBQ0YsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUNoQyxDQUFDLENBQUE7QUFFRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQSJ9