import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import lesson from './modules/lesson'
import lessonContent from './modules/lessonContent'
import userRequest from './modules/userRequest'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.http.options.root = 'https://baby-talk-f238f.firebaseio.com/'

export default new Vuex.Store({
    state: {
        generalSettings: {
            imageRootPath: '/static/images/'
        },
        introData: {
            title: 'Welcome to baby talk',
            image: 'Background-with-decorative-objects-and-boy-reading/108407-ONH61K-867.jpg'
        },
        closingData: {
            title: 'Bye bye',
            image: 'Theater-stage-background/3988.jpg'
        }
    },
    getters: {
        generalSettings (state) {
            return state.generalSettings
        },
        introData (state) {
            return state.introData
        },
        closingData (state) {
            return state.closingData
        }
    },
    actions: {
        loadData ({commit}) {
            Vue.http.get('lesson.json')
                .then(response => response.json(), response => {
                    // TODO: need to display a notification on ui about this failure
                    console.log('----- error ----')
                    return false
                })
                .then(data => {
                    if (data) {
                        const lessons = data
                        commit('SET_LESSONS', lessons)
                    }
                })

            Vue.http.get('lessonContent.json')
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        const lessonContents = data
                        commit('SET_LESSON_CONTENTS', lessonContents)
                    }
                })

            Vue.http.get('userRequest.json')
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        const lessonContents = Object.keys(data).map(key => {
                            // need to convert the object into array with the auto IDs from firebase
                            const item = data[key]
                            item.id = key
                            return item
                        })
                        commit('SET_USER_REQUESTS', lessonContents)
                    }
                })
        }
    },
    modules: {
        lesson,
        lessonContent,
        userRequest
    }
})
