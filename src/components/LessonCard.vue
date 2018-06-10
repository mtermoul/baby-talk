<template>
    <v-flex xs4 class="lesson-card" @mouseover="onLessonMouseOver(lesson)" @mouseleave="onLessonMouseLeave(lesson)" :class="[lesson.isFlag? 'animated pulse': '']">
        <transition-group appear mode="xout-in" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
            <v-card :color="randomColor" xcolor="darken-1" class="white--text elevation-5" :to="{name: 'lesson', params: {id: lesson.id}}" :key="'lesson-card-' + lesson.id">
               <v-card-media :src="imageRootPath + lesson.image" height="200px">
               </v-card-media>
               <v-card-title primary-title>
                  <div>
                     <h3 class="headline mb-0">{{ lesson.title}}</h3>
                     <div>{{ lesson.desc }}</div>
                 </div>
             </v-card-title>
         </v-card>
     </transition-group>
 </v-flex>
</template>

<script>
export default {
    props: {
        lesson: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            colors: ['pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange', 'brown', 'blue-grey']
        }
    },
    computed: {
        imageRootPath () {
            return this.$store.getters.generalSettings.imageRootPath
        },
        randomColor () {
            // TODO: enhance the logic to randomly cycle through colors without repeating
            // TODO: may be we can use the underscore lib to do shuffle
            return this.colors[Math.floor(Math.random() * 12)] + ' darken-2'
        }
    },
    methods: {
        onLessonMouseOver (lesson) {
            lesson.isFlag = true
        },
        onLessonMouseLeave (lesson) {
            lesson.isFlag = false
        }
    }
}
</script>

<style>
.lesson-card {
    font-family: 'Jua', sans-serif;
}
</style>
