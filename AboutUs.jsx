import React from "react";
import "./AboutUs.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Team Data
const teamMembers = [
  {
    name: "Om Vadar",
    role: "Developer",
    img: "https://media-bom2-1.cdn.whatsapp.net/v/t61.24694-24/597728270_26353763470943945_7193367039406513446_n.jpg?stp=dst-jpg_s96x96_tt6&ccb=11-4&oh=01_Q5Aa4QGGMolMqHDGB0RJ-4i-W_meBSEbI7-uzjnrkifquXM3PQ&oe=69E2371C&_nc_sid=5e03e0&_nc_cat=100",
    
  },
  {
    name: "Parshwa Patil",
    role: "Tester",
    img: "https://media-bom2-1.cdn.whatsapp.net/v/t61.24694-24/662489194_1194298819269644_4841725021588658864_n.jpg?stp=dst-jpg_s96x96_tt6&ccb=11-4&oh=01_Q5Aa4QECRj_AEdyWdhxe0cFymhm2K9hAg4h-PxvA_DVJg7NSFA&oe=69E20BDA&_nc_sid=5e03e0&_nc_cat=103",
    
  },
  {
    name: "Shreyash Inamdar",
    role: "Designer",
    img: "https://media-bom5-1.cdn.whatsapp.net/v/t61.24694-24/665453052_1618951089325455_7814606272618510023_n.jpg?stp=dst-jpg_s96x96_tt6&ccb=11-4&oh=01_Q5Aa4QE3q2udxB_HxxvFy6_gc1sBCCqVa6qCKsfHaaT13pl8Lw&oe=69E2344D&_nc_sid=5e03e0&_nc_cat=109",
   
  },
  {
    name: "Jainuddin Tamboli",
    role: "Database Designer",
    img: "https://media-bom2-1.cdn.whatsapp.net/v/t61.24694-24/657492145_2809402102738032_8323022918165869649_n.jpg?ccb=11-4&oh=01_Q5Aa4QHrAsv4MCvRBt_saOv_XBmanhfhNtXHqqfAVc0FZ_3RkQ&oe=69E235C4&_nc_sid=5e03e0&_nc_cat=108",
   
  },
];

// ✅ Animation
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: "easeOut",
    },
  }),
};

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* HERO */}
      <motion.section
        className="about-hero"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
      >
        <h1>🚖 About Our Uber Clone</h1>
        <p>
          We are committed to making transportation easier, faster, and safer.
          Our platform connects drivers and passengers across Maharashtra.
        </p>
      </motion.section>

      {/* STORY */}
      <motion.section
        className="about-story"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={1}
      >
        <h2>📖 Our Story</h2>
        <p>
          Our journey began with a simple goal: seamless urban mobility.
          Today, we offer cab, auto, and bike booking with real-time features.
        </p>
      </motion.section>

      {/* VALUES */}
      <motion.section
        className="about-values"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={2}
      >
        <h2>💡 Our Values</h2>

        <div className="values-grid">
          {[
            {
              title: "Safety",
              desc: "Passenger safety is our top priority.",
            },
            {
              title: "Reliability",
              desc: "We ensure timely and dependable rides.",
            },
            {
              title: "Innovation",
              desc: "We continuously improve our platform.",
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              className="value-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TEAM */}
      <motion.section
        className="about-team"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2>👨‍💻 Meet Our Team</h2>

        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <motion.div
              className="team-card"
              key={idx}
              variants={fadeInUp}
              custom={idx}
              whileHover={{ scale: 1.08 }}
            >
              <div className="image-container">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/150?text=User")
                  }
                />

                {/* 🔥 SOCIAL OVERLAY */}
                <div className="overlay">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💻
                  </a>
                </div>
              </div>

              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </motion.section>
    </div>
  );
};

export default AboutUs;