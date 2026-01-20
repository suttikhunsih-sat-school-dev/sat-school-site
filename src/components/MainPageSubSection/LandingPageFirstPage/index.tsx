import SatSchoolMainQuote from "@/components/DoodleQuote/SatSchoolMainQuote/SatSchoolMainQuote";
import InteractiveCloud from "@/components/InteractiveCloud";
import SaturnWithRedFlagMascotWrapper from "@/components/Mascot/SaturnWithRedFlagMascotWrapper";

const LandingPageFirstPage = () => {
    return <div>
        <div data-mascot-element className="fixed bottom-[140px] left-[-420px] w-full flex justify-center items-center z-[4]">
            <SaturnWithRedFlagMascotWrapper />
        </div>

        <div data-quote-element className="fixed bottom-[0px] left-0 w-full h-[340px] z-[4] flex justify-center items-center pointer-events-none">
            <SatSchoolMainQuote />
        </div>
        <div data-cloud-element className="fixed bottom-[-200px] left-0 w-full flex justify-center items-center z-[3]">
            <InteractiveCloud />
        </div>
    </div>
}

export default LandingPageFirstPage;