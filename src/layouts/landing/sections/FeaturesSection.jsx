import Heading from "../components/Heading"
import Img1 from "../../../assets/img/landings/1.png"
import Img2 from "../../../assets/img/landings/2.png"
import Img3 from "../../../assets/img/landings/3.png"

const cards = [
  {
    id: 1,
    title: "Fueling the Metaverse",
    desc:
      "The Metaverse is the next generation of the internet. As of its earliest explorers, You will help fuel its expansion",
    img:Img1,
    iframeSrc: "https://www.youtube.com/embed/hFiNaqHTDMY",
  },
  {
    id: 2,
    title: "Initial Metaverse Offering",
    desc:
      "The Metaverse is the next generation of the internet. As of its earliest explorers, You will help fuel its expansion",
    img:Img2,
    iframeSrc: "https://www.youtube.com/embed/KUXpzEq42FY",
  },
  {
    id: 3,
    title: "Incubation",
    desc:
      "The Metaverse is the next generation of the internet. As of its earliest explorers, You will help fuel its expansion",
    img:Img3,
    iframeSrc: "https://www.youtube.com/embed/0Vrn3hxqnXA",
  }
]

export default function FeaturesSection() {
  return (
    <section className="w-full col center gap-4">
    <Heading
      heading="Key Features"
      subHeading="Access The Future"
      className="text-center"
    />
    <div className="row w-full justify-center gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-gradient-to-br from-white/10 col rounded-2xl items-start gap-4 py-6 px-4 md:flex-1"
        >
          <iframe
            className="w-full h-40 md:h-60 rounded-xl"
            src={card.iframeSrc}
           
            allowFullScreen
          ></iframe>
          {/* <img
            className="w-16 h-w-16"
            src={card.img}
            alt={card.title}
          /> */}
          {/* <h4 className="font-redzone text-2xl">{card.title}</h4>
          <span className="text-app_gray/70">{card.desc}</span> */}
        </div>
      ))}
    </div>
  </section>
  
  )
}
