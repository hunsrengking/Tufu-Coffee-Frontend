const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: '4-digit',
        month: 'long',
        day: '2-digit'
    })
}

export default formatDate