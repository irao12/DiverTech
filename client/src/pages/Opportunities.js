import React from "react";
import Button from "../components/Button";
import JobListing from "../components/JobListing";

export default function Opportunities() {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [opportunities, setOpportunities] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const getDefaultOpportunities = async () => {
		try {
			await setIsLoading(true);
			const response = await fetch("/opportunities", {
				method: "GET",
			});
			const opportunities = await response.json();
			console.log(opportunities);
			setOpportunities(opportunities);
			setIsLoading(false);
		} catch (err) {
			console.error(err);
			setIsLoading(false);
		}
	};

	return (
		<main className="opportunities-page">
			<h1>
				Find Internships from Companies Devoted to Equal Opportunities!
			</h1>
			<div className="search">
				<div className="search-bar">
					<input
						type="text"
						onChange={handleChange}
						value={searchQuery}
					></input>
					<button type="button" className="search-button">
						Search
					</button>
				</div>
			</div>
			<section className="opportunities">
				{isLoading && "LOADING..."}
				{opportunities.length === 0 && !isLoading && (
					<Button
						handleClick={() => getDefaultOpportunities(true)}
						text="Find Opportunities!"
					/>
				)}
				{opportunities.length > 0 && (
					<div className="job-listing-container">
						{opportunities.map((opportunity, index) => (
							<JobListing key={index} opportunity={opportunity} />
						))}
					</div>
				)}
			</section>
		</main>
	);
}
