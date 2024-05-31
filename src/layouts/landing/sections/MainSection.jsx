// import Button from "../components/Button";
import Img from "../../../assets/img/landing/hero-img.png";
import { Link } from "react-router-dom";
export default function MainSection() {
  return (
    <section className="center flex w-full flex-col gap-8 md:flex-row">
      <div className="text col gap-8 md:w-1/2">
        <h1 className="font-redzone text-5xl md:text-8xl">
       Invest Today, Prosper Tomorrow!
        </h1>
        <span className="text-app_gray text-xl leading-8">
        Invest with Titan for maximum profit potential in the dynamic world of cryptocurrency. Start growing your wealth today!
        </span>
        
        <div className="flex justify-between ">
          {/* <Button>Get Started</Button>
                    <Button n> */}
          <a href="#CONTACT">
            {" "}
            <button
              type="button"
              className={`rounded-full
      bg-[#4326f3] py-4 px-6 
     hover:bg-[#3b1dff] 
  `}
                    style={{
                      fontFamily:"Redzone"
                    }}
            >
              JOIN US NOW
            </button>
          </a>
         
        </div>
      </div>
      <div className="col center relative gap-4 md:w-1/2">
        <img
          src={Img}
          alt="etherum_logo"
          className="h-[70%] w-[86%] object-contain"
        />
      </div>
    </section>
  );
}
