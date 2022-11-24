import "./AboutUs.css";

function AboutUs() {
	return (
		<div className="about-info">
			<h1>Who We Are</h1>
			<p>
				We are four students at Hunter College who created this site as
				part of the WiCS × GWC Hackathon
			</p>
			<h1>About The Project</h1>
			<p>
				This project is intended to tackle the issue of gender diversity
				in tech. On our home page you will be able to see statistics and
				information on the tech industry regarding women and nonbinary
				individuals. These statistics are meant to shed light on issues
				that these groups face when trying to break into the tech
				industry. Our internship finder tab is a web scraper that
				essentially pulls various internships from the web that are
				directed towards women and non-binary individuals with the
				intention of bridging the gender gap in tech. The site was built
				using html, css, and react. The internship finder was built
				using python, flask, and selenium.
			</p>
			<h1>Next Steps</h1>
			<p>
				As a group, our next steps will be to work on expanding our site
				to include more features such as a method for meeting with other
				people in tech or a mentoring system. More features such as
				these will help to unite these communities as we tackle these
				issues.
			</p>
		</div>
	);
}
export default AboutUs;
