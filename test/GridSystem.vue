<template>
    <v-container fluid
                 style="position: relative; text-align: center">
        <v-layout class="test-group"
                  row
                  wrap>
            <v-flex xs12
                    class="title">
                Flex Grid System
            </v-flex>
            <v-flex v-for="i in 6"
                    :key="i"
                    xs12
                    sm6
                    md4
                    lg3
                    xl2>
                <v-card class="pa-3 ma-2">
                    XS12 SM6 MD4 LG3 XL2
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout class="test-group mt-5"
                  row
                  wrap>
            <v-flex xs12
                    class="title">
                Hidden-{size}-Only
            </v-flex>
            <v-flex v-for="(size, i) in ['xs', 'sm', 'md', 'lg', 'xl']"
                    :key="i"
                    :class="[`hidden-${size}-only`]">
                <v-card class="pa-3 ma-2">
                    {{`${size.toUpperCase()}-Only`}}
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row
                  wrap
                  class="mt-5 test-group">
            <v-flex xs12
                    class="title">
                Hidden-{size}-and-Up
            </v-flex>
            <v-flex v-for="(size, i) in ['sm', 'md', 'lg']"
                    :key="i"
                    :class="[`hidden-${size}-and-up`]">
                <v-card class="pa-3 ma-2">
                    {{`${size.toUpperCase()}-and-Up`}}
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row
                  wrap
                  class="mt-5 test-group">
            <v-flex xs12
                    class="title">
                Hidden-{size}-and-Down
            </v-flex>
            <v-flex v-for="(size, i) in ['sm', 'md', 'lg']"
                    :key="i"
                    :class="[`hidden-${size}-and-down`]">
                <v-card class="pa-3 ma-2">
                    {{`${size.toUpperCase()}-and-down`}}
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row
                  wrap
                  class="mt-5 test-group">
            <v-flex xs12
                    class="title">
                Offset Grid
            </v-flex>
            <v-flex xs4
                    class="offset-xs0 offset-sm2 offset-md4 offset-lg6 offset-xl8">
                <v-card class="pa-3 ma-2"
                        v-text="`xs0 | sm2 | md4 | lg6 | xl8`">
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row
                  wrap>
            <v-flex xs12
                    class="title mt-5">
                Text Align
            </v-flex>
            <v-flex xs12>
                <v-card class="pa-3 ma-2 text-xs-left text-md-center text-xl-right">
                    Text:<br />
                    XS-Left<br />
                    MD-Center<br />
                    XL-Right
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: {

    }
}
</script>

<style lang="scss" scoped>

</style>


