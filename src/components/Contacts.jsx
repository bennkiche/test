import React from "react";

function Contacts() {
    return (
        <>
            <h1>Contact Us</h1>
            <ul className="contacts">
                <a href="tel:0111489908">Tel</a>
                <a 
                    href="https://www.facebook.com/profile.php?id=100080886662937" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Facebook
                </a>
                <a 
                    href="https://wa.me/254111489908" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    WhatsApp
                </a>
            </ul>
        </>
    );
}

export default Contacts;