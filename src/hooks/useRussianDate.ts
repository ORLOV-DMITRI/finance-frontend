import { useState, useEffect } from 'react';

const useRussianDate = () => {
    const [russianDate, setRussianDate] = useState('');

    useEffect(() => {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        const date = new Date();
        const dayOfWeek = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        setRussianDate(`${day} ${month}, ${dayOfWeek}`);
    }, []);

    return russianDate;
};

export default useRussianDate;
