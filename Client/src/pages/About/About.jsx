import "./About.css"

const teamMembers = [
    {
      name: "Abhishek Rawat",
      title: "Front-end Developer",
      location: "Ayodhya",
      image: "./abhishek.jpg",
    },
    {
      name: "Alankrit Singh",
      title: "Front-end Developer",
      location: "Delhi",
      image: "./alankrit.jpeg",
    },
    {
      name: "Aditya Keshava",
      title: "Back-end Developer",
      location: "Bengaluru",
      image: "./aditya.jpg",
    },
  ];
  
  export const About = () => {
    return (
      <div className="about-container">
  
        {/* Hero */}
        <section className="hero">
          <h1>We help everyone</h1>
          <p>
            Project Developed for Finance purpose
          </p>
        </section>
  
        {/* Banner */}
        <section className="banner">
          <h2 className="banner-text"></h2>
        </section>
  
        {/* Team */}
        <section className="team-section">
          <h2>The Team</h2>
          <p>
            Meet the 3 of us building and supporting Alpha Finance.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.title}</p>
                <small>{member.location}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };
  
  
  