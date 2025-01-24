export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

export const formatDate = (date: Date): string => {
	return new Intl.DateTimeFormat("es-ES", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date);
};

export const formatISODate = (isoString: string): string => {
	const date = new Date(isoString);
	return formatDate(date);
};
