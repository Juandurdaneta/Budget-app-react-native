export const formatDate = (date) => {
    const options = {
        month: "long",
        day: "numeric",
        year: "numeric"
    }
    const formatedDate = new Date(date).toLocaleDateString('es-MX', options)

    return formatedDate
}