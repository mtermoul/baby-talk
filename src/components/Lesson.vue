<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-flex xs12 sm4 text-xs-center>
                <app-slides-player :slides="lessonWords.words" :lesson="lesson"></app-slides-player>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import SlidesPlayer from './SlidesPlayer'

export default {
    props: ['id', 'title'],
    computed: {
        lessonWords () {
            return this.$store.getters.getLessonWordsById(Number(this.lesson.id))
        },
        lesson () {
            if (this.id) {
                return this.$store.getters.getLessonById(Number(this.id))
            } else {
                const lessons = this.$store.getters.lessons
                return lessons[Math.floor(Math.random() * lessons.length)]
            }
        }
    },
    components: {
        'app-slides-player': SlidesPlayer
    }
}
</script>
