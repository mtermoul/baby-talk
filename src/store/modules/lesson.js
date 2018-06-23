const state = {
    lessons: []
}

const getters = {
    lessons (state) {
        return state.lessons
    },
    getLessonById (state, getters) {
        return (Id) => {
            return state.lessons.find(item => {
                return item.id === Id
            })
        }
    }
}

const mutations = {
    SET_LESSONS (state, lessons) {
        state.lessons = lessons
    }
}

const actions = {
    initLessons ({commit}, lessons) {
        commit('SET_LESSONS', lessons)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
