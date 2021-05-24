import {Theme, useSysStore} from "@store/sys"
import {localStoreApi} from "@store/localStore/local"
export const changeTheme = (themenName?:string):void=>{
  const body = document.body
  const store = new localStoreApi()
  const useStore = useSysStore()
  const base = themenName|| store.get("z-theme") || Theme.light
  body.setAttribute("theme",base)
  store.set("z-theme",base)
  useStore.changeThemeStore(base)
}