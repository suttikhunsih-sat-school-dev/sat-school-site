import SatSchoolMainQuote from "../DoodleQuote/SatSchoolMainQuote/SatSchoolMainQuote";
import Image from "next/image";
const MainLogoQuoteFirstPage = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-8 z-20 pointer-events-auto">
                <Image
                    src="/Logo-Saturday-school-white.png"
                    alt="Saturday School Logo"
                    width={600}
                    height={600}
                    className="drop-shadow-xl h-auto z-11"
                    priority
                />
                <div className="w-[340px] h-[340px] flex justify-center items-center">
                    <SatSchoolMainQuote />
                </div>
            </div>
        </div>
    );
}

export default MainLogoQuoteFirstPage;