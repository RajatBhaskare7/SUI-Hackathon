import { AiOutlineTwitter } from "react-icons/ai";
import { FaGithub, FaBitcoin,FaInstagram } from "react-icons/fa";
import { RiDiscordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const socialIcons = [{
  icon:"AiOutlineTwitter",
  link:'https://twitter.com/Aadi_Jain26',
},
  {
    icon:"FaBitcoin",
    link:'https://bitcoin.org'
  },
  {
    icon:"FaInstagram",
    link:"https://www.instagram.com/titantechnologies.in/"
  }
];

const links = [
  [
    "MarketPlace",
    "About us",
    "Our team",
    "Team Details",
    "Error 404",
    "Cart Page",
  ],
  [
    "Company",
    "Wallet",
    "Create Page",
    "Login Page",
    "Registration",
    "Checkout",
  ],
  ["Services", "Contact Us", "Shop page", "Shop Details", "Collectors"],
];

export default function FooterSection() {
  return (
    <footer className="row w-full">
    

      {/* Left Section */}
      <div className="col w-full justify-between  gap-2">
        <div className=" flex justify-between  w-full space-y-3">
          <h3 className="font-redzone mb-3 text-6xl">Titan Technologies</h3>
          <div style={{
            right:'0',
            display:'flex',
            flexDirection:'column',
            gap:'2rem'
          }}>
            <span className="text-app_gray mt-4 text-sm ">
              titantechnologies@titantechnologies.in
            </span>
            <div className="row mb-2 gap-4">
            {socialIcons.map((item, i) => {
    let IconComponent = null;

    switch (item.icon) {
      case "AiOutlineTwitter":
        IconComponent = AiOutlineTwitter;
        break;
      case "FaBitcoin":
        IconComponent = FaBitcoin;
        break;
      case "FaInstagram":
        IconComponent = FaInstagram;
        break;
      default:
        IconComponent = null;
    }

    return (
      IconComponent && (
        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/50">
          <IconComponent size={18} color="inherit" />
        </a>
      )
    );
  })}
            </div>
          </div>
        </div>

        <span className="text-app_gray text-sm">
          All rights reserved &#169; <b>{new Date().getFullYear()}.</b>
        </span>
      </div>
      {/* Right Section */}
      {/* <div className="row md:gap-24 gap-6">
        {links.map((group, idx) => (
          <ul key={idx + 1} className="col gap-2">
            {group.map((link, i) => (
              <li key={link}>
                {i === 0 ? (
                  <span className="font-redzone mb-2">{link}</span>
                ) : (
                  <Link>{link}</Link>
                    
                 
                )}
              </li>
            ))}
          </ul>
        ))}
      </div> */}
    </footer>
  );
}
