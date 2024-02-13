

export const useFormatDate = (item:Date) => {

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' } as Intl.DateTimeFormatOptions;
    return new Date(item).toLocaleDateString('ru-RU', options);
}