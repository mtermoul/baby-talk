import Vue from 'vue'
// TODO: need to implement http.post to insert data and integrate with the add action
// TODO: need a way to capture http errors and display it as a message to the UI
// TODO: need a way to fetch the data from http incrementally

const state = {
    userRequests: []
}

const getters = {
    userRequests (state) {
        return state.userRequests
    },
    getUserRequestById (state, getters) {
        return (Id) => {
            return state.userRequests.find(item => {
                return item.id === Id
            })
        }
    }
}

const mutations = {
    SET_USER_REQUESTS (state, userRequests) {
        state.userRequests = userRequests
    },
    ADD_USER_REQUEST (state, userRequest) {
        if (userRequest.name && userRequest.email && userRequest.message) {
            state.userRequests.push(userRequest)
        }
    }
}

const actions = {
    initUserRequests ({commit}, userRequests) {
        commit('SET_USER_REQUESTS', userRequests)
    },
    addUserRequest ({commit}, userRequest) {
        Vue.http.post('userRequest.json', userRequest)
            .then(response => response.json(), error => error.json())
            .then(data => {
                // need to get the record id and pass it to the state
                userRequest.id = data.name
                commit('ADD_USER_REQUEST', userRequest)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
