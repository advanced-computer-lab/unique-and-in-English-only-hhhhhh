import React from 'react'



 const Footer = () => {
    return (
        <footer className="footer">
            <ul>
                <li>
                    <button onClick={event =>  window.location.href='/'}>Home</button>
                </li>
                <li>
                    <button>Privacy Policy</button>
                </li>
            </ul>

            <ul>
                <li>
                    <button onClick={event =>  window.location.href='/'}>Book ur Flight</button>
                </li>
                <li>
                    <button>Giveaway</button>
                </li>
            </ul>

        </footer>
    )
}

export default Footer ;
