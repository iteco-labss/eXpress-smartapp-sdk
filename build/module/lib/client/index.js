import bridge from "@expressms/smartapp-bridge";
import { METHODS } from "../../types";
const openClientSettings = () => {
    return bridge?.sendClientEvent({
        method: METHODS.OPEN_CLIENT_SETTINGS,
        params: {},
    });
};
/**
 * @param filter
 */
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
export { openClientSettings, getChats, searchCorporatePhonebook, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSw0QkFBNEIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRXJDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLG9CQUFvQjtRQUNwQyxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQTZCLEVBQUUsRUFBRTtJQUNoRSxPQUFPLE1BQU0sRUFBRSxlQUFlLENBQUM7UUFDN0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTO1FBQ3pCLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRTtLQUNuQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLHdCQUF3QixHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxFQUE2QixFQUFFLEVBQUU7SUFDaEYsT0FBTyxNQUFNLEVBQUUsZUFBZSxDQUFDO1FBQzdCLE1BQU0sRUFBRSxPQUFPLENBQUMsMEJBQTBCO1FBQzFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRTtLQUNuQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxPQUFPLEVBQ0wsa0JBQWtCLEVBQ2xCLFFBQVEsRUFDUix3QkFBd0IsR0FDekIsQ0FBQSJ9