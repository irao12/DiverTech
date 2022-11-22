import React from "react";

export default function JobListing(props) {
	const { company, img, title, link, location } = props.opportunity;
	return (
		<div className="job-listing">
			<a href={link}>
				<h2>{title.substr(0, title.indexOf("- job post"))}</h2>
				<h4>{company}</h4>
				<h4>{location}</h4>
			</a>
		</div>
	);
}
