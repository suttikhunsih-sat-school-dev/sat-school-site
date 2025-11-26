import Image from "next/image";
import Link from "next/link";
const ProjectsPillarForVolunteerSection = () => {
    // return <div
    //     className="z-[4] relative flex items-center justify-between w-full h-screen pl-0 pr-0"
    // >
    //     <div
    //         className="absolute inset-0 -z-20 opacity-0 w-full h-full"
    //         style={{
    //             backgroundImage: "url('/space-bg.png')",
    //             backgroundSize: "cover",
    //             backgroundPosition: "center",
    //         }}
    //     >
    //         aefaefaefaefef
    //     </div>
    // </div>
    return <div
        // className="absolute inset-0 z-20 opacity-0 w-screen h-screen"
        style={{
            backgroundImage: "url('/space-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            top: '50%',
            position: "absolute",
            zIndex: 3,
            width: "100vw",
            height: "100vh",
            opacity: 1,
        }}
    >
        {/* display 4 logos (project) image, using Image from Next instead of img */}
        <div className="flex flex-row justify-center items-center w-full h-full gap-8">
            <Link href="/volunteer/bkk">
                <Image
                    src="/project-logo-bkk.jpg"
                    alt="Project Logo digital classroom"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </Link>
            <Link href="/volunteer/children-pathways">
                <Image
                    src="/project-logo-children-pathways.jpg"
                    alt="Project Logo children pathways"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </Link>
            <Link href="/volunteer/expansion">
                <Image
                    src="/project-logo-expansion.jpg"
                    alt="Project Logo expansion"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </Link>
            <Link href="/volunteer/saturn-v">
                <Image
                    src="/project-logo-saturnv.jpg"
                    alt="Project Logo saturn v"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </Link>
        </div>
    </div>
}


export default ProjectsPillarForVolunteerSection;