import axios from "axios";

export const fetchQuote = async () => {
    const { data } = await axios.get(`https://orlov-finance.ru/api/quote`);
    const {quoteText: text, quoteAuthor: author} = data;
    return {text, author};
};

