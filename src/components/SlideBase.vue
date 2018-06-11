<template>
    <v-container>
        <v-layout>
            <v-flex>
                <transition appear mode="out-in" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                    <v-card v-show="isVisible" color="white" class="flash-card-sm bt-slide-intro">
                        <v-card-media
                            contain
                            height="430px"
                            :src="imagePath"
                            >
                            <v-container fill-height fluid>
                                <v-layout align-end>
                                    <v-flex>
                                        <h3 class="display-1">{{ title | titleCase }}</h3>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-media>
                    </v-card>
                </transition>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import SlideMixins from '@/mixins'

export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        ommitClosingStep: {
            type: Boolean
        }
    },
    mixins: [SlideMixins],
    data () {
        return {
            isVisible: true,
            slideTasks: []
        }
    },
    computed: {
        imageRootPath () {
            return this.$store.getters.generalSettings.imageRootPath
        },
        imagePath () {
            return this.imageRootPath + this.image
        }
    },
    methods: {
        startSlide () {
            // clear the previous setTimeout to prevent memory leaks
            this.clearSlideTasks()
            // show the open image
            this.slideTasks.push(setTimeout(() => {
                this.isVisible = true
            }, 500))
            // speak the title
            this.slideTasks.push(setTimeout(() => {
                this.speak(this.title)
            }, 1500))
            // hide the slide image
            if (!this.ommitClosingStep) {
                this.slideTasks.push(setTimeout(() => {
                    this.isVisible = false
                }, 3500))
            }
            // notify parent about done event
            this.slideTasks.push(setTimeout(() => {
                this.$emit('done')
            }, 4500))
        },
        clearSlideTasks () {
            // will clear the current slides task if any and make sure that
            // all refs to timeOut function are cleared properly to avoid memory leaks
            if (this.slideTasks.length) {
                for (let i = 0; i < this.slideTasks.length; i++) {
                    clearTimeout(this.slideTasks[i])
                }
                this.slideTasks = []
            }
        }
    },
    watch: {
        id () {
            // we also need to play slides if the slide data changes
            this.startSlide()
        }
    },
    mounted () {
        this.speak(' ')
        this.startSlide()
    },
    beforeDestroyed () {
        this.clearSlideTasks()
    }

}
</script>

<style>
.flash-card-sm {
    border: 4px solid green!important;
    font-family: 'Jua', sans-serif;
}
.bt-slide-intro .card__media__background {
    background-size: 106% 106%!important;
    background-position: -6px 0px!important;
}
</style>
