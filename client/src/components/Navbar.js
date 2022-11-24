import { Component } from "react";
import "./NavbarStyles.css";
import { MenuBar } from "./MenuBar";
import { Link } from "react-router-dom";

class NavBar extends Component {
	render() {
		return (
			<nav className="Items">
				<h1 className="logo">DiverTech</h1>

				<ul className="menu-bar">
					{MenuBar.map((bar, index) => {
						return (
							<li key={index}>
								<Link className={bar.cTitle} to={bar.url}>
									{bar.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}
}
export default NavBar;
