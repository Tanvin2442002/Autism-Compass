import React from 'react'
import LandDelivery from './img/LandDelivery.svg';
import './OfferCard.css';
import { motion } from 'framer-motion';
import RevealUp from './RevealUp';

const OfferCard = ({ image, title, description }) => {

    return (
        <motion.div className='offer-card'>
            <RevealUp>
                <div className='offer-card-img'>
                    <img src={image} alt="delivery" />
                </div>
            </RevealUp>
            <RevealUp>
                <div className='offer-card-text'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
                </div>
            </RevealUp>

        </motion.div>
    )
}

export default OfferCard;
