import React, { useState, useRef } from "react";
// import ReactDOM from "react-dom";
import styled from "styled-components";
import searchImage from "../assets/search.png";
const Form = styled.form`
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #f8debd;
    /* Change width of the form depending if the bar is opened or not */
    width: ${(props) => (props.barOpened ? "80%" : "2rem")};
    /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
    cursor: ${(props) => (props.barOpened ? "auto" : "pointer")};
    padding: 10px;
    height: 5px;
    margin: 10px;
    border-radius: 10rem;
    transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;
const StyledSearch = styled.img`
    width: 20px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Input = styled.input`
    background-color: transparent;
    width: 100%;
    margin-left: ${(props) => (props.barOpened ? "1rem" : "0rem")};
    border: none;
    color: #374151;
    transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

    &:focus,
    &:active {
        outline: none;
    }
    &::placeholder {
        color: #374151;
    }
`;

const Button = styled.button`
    pointer-events: ${(props) => (props.barOpened ? "auto" : "none")};
    cursor: ${(props) => (props.barOpened ? "pointer" : "none")};
    background-color: transparent;
    border: none;
    outline: none;
`;
const Sticky = styled.div`
    position: sticky;
    top: 0;
`;
const SearchBar = () => {
    const [input, setInput] = useState("");
    const [barOpened, setBarOpened] = useState(false);
    const formRef = useRef();
    const inputFocus = useRef();

    const onFormSubmit = (e) => {
        // When form submited, clear input, close the searchbar and do something with input
        e.preventDefault();
        setInput("");
        setBarOpened(false);
        // After form submit, do what you want with the input value
        console.log(`Form was submited with input: ${input}`);
        // alert(`Form was submited with input: ${input}`);
    };

    return (
        <Sticky>
            <Form
                barOpened={barOpened}
                onClick={() => {
                    // When form clicked, set state of baropened to true and focus the input
                    setBarOpened(true);
                    inputFocus.current.focus();
                }}
                // on focus open search bar
                onFocus={() => {
                    setBarOpened(true);
                    inputFocus.current.focus();
                }}
                // on blur close search bar
                onBlur={() => {
                    setBarOpened(false);
                }}
                // On submit, call the onFormSubmit function
                onSubmit={onFormSubmit}
                ref={formRef}
            >
                <Button type="submit" barOpened={barOpened}>
                    <StyledSearch src={searchImage} alt="search" />
                </Button>
                <Input
                    onChange={(e) => setInput(e.target.value)}
                    ref={inputFocus}
                    value={input}
                    barOpened={barOpened}
                    placeholder="What have you eaten today..."
                />
            </Form>
        </Sticky>
    );
};

export default SearchBar;
