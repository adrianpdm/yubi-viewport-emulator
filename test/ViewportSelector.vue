<template>
    <v-layout row
              justify-center>
        <template v-for="(menu, i) in selectionsMenu">
            <v-flex :key="`select-${i}`"
                    class="mx-2"
                    xs4
                    sm3
                    md2>
                <v-select v-model="menu.model"
                          :items="menu.items"
                          :label="menu.label"
                          @change="(val) => menu.eventChange(menu.label, val)"
                          solo
                          dense>
                </v-select>
            </v-flex>
        </template>
    </v-layout>
</template>

<script>
function DeviceOption(text, value, minWidth, w, h, orient) {
    this.text = text
    this.value = value
    this.minWidth = minWidth
    this.w = w
    this.h = h
    this.orient = orient
}

function ZoomOption(value) {
    this.text = `${value}%`
    this.value = value
}

function OrientationOption(value) {
    this.text = value.substring(0, 1).toUpperCase() + value.substring(1, value.length)
    this.value = value
}

let _devices = []
_devices.push(new DeviceOption('Desktop', 'desktop', 1200, 1024, 768, 'landscape'))
_devices.push(new DeviceOption('Tablet', 'tablet', 768, 768, 960, 'portrait'))
_devices.push(new DeviceOption('Mobile', 'mobile', 0, 320, 560, 'portrait'))

let _zooms = [150, 100, 75, 50].map((val) => {
    return new ZoomOption(val)
})

let _orientations = ['landscape', 'portrait'].map((o) => {
    return new OrientationOption(o)
})

export default {
    data() {
        return {
            devices: _devices,
            zooms: _zooms.sort((a, b) => b.value - a.value),
            orientations: _orientations,
            selectedDevice: '',
            selectedZoom: '',
            selectedOrientation: ''
        }
    },
    mounted() {
        const rootWidth = window.innerWidth
        this.selectedDevice = this.getSuggestedDeviceByWidth(rootWidth)
        const { w, h } = this.getDeviceSize(this.selectedDevice)
        this.selectedZoom = this.getSuggestedZoom(w, h)
    },
    computed: {
        selectionsMenu() {
            let menus = []
            for (let menu of ['devices', 'zooms', 'orientations']) {
                menus.push(this.getSelectionPropBinding(menu))
            }
            return menus
        }
    },
    methods: {
        getSelectionPropBinding(selectionType) {
            const label = selectionType.substring(0, 1).toUpperCase() + selectionType.substring(1, selectionType.length - 1)
            const model = 'selected' + label

            return {
                "items": this[selectionType],
                "model": this[model],
                "label": label,
                "eventChange": this.onSelect
            }
        },
        getSuggestedDeviceByWidth(width) {
            let { value } = this.devices.find((dev) => {
                return width >= dev.minWidth
            })
            return value
        },
        getDeviceSize(device) {
            let { w, h } = this.devices.find((dev) => {
                return device === dev.value
            })
            return { w, h }
        },
        // TODO: ganti root dengan container, ubah menjadi input param instead of inline variable
        getSuggestedZoom(deviceWidth, deviceHeight) {
            const rootWidth = window.innerWidth
            const rootHeight = window.innerHeight
            const widthRatio = rootWidth / deviceWidth
            const heightRatio = rootHeight / deviceHeight

            let ratio = Math.min(widthRatio, heightRatio)
            
            ratio = (ratio * 100).toFixed(0)

            let suggestedZoom
            for (let i = 0; i < this.zooms.length; i++) {
                if (ratio >= this.zooms[i].value) {
                    suggestedZoom = this.zooms[i].value
                    break
                }
            }

            if (!suggestedZoom){
                suggestedZoom = this.zooms[this.zooms.length - 1].value
            }

            return suggestedZoom
        },
        onSelect(label, value){
            const _label = label.toLowerCase()
            this.$emit(`update:${_label}`, value)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


