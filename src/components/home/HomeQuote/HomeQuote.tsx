import styles from './HomeQuote.module.scss'
import {Card} from "@/ui/Card/Card";
import CloseIcon from '/public/svg/close-modal.svg';

type HomeQuoteType = {
    quote: { text: string; author: string; };
    onClose: () => void

}

export default function HomeQuote({quote , onClose}: HomeQuoteType) {
    return (
        <Card className={styles.quote}>
            <div className={styles.title}>
                Цитата дня
                <CloseIcon className={styles.icon} onClick={onClose}/>

            </div>
            <div className={styles.quoteText}>
                {quote.text}
            </div>
           <div className={styles.author}>{quote.author}</div>
        </Card>
    );
};