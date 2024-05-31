// import Button from "../components/Button"
import Heading from "../components/Heading"
import Img1 from "../../../assets/img/landings/av-1.png"
import Img2 from "../../../assets/img/landings/av-2.png"
import Img3 from "../../../assets/img/landings/av-3.png"

export default function CollectionSection() {
    const img =[Img1,
        Img2,
    Img3]
  return (
    <section className="w-full flex flex-col md:flex-row gap-4 items-center">
      <div className="flex-[1] text-start col gap-4 items-start pr-4">
        <Heading heading="Collection" subHeading="Bored apes NFT Items" />
        <span className="text-app_gray/80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo delectus
          ad accusamus aut debitis consectetur sequi magnam? Eum, fuga?
        </span>
        <button outline>View on Opensea</button>
      </div>
      <div className="flex-[2] overflow-x-scroll flex-grow max-w-[90vw] no-scrollbar inline-flex flex-row gap-4">
        {img.map( i => (
          <div className="min-w-[200px] rounded-md">
            <img
              className="object-cover"
              src={i}
              alt="avatar"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
