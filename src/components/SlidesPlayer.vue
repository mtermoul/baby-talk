<template>
    <div>
        <component
            v-if="currentSlide"
            :is="currentSlideComponent"
            :title="currentSlide.title"
            :image="currentSlide.image"
            :id="currentSlideIndex"
            :ommitClosingStep="leaveSlideOn"
            @done="playNextSlide"
        ></component>
    </div>
</template>

<script>
import SlideBase from './SlideBase'
import ImageAndTextSlide from './ImageAndTextSlide'

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
            currentSlideComponent: 'app-image-and-text-slide',
            currentSlideIndex: 0,
            currentSlide: null,
            leaveSlideOn: false
        }
    },
    components: {
        'app-slide-base': SlideBase,
        'app-image-and-text-slide': ImageAndTextSlide
    },
    computed: {
        slidesCount () {
            return this.slides.length
        }
    },
    methods: {
        playIntroSlide () {
            this.currentSlideComponent = 'app-slide-base'
            this.currentSlide = {
                title: this.lesson.title,
                image: this.lesson.image
            }
        },
        playClosingSlide () {
            const slide = this.$store.getters.closingData
            this.currentSlide = {
                title: slide.title,
                image: slide.image
            }
        },
        playNextSlide () {
            if (this.currentSlideIndex < this.slidesCount) {
                this.currentSlideComponent = 'app-image-and-text-slide'
                this.currentSlideIndex += 1
                this.currentSlide = this.slides[this.currentSlideIndex - 1]
            } else if (this.currentSlideIndex === this.slidesCount) {
                this.currentSlideComponent = 'app-slide-base'
                this.currentSlideIndex += 1
                this.leaveSlideOn = true
                this.playClosingSlide()
            }
        }
    },
    mounted () {
        this.playIntroSlide()
    }
}
</script>
