import axios from "axios";

export const fetchQuote = async () => {
    const url = 'http://api.forismatic.com/api/1.0/';
    const params = {
        method: 'getQuote',
        lang: 'ru',
        format: 'json',
    };

    const {data} = await axios.get(url, {params});
    const {quoteText: text, quoteAuthor: author} = data;
    return {text, author};
};

