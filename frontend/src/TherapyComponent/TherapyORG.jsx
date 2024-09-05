import React, { useEffect, useState } from 'react';
import './therapyORG.css';
import 'boxicons/css/boxicons.min.css';
import Navbar from '../Navbar';
import OrgCard from './OrgCard';

const TherapyOrganizations = () => {
	const [therapyOrgData, setTherapyOrgData] = useState([]);
	// const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTherapyOrgData = async () => {
			try {
				const response = await fetch('http://localhost:5000/therapy/orgdata', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const data = await response.json();
				console.log("Data received");
				console.log(data);
				setTherapyOrgData(data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchTherapyOrgData();
	}, []);


	const handleSearch = async (e) => {
		const searchValue = e.target.value;
		try {
			const response = await fetch(`http://localhost:5000/therapy/org/search?search=${searchValue}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			console.log('Search value:', searchValue);
			console.log('Fetched data:', data);
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
					<h1>Our Partner Organizations</h1>
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
