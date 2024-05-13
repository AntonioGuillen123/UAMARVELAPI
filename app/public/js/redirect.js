export const redirect = () => { 
    const params = window.location.search

    const uri = new URLSearchParams(params)

    const paramsValue = uri.get('redirect')

    if (paramsValue) {
        alert(paramsValue === 'session'
            ? 'Incorrect username or password'
            : 'The password is in incorrect format, it must contain at least one digit, one lowercase letter, one uppercase letter, and have a minimum length of 8 characters.'
        )
    }
}