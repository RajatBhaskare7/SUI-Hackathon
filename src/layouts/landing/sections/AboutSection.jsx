import Heading from "../components/Heading"
import Img from "../../../assets/img/landing/why-img.png"
const tags = [
  "Secure Investment",
  "Expert Guidance",
  "Transparent Transactions",
  "Hassle-free Management"
]

export default function AboutSection() {
  return (
    <section className="w-full flex flex-col-reverse md:flex-row-reverse items-center">
      <div className="text md:w-1/2 col gap-4 my-2">
        <Heading
          className="max-w-[90%]"
          heading="About Us"
          subHeading="Unleash the Power of Crypto with Titan Technologies "
        />
        <span className="text-app_gray/80 leading-8 text-xl">
        Titan Technologies is your trusted partner in the exciting world of cryptocurrencies. Our platform offers seamless investment solutions tailored to your needs, ensuring maximum returns with minimal risk. Join us and unlock the potential of crypto investing!
        </span>
        <div className="row gap-2">
          {tags.map((tag, i) => (
            <button
              key={i}
              className="rounded-full px-4 py-3 bg-white/20 hover:bg-white/30"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 my-2 h-full">
        <img
          src={Img}
          alt="robo"
          className="object-contain max-w-[80%] max-h-[90%] mx-auto"
        />
      </div>
    </section>
  )
}
