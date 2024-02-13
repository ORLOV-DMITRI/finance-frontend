export const priceRu = (price: number) => {
    if (price)
        return price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
};