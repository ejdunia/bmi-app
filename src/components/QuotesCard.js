import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import refresh from "../assets/refresh.png";

// const apiNinjasKey = process.env.REACT_APP_API_NINJAS_KEY;
// const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;

const QuoteStyle = styled.div`
    background-color: #d0fbff;
    max-width: 300px;
    min-width: 100px;
    min-height: 50px;
    max-height: 100%;
    font-size: 0.8rem;
    height: 150px;
    padding: 20px;
    display: flex;
    text-align: justify;
    margin: 10px;
    border-radius: 10px;
    align-items: center;
    overflow: scroll;
    background: ${(props) => (props.primary ? "#f8debd" : "#D0FBFF")};
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
        drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

const IconButton = styled.div`
    width: 10px;
    img {
        width: 25px;
    }
`;
const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

const QuotesCard = () => {
    const [quote, setQuote] = useState({});
    const [loadingQuote, setLoadingQuote] = useState(true);

    const fetchRandomQuote = () => {
        // const options = {
        //     method: "GET",
        //     url: "https://bodybuilding-quotes1.p.rapidapi.com/random-quote",
        //     headers: {
        //         "X-RapidAPI-Key": rapidApiKey,
        //         // "X-RapidAPI-Host": "bodybuilding-quotes1.p.rapidapi.com",
        //         "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
        //     },
        // };

        // const options = {
        //     method: "GET",
        //     url: "https://motivational-quotes1.p.rapidapi.com/motivation",
        //     headers: {
        //         "content-type": "application/json",
        //         "X-RapidAPI-Key":
        //             "30c704615cmsh9a65f41b5cf91d7p141e2djsnf0cc7985f4d3",
        //         "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
        //     },
        //     data: '{"key1":"value","key2":"value"}',
        // };

        try {
            setLoadingQuote(true);
            axios
                .get(`https://api.quotable.io/random`)
                .then((response) => {
                    setQuote(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            setLoadingQuote(false);
        } catch (error) {
            setLoadingQuote(false);
        }
    };

    useEffect(() => {
        fetchRandomQuote();
    }, []);

    return (
        <QuoteStyle>
            {loadingQuote ? (
                <div>loading...</div>
            ) : (
                <div>
                    <p>{quote.content}</p>
                    <h4>{quote.author}</h4>
                    <FlexContainer>
                        <IconButton onClick={() => fetchRandomQuote()}>
                            <img src={refresh} alt="refresh" />
                        </IconButton>
                    </FlexContainer>
                </div>
            )}
        </QuoteStyle>
    );
};

export default QuotesCard;
