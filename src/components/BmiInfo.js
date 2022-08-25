import styled from "styled-components";
const BMILine = styled.div`
    /* background: rgb(167, 217, 235); */
    background: linear-gradient(
        75deg,
        rgba(167, 217, 235, 1) 0%,
        rgba(144, 224, 226, 1) 17%,
        rgba(185, 220, 172, 1) 50%,
        rgba(231, 205, 133, 1) 78%,
        rgba(227, 131, 141, 1) 100%
    );
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    height: 5px;
`;

const Line = styled.div`
    display: flex;
    justify-content: space-between;
`;
const BMICard = styled.div`
    width: 300px;
    background-color: #4a4949;
    padding: 15px;
    box-sizing: border-box;
    color: wheat;
    border-radius: 10px;
    margin: 10px;
`;
const FLexThis = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HealthStatusDiv = styled.div`
    padding: 5px;
`;
const Slider = styled.input`
    &[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
    }

    &[type="range"]::-moz-range-thumb {
        -webkit-appearance: none;
        border: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: goldenrod;
        margin-top: -4px;
    }
    &[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: goldenrod;
        margin-top: -4px;
    }
`;

const BmiInfo = ({ BMI, HealthStatus }) => {
    return (
        <BMICard>
            <h4>Body Mass Index (BMI) </h4>
            <FLexThis>
                <p>{BMI}</p>
                <HealthStatusDiv>{HealthStatus}</HealthStatusDiv>
            </FLexThis>
            <label htmlFor="bmi">
                <Slider
                    type={"range"}
                    id={"bmi"}
                    value={BMI}
                    name={"bmi"}
                    min={15}
                    max={40}
                    disabled
                ></Slider>
            </label>
            <BMILine></BMILine>
            <Line>
                <p>15</p>
                <p>20</p>
                <p>25</p>
                <p>30</p>
                <p>35</p>
                <p>40</p>
            </Line>
        </BMICard>
    );
};

export default BmiInfo;
