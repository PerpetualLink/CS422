import { useEffect } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Glossary from "./Glossary";
import "./Nav.scss";
import { useBuyerProfile } from "./BuyerProfileContext";
import { pages } from "./navigation";

function Nav() {
    const { profile, updateProfile } = useBuyerProfile();    

    useEffect(() => {
        document.querySelector(".pageContainer").scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [profile.currentRoute])

    return (
        <nav className="navigationBar">
            <Typography
                className="navLogo"
            >
                Foundation Labs
            </Typography>
            {pages.map((navItem) => (
                <Link
                    className={`navButton ${(profile?.currentRoute === navItem.route) ? "active" : ""}`}
                    key={navItem.name}
                    onClick={() => updateProfile({ "currentRoute": navItem.route })}
                    to={navItem.route}
                >
                    {navItem.name}
                </Link>
            ))}
            <Glossary />
        </nav>
    );
}
export default Nav;