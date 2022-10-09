import bridge from "@expressms/smartapp-bridge"
import { METHODS } from "../../types"

const openClientSettings = () => {
  return bridge?.sendClientEvent({
    method: METHODS.OPEN_CLIENT_SETTINGS,
    params: {},
  })
}

/**
 * @param filter
 */
const getChats = ({ filter = null }: { filter: string | null }) => {
  return bridge?.sendClientEvent({
    method: METHODS.GET_CHATS,
    params: { filter },
  })
}

export {
  openClientSettings,
  getChats,
}
