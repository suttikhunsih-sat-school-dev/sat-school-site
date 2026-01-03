import Image from "next/image"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#002060]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002060] pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <Image
                  src="/sat-balloon.svg"
                  alt="Saturday School Mascot"
                  width={180}
                  height={180}
                  className="animate-bounce-slow"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight text-balance">Our Story</h1>
              <div className="w-24 h-2 bg-[#fbde4f] rounded-full"></div>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-pretty">
                Saturday School Foundation is an educational non-profit foundation who creates a learning space that
                allows everyone in the society to participate in the development of Thai education.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#fbde4f] rounded-3xl rotate-3 opacity-20"></div>
              <Image
                src="/images/image.png"
                alt="Saturday School volunteers and students"
                width={600}
                height={400}
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-[#fbde4f] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#fbde4f] rounded-full opacity-10 animate-pulse delay-300"></div>
      </section>

      {/* Mission Section */}
      <section className="bg-[#fbde4f] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="/images/image.png"
                alt="Saturday School empowerment sign"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#002060] text-balance">Empowering Dreams</h2>
              <div className="w-24 h-2 bg-[#002060] rounded-full"></div>
              <p className="text-xl text-[#002060]/90 leading-relaxed text-pretty">
                It is believed that everyone can be a part of the transformation of education by encouraging children to
                dare to pursue their dreams and return to make a difference to their communities and society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-[#002060] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">The Journey</h2>
            <div className="w-24 h-2 bg-[#fbde4f] rounded-full mx-auto"></div>
          </div>

          <div className="space-y-20">
            {/* 2014 - The Beginning */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-[#fbde4f] text-[#002060] text-3xl font-bold px-6 py-3 rounded-full">
                  2014
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white text-balance">Where It All Began</h3>
                <p className="text-lg text-white/90 leading-relaxed text-pretty">
                  In 2014, Mr. Sorawit Paiboonrattanakorn, also known as Teacher Giraffe, had the opportunity to become
                  a teacher at Pian Pin Memorial School. During his teaching, he realized that it is not possible for
                  children to fully express their potential if students are tested and graded by compulsory school
                  subjects alone.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#fbde4f] rounded-3xl -rotate-3 opacity-20"></div>
                <Image
                  src="/images/image.png"
                  alt="Students working together"
                  width={600}
                  height={400}
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>

            {/* The Initiative */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-[#fbde4f] rounded-3xl rotate-3 opacity-20"></div>
                <Image
                  src="/images/image.png"
                  alt="Students participating in activities"
                  width={600}
                  height={400}
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-white text-balance">A Movement is Born</h3>
                <p className="text-lg text-white/90 leading-relaxed text-pretty">
                  Teacher Giraffe initiated the Saturday School project based on the idea that educational design is not
                  just the duty of the people in the education system. But everyone in society can help each other
                  design education. He publicly started the project with talented acquaintances who volunteered to
                  organize activities for the children at the school on Saturday mornings.
                </p>
              </div>
            </div>

            {/* The Growth */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-white text-balance">Expanding the Impact</h3>
                <p className="text-lg text-white/90 leading-relaxed text-pretty">
                  It was well received by both the volunteers and the children. The volunteers wanted nothing more than
                  seeing the children being entertained and enthusiastic about the activities. This success made Teacher
                  Giraffe seek to expand the project to many other schools.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#fbde4f] rounded-3xl -rotate-3 opacity-20"></div>
                <Image
                  src="/images/image.png"
                  alt="Mission Possible event"
                  width={600}
                  height={400}
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="bg-[#fbde4f] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-[#002060] mb-6 text-balance">11 Years of Impact</h2>
            <div className="w-24 h-2 bg-[#002060] rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-[#002060]/90 max-w-3xl mx-auto leading-relaxed text-pretty">
              Over the past 11 years, the project has been developed as a foundation with remarkable achievements across
              Thailand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#002060] rounded-3xl p-8 text-center space-y-4 shadow-xl hover:scale-105 transition-transform">
              <div className="text-6xl font-bold text-[#fbde4f]">80+</div>
              <div className="text-xl font-semibold text-white">Schools</div>
              <p className="text-white/80 text-pretty">Opportunity expansion schools in Bangkok and other provinces</p>
            </div>

            <div className="bg-[#002060] rounded-3xl p-8 text-center space-y-4 shadow-xl hover:scale-105 transition-transform">
              <div className="text-6xl font-bold text-[#fbde4f]">6,467</div>
              <div className="text-xl font-semibold text-white">Volunteers</div>
              <p className="text-white/80 text-pretty">Passionate individuals creating educational opportunities</p>
            </div>

            <div className="bg-[#002060] rounded-3xl p-8 text-center space-y-4 shadow-xl hover:scale-105 transition-transform">
              <div className="text-6xl font-bold text-[#fbde4f]">22,282</div>
              <div className="text-xl font-semibold text-white">Children</div>
              <p className="text-white/80 text-pretty">Young minds empowered to pursue their dreams</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-[#002060] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <Image src="/sat-balloon.svg" alt="Saturday School Mascot" width={150} height={150} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">The Journey Continues</h2>
          <p className="text-xl text-white/90 leading-relaxed text-pretty">
            Saturday School continues to bring broader change for children in Bangkok, neighboring areas, and provinces
            across the country. Together, we are creating a future where every child has the opportunity to discover
            their potential and make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <div className="w-16 h-16 bg-[#fbde4f] rounded-full animate-bounce"></div>
            <div className="w-16 h-16 bg-[#fbde4f] rounded-full animate-bounce delay-100"></div>
            <div className="w-16 h-16 bg-[#fbde4f] rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
