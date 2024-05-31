import Card from "../components/sub-components/Card"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { RiWallet3Line } from "react-icons/ri"
import { AiOutlineCheckCircle } from "react-icons/ai"

const values = [
  { value: "240%", label: "Yearly ROI" },
  { value: "1M+ ", label: "Volume" },
  { value: "100%", label: "Safe and Transparent" }
]

const cards = [
  {
    icon: <MdOutlineVerifiedUser size={44} color="#71dcf5" />,
    title: "Strong Security",
    description:
      "Your investment, our fortress - Titan ensures top-notch security for your peace of mind."
  },
  {
    icon: <RiWallet3Line size={44} color="#948fe8" />,
    title: "Payment Options",
    description:
      "Flexibility at your fingertips - Choose from a variety of payment options tailored to your convenience."
  },
  {
    icon: <AiOutlineCheckCircle size={44} color="#ea9bfa" />,
    title: "Transparent Portfolio",
    description:
      "Clear insights, clear results - Explore your portfolio with full transparency at Titan"
  }
]

export default function Popularity() {
  return (
    <section className="bg-white/10 rounded-3xl col w-full">
      <div className="px-4 row border-b-2 border-app_bg py-6 items-center justify-around gap-4">
        {values.map((it, i) => (
          <div key={i}>
            <span className="md:text-8xl text-6xl font-redzone flex-1">
              {it.value}
            </span>
            <br />
            <span className="text-xl pt-4">{it.label}</span>
          </div>
        ))}
      </div>
      <div className="px-4 row justify-center w-full">
        {cards.map((content, i) => (
          <div
            key={i}
            className={`flex-1 min-w-[200px] ${i !== cards.length - 1 &&
              "md:border-r-2 md:border-app_bg"}`}
          >
            <Card {...content} />
          </div>
        ))}
      </div>
    </section>
  )
}
