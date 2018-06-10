import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Lesson from '@/components/Lesson.vue'
import UserRequest from '@/components/UserRequest.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/lesson/:id?', name: 'lesson', component: Lesson, props: true},
        {path: '/user-request', name: 'user-request', component: UserRequest},
        {path: '*', redirect: '/'}
    ]
})
