<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card color="white" class="flash-card-sm bt-slide-intro">
                    <v-card-media
                    contain
                    height="430px"
                    :src="imagePath"
                    >
                    <v-container fill-height fluid>
                        <v-layout align-end>
                            <v-flex>
                                <h3 class="display-1">{{ slideData.title | titleCase }}</h3>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-media>
            </v-card>
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
    mounted () {
        this.speak(' ')
        setTimeout(() => {
            this.speak(this.slideData.title + ' ')
        }, 1000)
    }
}
</script>

<style>
.bt-slide-intro .card__media__background {
    background-size: 106% 106%!important;
    background-position: -6px 0px!important;
}
</style>
