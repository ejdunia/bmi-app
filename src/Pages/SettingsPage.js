import React from "react";
import CheckboxToggle from "../components/CheckBoxToggle";
import Container from "../components/styles/Container.styled";
import Toggle2 from "../components/Toggle2";
import ToggleContainer from "../components/ToggleContainer";

const SettingsPage = () => {
    return (
        <Container>
            <div>
                <ToggleContainer>
                    <CheckboxToggle
                    // onChange={() =>
                    // // setShowQuotes(() => )
                    //     // setShowQuote1(!showQuote1)
                    // }
                    />
                    <span>Toggle Motivational Quote</span>
                </ToggleContainer>
                <ToggleContainer>
                    <Toggle2
                    // onToggleChange={() =>
                    //     setShowQuote2(!showQuote2)
                    // }
                    />{" "}
                    <span>Toggle Fitness quote</span>
                </ToggleContainer>
                {/* {showQuote1 && <QuotesCard />}

                                {showQuote2 && <QuotesCard2 />} */}
            </div>
        </Container>
    );
};

export default SettingsPage;
