"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onNotification = void 0;
const smartapp_bridge_1 = __importDefault(require("@expressms/smartapp-bridge"));
const types_1 = require("../../types");
const onNotification = async (handleNotification) => {
    const response = await (smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.sendClientEvent({
        method: types_1.METHODS.NOTIFICATION,
        params: {},
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return smartapp_bridge_1.default === null || smartapp_bridge_1.default === void 0 ? void 0 : smartapp_bridge_1.default.onReceive((event) => {
        if ((event === null || event === void 0 ? void 0 : event.type) === types_1.METHODS.NOTIFICATION) {
            handleNotification(response);
        }
    });
};
exports.onNotification = onNotification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL25vdGlmaWNhdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRkFBK0M7QUFDL0MsdUNBQXFDO0FBRXJDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxrQkFBNEIsRUFBRSxFQUFFO0lBQzVELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQSx5QkFBTSxhQUFOLHlCQUFNLHVCQUFOLHlCQUFNLENBQUUsZUFBZSxDQUFDO1FBQzdDLE1BQU0sRUFBRSxlQUFPLENBQUMsWUFBWTtRQUM1QixNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQSxDQUFBO0lBRUYsOERBQThEO0lBQzlELE9BQU8seUJBQU0sYUFBTix5QkFBTSx1QkFBTix5QkFBTSxDQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxNQUFLLGVBQU8sQ0FBQyxZQUFZLEVBQUU7WUFDeEMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDN0I7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUdDLHdDQUFjIn0=