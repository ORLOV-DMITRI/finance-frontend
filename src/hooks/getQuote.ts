import axios from "axios";

export const fetchQuote = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/quote`);
    const {quoteText: text, quoteAuthor: author} = data;
    return {text, author};
};

