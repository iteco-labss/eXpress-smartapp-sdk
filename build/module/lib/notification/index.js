import bridge from "@expressms/smartapp-bridge";
import { METHODS } from "../../types";
const onNotification = async (handleNotification) => {
    const response = await bridge?.sendClientEvent({
        method: METHODS.NOTIFICATION,
        params: {},
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return bridge?.onReceive((event) => {
        if (event?.type === METHODS.NOTIFICATION) {
            handleNotification(response);
        }
    });
};
export { onNotification, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL25vdGlmaWNhdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSw0QkFBNEIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRXJDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxrQkFBNEIsRUFBRSxFQUFFO0lBQzVELE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUM3QyxNQUFNLEVBQUUsT0FBTyxDQUFDLFlBQVk7UUFDNUIsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFDLENBQUE7SUFFRiw4REFBOEQ7SUFDOUQsT0FBTyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxLQUFLLEVBQUUsSUFBSSxLQUFLLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDeEMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDN0I7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE9BQU8sRUFDTCxjQUFjLEdBQ2YsQ0FBQSJ9