import React from "react";

const SMEPerformanceCard = () => {
    return (
      <div
        className="w-full sfPro"
        style={{ fontFamily: "SF Pro Display, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto">


          {/* Main Card */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 md:py-16 py-4 px-4 md:px-14">
            {/* Subtitle */}
            <p className="text-primary md:text-sm text-xs leading-[19px] mb-5">
              *Fund Vintage March 2023. Gross Performance excluding Carried
              Interest
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8">
              {/* MOIC Card */}
              <div className="bg-[#E5E6EB] rounded-[6px] flex flex-col justify-between h-[168px] px-4 py-5">
                <div className="md:text-2xl text-xl md:leading-[19px] font-bold">1.62x</div>
                <div className="text-secondary text-xs md:text-sm md:leading-[19px] font-medium">
                  MOIC*
                </div>
                <div className="text-secondary text-xs md:text-sm leading-[16px] pt-8 border-t border-gray-200">
                  Multiple on Investment Capital
                </div>
              </div>

              {/* TVPI Card */}
              <div className="bg-[#E5E6EB] rounded-[6px] flex flex-col justify-between h-[168px] px-4 py-5">
                <div className="md:text-2xl text-xl md:leading-[19px] font-bold">1.62x</div>
                <div className="text-secondary text-xs md:text-sm md:leading-[19px] font-medium">
                  MOIC*
                </div>
                <div className="text-secondary text-xs md:text-sm leading-[16px] pt-8 border-t border-gray-200">
                  Multiple on Investment Capital
                </div>
              </div>

              {/* XIRR Card */}
              <div className="bg-[#E5E6EB] rounded-[6px] flex flex-col justify-between h-[168px] px-4 py-5">
                <div className="md:text-2xl text-xl  md:leading-[19px] font-bold">1.62x</div>
                <div className="text-secondary text-xs md:text-sm md:leading-[19px] font-medium">
                  MOIC*
                </div>
                <div className="text-secondary text-xs md:text-sm leading-[16px] pt-8 border-t border-gray-200">
                  Multiple on Investment Capital
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SMEPerformanceCard;
