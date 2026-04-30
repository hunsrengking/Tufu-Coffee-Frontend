const permission = {
    currenUser (user) {
        return user.role === 'admin'
    }
}

export default permission