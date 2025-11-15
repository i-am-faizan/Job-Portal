import React from 'react'

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards",
    },
    {
      id: 2,
      service: "Web Development",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards",
    },
    {
      id: 5,
      service: "DevOps",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards",
    },
  ]

  return (
    <section className="services">
      <h3>Top Niches</h3>
      <div className="grid">
        {
          services.map(element => {
            return (
              <div className="card" key={element.id}>
                <h4>{element.service}</h4>
                <p>{element.description}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default TopNiches