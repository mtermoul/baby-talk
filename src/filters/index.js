import Vue from 'vue'

Vue.filter('titleCase', (value) => {
    return value.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
})
