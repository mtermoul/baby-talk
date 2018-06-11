<template>
    <v-container>
        <v-layout>
            <v-flex>
                <transition appear mode="out-in" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                    <v-card v-show="isVisible" color="white" class="flash-card-sm bt-slide-content">
                        <v-card-media
                            contain
                            height="430px"
                            :src="imagePath"
                            >
                        </v-card-media>
                        <v-card-text>
                            <h3 class="display-3">{{ title | titleCase }}</h3>
                        </v-card-text>
                    </v-card>
                </transition>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import SlideBase from './SlideBase'

export default {
    extends: SlideBase
}
</script>

<style>
.bt-slide-content .card__media__background {
    background-size: 106% 106%!important;
    background-position: -6px 0px!important;
}
</style>
