import "./Home.css";
import Hero from "../components/Hero";

function Home() {
	return (
		<div className="home-page">
			<h1>Important Facts and Statistics!</h1>
			<ul>
				<li>
					Percentage of female STEM Graduates:{" "}
					<span className="emphasized-text">19%</span>
				</li>
				<li>
					Women leave the tech industry at a higher rate of{" "}
					<span className="emphasized-text">45%</span> compared to
					men.
				</li>
				<li>
					<span className="emphasized-text">11%</span> of the
					engineering workforce is female but only half of women with
					these degress quit right after, while others do not bother
					entering the field
				</li>
				<li>
					These are just a few of the mind-boggling STATISTICS that
					diveristy inclusion programs at numerous tech companies fail
					to address.
				</li>
				<li>
					The Retention problem, "bro-culture", "pay-gap", and failure
					to highlight the work of important female programmers in the
					tech world, has made the term "women in tech" a safety
					phrase just to attract more women into tech companies, yet
					their progress is kept stagnant!
				</li>
			</ul>

			<Hero
				cName="hero"
				title="You Are On Time"
				text="Your Journey Starts Here"
				buttonText="Internship Finder"
				url="/opportunities"
				btnClass="show"
			/>
		</div>
	);
}
export default Home;
