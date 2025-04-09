import React, {useState} from "react";

export default function User() {
    const name = "Pasha Zobov";
    const avatar = new URL(`../../assets/Default-Avatar.png`, import.meta.url).href;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="user">
            <p className="user__text user__text_name">{name}</p>
            <div onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 className="user__avatar"
            >{!isHovered ? (
                <img className="user__avatar-image" src={avatar} alt="Avatar"/>
            ) : (
                <span className="user__avatar-text user__text"
                >{name.charAt(0).toUpperCase()}
                </span>
            )}
            </div>
        </div>
    );
}