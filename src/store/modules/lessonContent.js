const state = {
    lessonContents: []
}

const getters = {
    lessonContents (state) {
        return state.lessonContents
    },
    getLessonContentById (state, getters) {
        return (Id) => {
            return state.lessonContents.find(item => {
                return item.lessonId === Id
            })
        }
    }
}

const mutations = {
    SET_LESSON_CONTENTS (state, lessonContents) {
        state.lessonContents = lessonContents
    }
}

const actions = {
    initLessonContents ({commit}, lessonContents) {
        commit('SET_LESSON_CONTENTS', lessonContents)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
