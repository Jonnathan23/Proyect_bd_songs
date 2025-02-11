export const getDaysMonth = (mont_date: string) => {
    const date = new Date(`${mont_date}T00:00:00.000Z`); // Asegura que se interprete como UTC
    const startDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0, 23, 59, 59, 999));

    return { startDate, endDate };
};
