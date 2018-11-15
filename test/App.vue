<template>
    <div id="app">
        <v-app class="emulator-ignore">
            <v-navigation-drawer class="grey lighten-5"
                                 app
                                 fixed
                                 hide-overlay
                                 v-model="showDrawer"
                                 ref="sidebar">
                <v-container d-block
                             fluid
                             fill-height
                             class="blue-grey--text text--darken-2">
                    <div class="title mb-4 font-weight-bold">PROPS</div>
                    <div class="subheading">Device Type</div>
                    <v-radio-group v-model="device"
                                   class="mt-0">
                        <v-radio label="Desktop"
                                 value="desktop"></v-radio>
                        <v-radio label="Tablet"
                                 value="tablet"></v-radio>
                        <v-radio label="Mobile"
                                 value="mobile"></v-radio>
                    </v-radio-group>
                    <div class="subheading">Device Decoration</div>
                    <v-switch v-model="withDecor"
                              :disabled="device === 'desktop'"
                              class="d-inline-block mt-0"
                              :label="device === 'desktop' ? 'Disabled' : withDecor? 'True' : 'False'"></v-switch>
                </v-container>
            </v-navigation-drawer>
            <v-content app>
                <viewport-emulator style="text-align: left; height: calc(100vh)"
                                   @update:breakpoint="onBreakpointChange"
                                   :device="device"
                                   :with-decor="withDecor">
                    <div class="current-breakpoint text-xs-center">{{breakpoint}}</div>
                    <grid-system></grid-system>
                </viewport-emulator>
            </v-content>
            <v-btn fixed
                   class="white--text"
                   color="blue"
                   fab
                   left
                   bottom
                   @click="showDrawer = !showDrawer"
                   v-text="'<'"></v-btn>
        </v-app>
    </div>
</template>

<script>
import GridSystem from "./GridSystem.vue"

export default {
    components: {
        GridSystem
    },
    props: {

    },
    data() {
        return {
            showDrawer: true,
            device: 'mobile',
            zoom: 0,
            breakpoint: '',
            withDecor: true,
            savedDecor: false
        }
    },
    beforeMount() {

    },
    mounted() {
        this.savedDecor = this.withDecor
    },
    computed: {

    },
    methods: {
        onSelectorUpdate(label, value) {
            if (!this[label]) {
                return
            }
            this[label] = value
        },
        changeDevice() {
            let devs = ['desktop', 'tablet', 'mobile']
            let index = devs.indexOf(this.device)
            if (index === devs.length - 1) {
                index = -1
            }
            this.device = devs[index + 1]
        },
        onBreakpointChange(val) {
            this.breakpoint = val
        }
    },
    watch: {
        device(newVal, oldVal) {
            if (newVal === 'desktop') {
                this.savedDecor = this.withDecor
                this.withDecor = false
            }

            if (oldVal === 'desktop') {
                this.withDecor = this.savedDecor
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#app {
    font-family: "SF", sans-serif;
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.app-title{
    font-weight: 800;
    font-size: 1.5rem;
}
.current-breakpoint {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 1.5rem;
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 1rem;
    background-color: white;
    box-shadow: 0 0 32px 0 #ddd;
}

</style>


