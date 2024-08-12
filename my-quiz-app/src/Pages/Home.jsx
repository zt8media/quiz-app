// Example: src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './home.css';

function Home() {
  return (
    <>
 
 <div className="home">

        <div className="logo-section">
          <img src="lrnr.png" alt="Logo" className="logo" />
          <h3>Your guided path to programming enlightenment</h3>
          <button className="jrny-button">Begin Journey</button>
        </div>

        <div className="info-container">

          <div className="info">
          <span class="material-icons">flash_on</span>
            <h3>Personalized Quizzes</h3>
            <p>
              Greetings, young padawan. Are you ready to embark on a journey of personalized enlightenment through the art of coding? Our app can create custom quizzes that align with your coding skills and interests. Whether you are a novice or a master, our system can generate questions that will test your proficiency in programming languages, tools, and concepts.
            </p>
          </div>


          <div className="info">
          <span class="material-icons">
payments
</span>
            <h3>Rewarding</h3>
            <p>
              Our app is designed to be both challenging and rewarding, so you can learn new concepts while enjoying the process. With our personalized quiz app, you can track your progress, compete with your peers, and discover new areas of expertise. The journey of a thousand lines of code begins with a single keystroke.
            </p>
          </div>

          <div className="info">
          <span class="material-icons">
person
</span>
            <h3>Personal SME</h3>
            <p>
              Welcome to the path of knowledge. Our app is like having a personal subject matter expert at your side, guiding you on your journey towards wisdom.
            </p>
          </div>

        </div>
        
      </div>
     
    </>
  );
}

export default Home;
