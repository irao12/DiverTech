import React from "react";
import Button from "../components/Button";
import JobListing from "../components/JobListing";
import { TailSpin } from "react-loader-spinner";

export default function Opportunities() {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [opportunities, setOpportunities] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [completedSearch, setCompletedSearch] = React.useState(false);

	const handleChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const getDefaultOpportunities = async () => {
		if (isLoading) return;
		try {
			await setIsLoading(true);
			const response = await fetch(`/opportunities?search=`, {
				method: "GET",
			});
			const opportunities = await response.json();
			setOpportunities(opportunities);
			setIsLoading(false);
			setCompletedSearch(true);
		} catch (err) {
			console.error(err);
			setIsLoading(false);
		}
	};

	const getOpportunitiesBySearch = async () => {
		// if the application is already looking for opportunities, don't do anything
		if (isLoading) return;
		try {
			await setIsLoading(true);
			const encodedSearch = encodeURIComponent(searchQuery);

			const response = await fetch(
				`/opportunities?search=${encodedSearch}`
			);

			const opportunities = await response.json();
			setOpportunities(opportunities);
			setIsLoading(false);
			setCompletedSearch(true);
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
			{!isLoading && (
				<div className="search">
					<div className="search-bar">
						<input
							type="text"
							onChange={handleChange}
							value={searchQuery}
						></input>
						<Button
							text="Search"
							handleClick={getOpportunitiesBySearch}
						/>
					</div>
				</div>
			)}
			<section className="opportunities">
				{isLoading && (
					<>
						<TailSpin
							height="80"
							width="80"
							color="#2E2252"
							ariaLabel="tail-spin-loading"
							radius="1"
							wrapperStyle={{}}
							wrapperClass=""
							visible={true}
						/>
						<h3>Loading </h3>
						<p>May Take a Moment</p>
					</>
				)}
				{!completedSearch && !isLoading && (
					<Button
						handleClick={() => getDefaultOpportunities()}
						text="Find Opportunities!"
					/>
				)}
				{opportunities.length > 0 && !isLoading && (
					<div className="job-listing-container">
						{opportunities.map((opportunity, index) => (
							<JobListing key={index} opportunity={opportunity} />
						))}
					</div>
				)}
				{!isLoading &&
					completedSearch &&
					opportunities.length === 0 && <div>No Results</div>}
			</section>
		</main>
	);
}
