import React from "react";
import AnushkaImage from '../assets/Anushka.jpg';
import PranavImage from '../assets/Pranav.jpg'; // Uncomment when the image is available
import ShravaniImage from '../assets/Shravani.jpg'; // Uncomment when the image is available

function AboutUs() {
  return (
    <div className="bg-white text-navy text-center">
      {/* Header Section */}
      <div className="bg-lightblue text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About BlogBreeze</h1>
          <p className="text-lg">
            Discover the story behind our platform and the passion driving us forward.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* About the Platform */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-lg mb-6">
              BlogBreeze is your go-to platform for diverse and engaging blog content. Whether you’re into travel, fashion, cooking, or technology, our platform brings you closer to the content you love.
            </p>
            <p className="text-lg mb-6">
              We believe in the power of storytelling and aim to create a community where everyone can find something that resonates with them. Our blog authors come from various backgrounds, each contributing their unique voice to the topics they are passionate about.
            </p>
            <a
              href="/contact"
              className="bg-navy text-white px-6 py-3 rounded-full hover:bg-lightblue transition duration-300"
            >
              Contact Us
            </a>
          </div>

          {/* Image or Illustration */}
          <div className="md:ml-40 ml-10">
            <img
              src="/writer-community.jpg"
              alt="About BlogBreeze"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-lightblue py-12 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-center text-lg mb-6 max-w-2xl mx-auto">
            At BlogBreeze, our mission is to empower readers with insightful and enriching content. We are dedicated to providing a platform for voices from all over the world to share their experiences and knowledge in a way that’s both engaging and meaningful.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
         

          <div className="text-center">
            <img
              src={ShravaniImage}
              alt="Shravani Rasam"
              className="rounded-full mx-auto mb-4 w-40 h-40"
            />
            <h3 className="text-xl font-bold">Shravani Rasam</h3>
            <a href="https://www.linkedin.com/in/shravanirasam02/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-navy text-2xl hover:text-lightblue transition duration-300"></i>
            </a>
          </div>

          {/* Anushka */}
          <div className="text-center">
            <img
              src={AnushkaImage}
              alt="Anushka Shahane"
              className="rounded-full mx-auto mb-4 w-40 h-40"
            />
            <h3 className="text-xl font-bold">Anushka Shahane</h3>
            <a href="https://www.linkedin.com/in/anushka-shahane-3a6329188" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-navy text-2xl hover:text-lightblue transition duration-300"></i>
            </a>
          </div>

         
          <div className="text-center">
            <img
              src={PranavImage}
              alt="Pranav Titambe"
              className="rounded-full mx-auto mb-4 w-40 h-40"
            />
            <h3 className="text-xl font-bold">Pranav Titambe</h3>
            <a href="https://www.linkedin.com/in/pranav-titambe/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-navy text-2xl hover:text-lightblue transition duration-300"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-navy text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Join the Conversation</h2>
        <p className="text-lg mb-6">
          We’d love to hear from you! Share your thoughts, feedback, or even your own stories with us.
        </p>
        <a
          href="/contact"
          className="bg-white text-navy px-6 py-3 rounded-full hover:bg-lightblue hover:text-navy transition duration-300"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}

export default AboutUs;
