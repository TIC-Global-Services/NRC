
import MobileScrollProgress from "./MobileProgressSection";
import VerticalZigZagProgress from "./VerticalZigZagProcess";

const InvestmentProcess = () => {
  const steps = [
    { bottomText: "Rigorous Research, Ground Realities, Leadership & Management" },
    { topText: "Business Dynamics and Quality of Earnings, Financial modeling" },
    { bottomText: "Robust Filters (Large addressable market, Solid business franchise)" },
    { topText: "(Profitable growth, Management with execution track record)" },
  ];

  return (
    <>
      <div className=" ">
        <VerticalZigZagProgress title="Investment Process" steps={steps} />
      </div>
      {/* <div className="lg:hidden">
        <MobileScrollProgress title="Investment Process" steps={steps} />
      </div> */}
    </>
  );
};

export default InvestmentProcess;
