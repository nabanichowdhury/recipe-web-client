import React from "react";
import MyImage from "../assets/trima.jpeg";

const DevInfo = () => {
  return (
    <div className="m-20">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img width="100px" src={MyImage} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            I'm a third-year Computer Science student focusing on Artificial
            Intelligence at Netaji Subhas University of Technology, New Delhi.
            My expertise lies in full-stack web development, where I've utilized
            the MERN stack to create engaging projects. Alongside, I'm deeply
            committed to advancing my proficiency in Data Structures and
            Algorithms (DSA), continuously striving to enhance my
            problem-solving skills.
          </h2>

          <p>Thank you so much for visiting my website</p>
          <div className="card-actions justify-end">
            <a
              href="https://drive.google.com/file/d/1mmWq9hwhf4FAbbJeRcS8DQMn5YE402Wu/view?usp=sharing"
              target="blank"
              className="btn btn-primary"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevInfo;
