export const getDaysMonth = (mont_date: string) => {
    
    const startDate = new Date(mont_date);
    startDate.setDate(1); 
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); 
    endDate.setHours(23, 59, 59, 999);

    return {
        startDate,
        endDate
    }
}