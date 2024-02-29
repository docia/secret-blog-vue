export function useDateFormat() {
    const format = (date) => {
        return new Date(date).toLocaleDateString();

    };
	return { format };
}
