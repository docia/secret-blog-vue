export const IsAuthenticated =  (to, from, next) => {
	const token = localStorage.getItem('authToken')
	return token ? next() : next('/')
};
export const IsGuest = (to, form, next) => {
	const token = localStorage.getItem('authToken')
	return token ? next('/') : next()
}
