
module.exports = {
    isLoggedIn: (email) => {
        if (typeof window !== 'undefined') {
            if(localStorage.getItem('user') !== ''){
                return {loggedIn: true, email: localStorage.getItem('user')}
            } else {
        return {loggedIn: false}
            }
        }
        return {loggedIn: false}
    },
    logIn: () => {

    },
    logOut: () => {

    }
}
