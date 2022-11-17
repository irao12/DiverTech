import React from "react";

export default function JobListing(props) {
	const { company, img, title, link, location } = props.opportunity;
	return (
		<div className="job-listing">
			<a href={link}>
				<h2>{title}</h2>
				<h4>{company}</h4>
				<img src={img} alt="logo" />
				<h4>{location}</h4>
			</a>
		</div>
	);
}
