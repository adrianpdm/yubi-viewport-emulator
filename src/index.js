import ViewportEmulator from "./ViewportEmulator.vue"

const plugins = {
    install(Vue, options){
        Vue.component("yubi-viewport-emulator", ViewportEmulator)
    }
}

export default plugins

