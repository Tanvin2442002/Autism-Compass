import React, { useEffect, useState } from 'react';
import './therapyORG.css';
import 'boxicons/css/boxicons.min.css';
import Navbar from '../Navbar';
import OrgCard from './OrgCard';
import { motion } from 'framer-motion';
const URL = process.env.REACT_APP_API_URL;

const TherapyOrganizations = () => {
	const [therapyOrgData, setTherapyOrgData] = useState([]);
	// const [loading, setLoading] = useState(true);
	const transformToUppercase = (data) => {
		return Object.fromEntries(
			Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
		);
	};
	useEffect(() => {
		const fetchTherapyOrgData = async () => {
			try {
				const response = await fetch(`${URL}/therapy/orgdata`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const tempData = await response.json();
				const data = tempData.map(transformToUppercase);
				
				
				setTherapyOrgData(data);
			} catch (error) {
				
			}
		}
		fetchTherapyOrgData();
	}, []);


	const handleSearch = async (e) => {
		const searchValue = e.target.value;
		try {
			const response = await fetch(`${URL}/therapy/org/search?search=${searchValue}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const tempData = await response.json();
			const data = tempData.map(transformToUppercase);
			
			
			setTherapyOrgData(data);
		} catch (err) {
			console.warn(err.message);
		}
	};

	return (
		<div className='therapy-org'>
			<Navbar />
			<div className="therapy-org-content">
				<div className="details">
					<motion.h1
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.3,
							ease: [0, 0.71, 0.2, 1.01],
							scale: {
								type: "spring",
								damping: 5,
								stiffness: 100,
								restDelta: 0.001
							}
						}}
					>Our Partner Organizations</motion.h1>
					<div className="search-input-box">
						<input
							onChange={handleSearch}
							type="text"
							placeholder="Search organizations..."
							required
						/>
						<i className='bx bx-search'></i>
					</div>
					<div className="org-container">
						{therapyOrgData.map((org) => (
							<div key={org.ORG_ID} className="org-wrapper">
								<OrgCard product={org} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TherapyOrganizations;
