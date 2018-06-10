<template>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12 text-xs-center>
                <h3 class="headline">Select a lesson from below:</h3>
            </v-flex>
            <app-lesson-card v-for="lesson in lessons" :lesson="lesson" :key="'lesson-' + lesson.id"></app-lesson-card>
        </v-layout>
    </v-container>
</template>

<script>
import LessonCard from './LessonCard.vue'

export default {
    components: {
        'app-lesson-card': LessonCard
    },
    computed: {
        lessons () {
            return this.$store.getters.lessons
        }
    }
}
</script>

<style>
.lesson-card {
    font-family: 'Jua', sans-serif;
}
</style>
