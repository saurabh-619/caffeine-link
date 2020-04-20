import React from "react";
import saurabhImg from "./saurabh.jpg";
import Spinner from "./../layout/Spinner";

const About = (props) => {
  return !saurabhImg ? (
    <Spinner />
  ) : (
    <div className="about-section bg-light p-2">
      <h2 className="about-heading">About</h2>
      <img src={saurabhImg} className="about-img" alt="Saurabh" />
      <p className="about-descr">
        Hey There, I am Saurabh Bomble. Caffeine Link is a linkedin clone where
        you create your DEV profile and can add Profile-photo, education,
        experience, certificates. You can also add posts, can like the post,
        comment the post. Github Id given by you, helps to fetch your recent 5
        github repositories.
      </p>
      <h1>How was my project, Let me know</h1>
      <div className="social-icons">
        <a
          href="https://www.linkedin.com/in/saurabh-bomble-954321171/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          href="https://www.instagram.com/saurabh_bomble619/%20target="
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://github.com/saurabh-619"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="http://saurabh-bomble-portfolio.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-link"></i>
        </a>
      </div>
    </div>
  );
};

export default About;
