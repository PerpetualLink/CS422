import { Button } from "@mui/material";
import Cards from "./Cards";

function HiddenCosts() {
    // Just placeholder code to reference how props work in React
    const content = "stuff"

    return (
        <div>
            <div>{"Hidden Costs Page"}</div>
            <Button
                disabled={false}
            >
                {"Cick Me"}
            </Button>
            <Cards
                content={content}
                disabled={"true"}
                helloWorld={"Hello World"}
            />
        </div>
    );
}

export default HiddenCosts;