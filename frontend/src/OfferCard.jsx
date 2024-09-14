import React from 'react'
import LandDelivery from './img/LandDelivery.svg';
import './OfferCard.css';
import { motion } from 'framer-motion';
import { useLocation,useNavigate } from 'react-router-dom';
import RevealUp from './RevealUp';

const OfferCard = ({ image, title, description }) => {

    const navigate = useNavigate();

    const handleJoin = () => {
        navigate('/signup');
    }

    return (
        <motion.div className='offer-card'>
            <div className='offer-card-img'>
                <img src={image} alt="delivery" />
            </div>
            <div className='offer-card-text'>
                <h2>{title}</h2>
                <p>{description}</p>
                <button className="view-more-button" onClick={handleJoin} >JOIN US NOW</button>
            </div>
        </motion.div>
    )
}

export default OfferCard;
