<template>
    <div>
        <transition appear mode="out-in" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
            <component :is="currentView" :slideData="slideData"></component>
        </transition>
        <div>
            <v-btn fab dark small color="teal">
                <v-icon dark>skip_previous</v-icon>
            </v-btn>
            <v-btn fab dark small color="teal" @click="playSlides">
                <v-icon dark>{{ !isPlaying? 'play_arrow': 'pause' }}</v-icon>
            </v-btn>
            <v-btn fab dark small color="teal" @click="stopSlides">
                <v-icon dark>stop</v-icon>
            </v-btn>
            <v-btn fab dark small color="teal">
                <v-icon dark>skip_next</v-icon>
            </v-btn>
        </div>
    </div>
</template>
<script>
import Slide from './Slide.vue'
import SlideIntro from './SlideIntro.vue'

export default {
    props: {
        slides: {
            type: Array,
            required: true
        },
        lesson: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            slideData: {title: 'Welcome...', image: 'Background-with-decorative-objects-and-boy-reading/108407-ONH61K-867.jpg'},
            currentView: 'app-slide-intro',
            slideTimer: null,
            currentSlide: 0,
            startingSlide: 0,
            isPlaying: false,
            isFinished: false,
            autoStart: false,
            timeInterval: 4 // seconds
        }
    },
    components: {
        'app-slide': Slide,
        'app-slide-intro': SlideIntro
    },
    computed: {
        slideCount () {
            return this.slides.length
        }
    },
    methods: {
        playSlides () {
            this.isPlaying = !this.isPlaying
            if (this.currentSlide <= 0) {
                this.slideTimer = setInterval(() => {
                    if (this.isPlaying) {
                        if (this.currentSlide < this.slideCount) {
                            this.showSlide()
                        } else {
                            this.stopSlides()
                            this.showClosingSlide()
                        }
                    }
                }, this.timeInterval * 1000)
            }
        },
        stopSlides () {
            if (this.slideTimer) {
                clearInterval(this.slideTimer)
                this.slideTimer = null
                this.currentSlide = 0
                this.isPlaying = false
            }
        },
        showSlide () {
            if (this.currentSlide < this.slideCount - 1) {
                if (this.currentSlide < this.startingSlide - 1) {
                    this.currentSlide = this.startingSlide - 1
                }
            }
            if (this.currentView !== 'app-slide') {
                this.currentView = 'app-slide'
            }
            this.slideData = this.slides[this.currentSlide]
            console.log('--- slide: ' + this.slides[this.currentSlide].title + ' - ' + this.currentSlide)
            this.currentSlide += 1
        },
        showClosingSlide () {
            if (this.currentView === 'app-slide') {
                this.currentView = 'app-slide-intro'
            }
            this.slideData = this.$store.getters.closingData
        }
    },
    mounted () {
        // init the intro slide
        if (this.lesson) {
            this.slideData = this.lesson
        } else {
            this.slideData = this.$store.getters.introData
        }
    },
    destroyed () {
        this.stopSlides()
    }
}
</script>

<style>
.flash-card-sm {
    border: 4px solid green!important;
    font-family: 'Jua', sans-serif;
}
</style>
