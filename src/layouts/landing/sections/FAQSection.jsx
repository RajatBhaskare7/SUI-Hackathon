import Heading from "../components/Heading"
import QAComponent from "../components/Q&A"

const questions = [
  {
    id: 1,
    question: "What services does Titan Technologies offer?",
    answer:
      "Titan Technologies offers a range of investment services including portfolio management, financial planning, wealth management, and investment advisory services.",
  },
  {
    id: 2,
    question: "How can I invest with Titan Technologies?",
    answer:
      "Investing with Titan Technologies is easy. Simply contact us through our mail or by phone to schedule a consultation with one of our financial advisors.",
  },
  {
    id: 3,
    question: "What is the minimum investment requirement?",
    answer:
      "The minimum investment requirement varies depending on the specific investment products or services you're interested in. Our financial advisors can provide you with detailed information during your consultation.",
  },
  {
    id: 4,
    question: "What is Titan Technologies' investment approach?",
    answer:
      "Titan Technologies employs a diversified investment approach tailored to each client's individual goals, risk tolerance, and time horizon. We prioritize long-term growth and wealth preservation.",
  },
  {
    id: 5,
    question: "What fees does Titan Technologies charge?",
    answer:
      "Our fee structure varies depending on the services provided and the size of the investment. We are transparent about our fees and will fully disclose them to you before you commit to investing with us.",
  },
  {
    id: 6,
    question: "How often will I receive updates on my investments?",
    answer:
      "Titan Technologies provides regular updates on your investments, including performance reports and market insights. You can also schedule meetings with your financial advisor as needed to discuss your portfolio.",
  },
  {
    id: 7,
    question: "Is my data safe with Titan Technologies?",
    answer:
      "Yes, Titan Technologies takes the security and privacy of your information very seriously. We use industry-standard security measures to protect your data and adhere to strict confidentiality policies.",
  },
  {
    id: 8,
    question: "Does Titan offer socially responsible investments?",
    answer:
      "Yes, Titan Technologies offers socially responsible investment options for clients who wish to align their investments with their values. Our financial advisors can help you explore these options further.",
  },
  {
    id: 9,
    question: "How can I contact Titan for support or inquiries?",
    answer:
      "You can reach Titan Technologies by phone, email, or through the contact form on our website. Our team is available to assist you during regular business hours.",
  },
  {
    id: 10,
    question: "Does Titan provide retirement planning services?",
    answer:
      "Yes, Titan Technologies offers comprehensive retirement planning services to help clients achieve their retirement goals. Our financial advisors can work with you to create a personalized retirement strategy.",
  },
]

export default function FAQSection() {
  return (
    <section id="FAQ" className="w-full col gap-4 mt-10">
      <Heading
        className="text-center"
        heading=""
        subHeading="Frequently asked Questions"
      />

      <div  className="grid grid-cols-1 md:grid-cols-2 place-items-start mt-6">
        {questions.map((prop, i) => (
          <QAComponent key={i} {...prop} />
        ))}
      </div>

      {/* <div className="flex flex-row flex-wrap mt-6">
                {questions.map((prop, i) => (
                    <div key={i} className="flex-[100%] md:flex-[50%]">
                        <QAComponent {...prop} />
                    </div>
                ))}
            </div> */}
    </section>
  )
}
