import Container from "../components/styles/Container.styled";
import QuotesCard from "../components/QuotesCard";
import QuotesCard2 from "../components/QuotesCard2";

const LandingPage = () => {
    return (
        <Container>
            <h1>landing page</h1>
            "Body mass index (BMI) is a measure of body fat based on height and
            weight that applies to adult men and women."
            <div>
                <QuotesCard />
                <QuotesCard2 />
            </div>
        </Container>
    );
};

export default LandingPage;
