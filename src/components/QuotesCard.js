import styled from "styled-components";

const QuoteStyle = styled.div`
    background-color: #8ee7d9;
    min-height: 200px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    text-align: justify;
    margin: 10px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
        drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

const QuotesCard = ({ quote }) => {
    return (
        <QuoteStyle>
            <p>{quote}</p>
        </QuoteStyle>
    );
};

export default QuotesCard;
