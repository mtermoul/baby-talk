<template>
    <v-container>
        <v-layout>
            <v-flex>
                <transition mode="out-in" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                    <v-card color="white" class="flash-card-sm bt-slide-content" :key="slideData.title">
                        <v-card-media
                        contain
                        height="430px"
                        :src="imagePath"
                        >
                    </v-card-media>
                    <v-card-text>
                        <h3 class="display-3">{{ slideData.title | titleCase }}</h3>
                    </v-card-text>
                </v-card>
            </transition>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import { SlideMixins } from '@/mixins'

export default {
    props: {
        slideData: {
            type: Object,
            required: true
        }
    },
    mixins: [SlideMixins],
    computed: {
        imagePath () {
            return this.imageRootPath + this.slideData.image
        },
        imageRootPath () {
            return this.$store.getters.generalSettings.imageRootPath
        }
    },
    watch: {
        slideData () {
            console.log('--- say: ' + this.slideData.title)
            setTimeout(() => {
                this.speak(this.slideData.title + ' ')
            }, 1500)
        }
    },
    methods: {
        sayTitle () {

        }
    },
    mounted () {
        console.log('--- say: ' + this.slideData.title)
        setTimeout(() => {
            this.speak(this.slideData.title + ' ')
        }, 1500)
    }
}
</script>

<style>
/*.flash-card-sm.bt-slide-content {
min-height: 400px;
}*/
/*.bt-slide-content .card__media__background {
background-size: contain!important;
}*/
.bt-slide-content .card__media__background {
    background-size: 106% 106%!important;
    background-position: -6px 0px!important;
}
</style>
