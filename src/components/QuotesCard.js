import styled from "styled-components";

const QuoteStyle = styled.div`
    background-color: #d0fbff;
    max-width: 400px;
    min-height: 50px;
    max-height: 300px;
    height: 150px;
    padding: 20px;
    display: flex;
    text-align: justify;
    margin: 10px;
    border-radius: 10px;
    align-items: center;
    background: ${(props) => (props.primary ? "#f8debd" : "#D0FBFF")};
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
        drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

const QuotesCard = ({ quote, primary }) => {
    return (
        <QuoteStyle primary={primary}>
            <p>{quote}</p>
        </QuoteStyle>
    );
};

export default QuotesCard;
