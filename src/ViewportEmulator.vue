<template>
    <div class="emulator--wrap"
         :style="{padding: device !== 'desktop'? '2rem' : 0}">
        <div ref="body"
             :class="bodyClasses"
             :style="bodyStyles">
            <div class="dev-header"
                 v-if="useDecoration">
                <i class="circle"></i>
                <i class="speaker"></i>
                <i class="circle"></i>
            </div>
            <div :class="screenClasses"
                 :style="screenStyles">
                <slot></slot>
            </div>
            <div class="dev-footer"
                 v-if="useDecoration">
                <i :class="[device === 'mobile' ? 'home-button-circle' : 'home-button-rectangle']"></i>
            </div>
        </div>
    </div>
</template>

<script>
function DeviceBodyStyle(width, height, sidePadding, bodyRadius, screenRadius) {
    this.width = width
    this.height = height
    this.sidePadding = sidePadding
    this.bodyRadius = bodyRadius
    this.screenRadius = screenRadius
}

let _mobile = new DeviceBodyStyle(320, 560, '1rem', '3rem', 0)
let _tablet = new DeviceBodyStyle(768, 992, '1rem', '2rem', 0)
let _desktop = new DeviceBodyStyle(1280, 992, '3rem', '2rem', 0)

export default {
    props: {
        device: {
            type: String,
            default: 'mobile',
            validator: (val) => {
                return ['desktop', 'tablet', 'mobile'].indexOf(val) !== -1
            }
        },
        withDecor: {
            type: Boolean,
            default: true,
        },
        deviceConfig: {
            type: Object,
            default: () => ({
                mobile: _mobile,
                tablet: _tablet,
                desktop: _desktop,
            })
        },
        breakpointConfig: {
            type: Object,
            default: () => ({
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200
            }),
            validator: (obj) => {
                return ['xs', 'sm', 'md', 'lg', 'xl'].every((size) => {
                    return obj.hasOwnProperty(size)
                })
            }
        },
    },
    data() {
        return {
            largestBreakpoint: '',
        }
    },
    mounted() {
        this.updateParentStyle()
        this.emitBreakpointChange(this.largestBreakpoint)
    },
    beforeDestroy() {

    },
    computed: {
        useDecoration() {
            return this.withDecor && this.device !== 'desktop'
        },
        viewScale() {
            return 1
        },
        emulatorBreakpoints() {
            let breakpoints = []

            let deviceWidth = this.selectedDevice.width

            for (let bp in this.breakpointConfig) {
                if (deviceWidth >= this.breakpointConfig[bp]) {
                    breakpoints.push(`view-${bp}`)
                }
            }

            if (breakpoints.length > 0) {
                const str = breakpoints[breakpoints.length - 1]
                this.largestBreakpoint = str.substring(5, str.length)
            }

            return breakpoints
        },
        selectedDevice() {
            let dev = {}
            for (let type in this.deviceConfig) {
                if (type === this.device) {
                    dev = this.deviceConfig[type]
                    break
                }
            }

            return dev
        },
        bodyClasses() {
            let classes = ['emulator', 'emulator-body', ...this.emulatorBreakpoints]
            return classes
        },
        bodyStyles() {
            let width = (this.selectedDevice.width) + 'px'
            let height = (this.selectedDevice.height) + 'px'
            let padding = '0'
            let border = 'none'
            let borderRadius = '0'
            let background = 'none'

            if (this.device === 'desktop'){
                width = '100%'
                height = '100%'
            }

            if (this.useDecoration) {
                let paddingY = 4
                let paddingX = this.device === 'mobile' ? 1 : 2
                width = `calc(${width} + ${paddingX * 2}rem)`
                height = `calc(${height} + ${paddingY * 2}rem)`
                padding = `${paddingY}rem ${paddingX}rem`
                borderRadius = '3rem'
            }

            let styles = {
                width,
                height,
                padding,
                border,
                borderRadius,
                background
            }

            return styles
        },
        screenClasses() {
            let classes = ['emulator-screen']

            return classes
        },
        screenStyles() {
            let styles = {}

            if (this.useDecoration) {
                let border = '4px double #ddd'
                Object.assign(styles, {
                    border,
                })
            }

            return styles
        }
    },
    methods: {
        extractValueAndUnit(valueStr) {
            let val = '',
                unit = ''

            if (typeof valueStr !== 'string') {
                console.trace('Invalid input. Expected string got ' + typeof valueStr)
            } else {
                for (let i = valueStr.length - 1; i >= 0; i--) {
                    let char = valueStr[i]
                    if (isNaN(char) && char !== '.') {
                        unit += char
                    } else {
                        val += char
                    }
                }

                if (!val) {
                    console.trace('Value not found')
                }
                if (!unit) {
                    console.trace('Unit not found')
                }
                if (val.length && unit.length) {
                    unit = unit.split('').reverse().join('')
                    val = val.split('').reverse().join('')
                    val = parseFloat(val)
                }
            }
            return { value: val, unit: unit }
        },
        updateParentStyle() {

        },
        decorComponents(position) {
            if (['header', 'footer'].indexOf(position) === -1) {
                console.trace('Invalid decor position')
                return undefined
            }
            if (this.device === 'responsive') {
                return false
            }

            return `${position}-${this.device}`
        },
        emitBreakpointChange(value) {
            this.$emit("update:breakpoint", value)
        },
    },
    watch: {
        largestBreakpoint(val) {
            this.emitBreakpointChange(val)
        },
    }
}
</script>

<style lang="scss">

$transition-prop: all;
$transition-duration: .3s;

%size-transition {
    transition-property: $transition-prop;
    transition-duration: $transition-duration;
    transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
    will-change: $transition-prop;
}

.emulator--wrap{
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.emulator-body {
    position: relative;
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    box-shadow: 0 .5rem 2.5rem 0 #dadada;
    
    .emulator-screen {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: white;
    }
}

$device-border-color: #ddd;
$solid-border-style: 1px solid $device-border-color;
$double-border-style: 4px double $device-border-color;
$home-button-radius: 1.5rem;
.dev-header,
.dev-footer {
    position: absolute;
    left: 0;
    width: 100%;
    height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.dev-header {
    top: 0
}

.dev-footer {
    bottom: 0;
}


.circle {
    width: 1rem;
    height: 1rem;
    border: $solid-border-style;
    border-radius: 1rem;
    margin: 0 1rem;
}

.speaker {
    box-sizing: padding-box;
    position: relative;
    width: 40%;
    height: 1rem;
    border: $double-border-style;
    border-radius: 1rem;

    &:before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 40%;
        width: 100%;
        height: 100%;
        border-top: 2px dotted $device-border-color;
    }
}

%home-button-default {
    position: relative;
    display: block;    
    text-align: center;
    border: $double-border-style;
    border-radius: $home-button-radius;

}

.home-button {

    &-circle {
        @extend %home-button-default;
        width: $home-button-radius * 2;
        height: $home-button-radius * 2;
    }

    &-rectangle {
        @extend %home-button-default;
        width: 25%;
        height: $home-button-radius;
    }
}
</style>


