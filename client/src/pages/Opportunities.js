import React from "react";
import Button from "../components/Button";
import JobListing from "../components/JobListing";
import { TailSpin } from "react-loader-spinner";
import "./Opportunities.css"

export default function Opportunities() {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [previousSearch, setPreviousSearch] = React.useState("");
	const [page, setPage] = React.useState(0);
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
			const response = await fetch(`/opportunities?search=&page=0`, {
				method: "GET",
			});
			const opportunities = await response.json();
			setOpportunities(opportunities);
			setIsLoading(false);
			setCompletedSearch(true);
			setPreviousSearch("");
			setPage(0);
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
				`/opportunities?search=${encodedSearch}&page=0`
			);

			const opportunities = await response.json();
			setOpportunities(opportunities);
			setIsLoading(false);
			setCompletedSearch(true);
			setPreviousSearch(searchQuery);
			setPage(0);
		} catch (err) {
			console.error(err);
			setIsLoading(false);
		}
	};

	const getMoreOpportunities = async () => {
		await setIsLoading(true);
		const encodedSearch = encodeURIComponent(previousSearch);
		const response = await fetch(
			`/opportunities?search=${encodedSearch}&page=${page + 10}`
		);
		const opportunities = await response.json();
		setOpportunities((oldOpportunities) => [
			...oldOpportunities,
			...opportunities,
		]);
		setPage((oldPage) => oldPage + 10);
		setIsLoading(false);
	};

	return (
		<main className="opportunities-page">
			<h1 className="opportunities-title">
				Find Internships from Companies Devoted to Equal Opportunities!
			</h1>
			{!isLoading && (
				<div className="search">
					<div className="search-bar">
						<input
						className="search-input"
							type="text"
							onChange={handleChange}
							value={searchQuery}
						></input>
						<Button
							text="Search"
							handleClick={() => {
								setOpportunities([]);
								getOpportunitiesBySearch();
							}}
						/>
					</div>
				</div>
			)}
			<section className="opportunities">
				{!completedSearch && !isLoading && (
					<Button
						handleClick={() => getDefaultOpportunities()}
						text="Find Opportunities!"
					/>
				)}

				{opportunities.length > 0 && (
					<div className="job-listing-container">
						{opportunities.map((opportunity, index) => (
							<JobListing key={index} opportunity={opportunity} />
						))}
						{!isLoading && (
							<Button
								text="Find More"
								handleClick={getMoreOpportunities}
							/>
						)}
					</div>
				)}

				{!isLoading &&
					completedSearch &&
					opportunities.length === 0 && <div>No Results</div>}

				{isLoading && (
					<div className="loading-message">
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
						<p>Please Do Not Close The Generated Chrome Tab</p>
						<p>May Take a Moment</p>
				</div>
				)}
			</section>
		</main>
	);
}
