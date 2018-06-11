<template>
    <v-app id="app">
        <v-toolbar color="green accent-2" fixed app dense>
            <v-icon>face</v-icon>
            <v-toolbar-title>Baby Talk</v-toolbar-title>
            <v-toolbar-items>
                <v-btn flat exact :to="{name: 'home'}">Home</v-btn>
                <v-btn flat :to="{name: 'lesson'}">Lesson</v-btn>
                <v-btn flat :to="{name: 'user-request'}">User Request</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer color="green accent-2" app>
            <span>&copy; 2017</span>
            <v-spacer></v-spacer>
            <span>Images used in this site are <a href="http://www.freepik.com">Designed by Freepik</a></span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    computed: {
        firstWords () {
            return this.$store.getters.firstWords
        }
    }
}
</script>

<style>
#app {

}
</style>
