"use client"
import Image from "next/image"

export default function MessageFromFounder() {
  return (
    <div className="min-h-screen bg-[#002060]">
      <section className="relative overflow-hidden bg-[#002060] pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight text-balance">Founder&apos;s Message</h1>
              <div className="w-24 h-2 bg-[#fbde4f] rounded-full"></div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#fbde4f] rounded-3xl rotate-3 opacity-20"></div>
              <Image
                src="/sat-school-founder.jpeg"
                alt="Mr. Sorawit Paiboonrattanakorn"
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

      {/* Message Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <blockquote className="text-xl text-[#002060]/90 leading-relaxed text-pretty italic">
              &ldquo;After Saturday School was established 5 years ago, my vision gradually became real &ndash; Saturday School is no longer just a place for school students, but more importantly a space for all to come join, creating inspiration, creating impact, and creating value out of the community for the greater future of the society we all picture to achieve. Many things have changed from the beginning. The number of our classrooms is increasing, and the same goes for the number of volunteers &ndash; from one to ten, from ten to hundreds. Saturday School is now not only a class that&apos;s held on just Saturday morning, but it&apos;s where our people gather together every weekend and even every weekday after work to spend time learning, growing, as well as receiving and giving inspiration to one another.
            </blockquote>

            <p className="text-lg text-[#002060]/80 leading-relaxed text-pretty">
              People usually join Saturday School by word of mouth &ndash; when we join, we learn, and we share the experiences we&apos;ve received. The very interesting thing to me is that what people gain from the same story is different. Some people came with depression, and some came with a very tiny bit of confidence, but once they are brave enough to step out of their comfort zone, they found a way to unlock themselves, and they found &ldquo;friends&rdquo;. I find this breakthrough magical.
            </p>

            <p className="text-lg text-[#002060]/80 leading-relaxed text-pretty">
              The most important aspect of Saturday School is that Saturday School is not all about &ldquo;me&rdquo;, but it has become what it is today because everyone, every volunteer, every child, has helped and is helping shape Saturday School the way they wish it to be. Everyone is a part of creating this atmosphere. I truly believe that this is what we&apos;d need in Thai society, and this can only be achieved once &ldquo;everyone&rdquo; believes in their capability of changing, creating, and being. We all can drive and push Thai education system and society, and I warmly welcome you all to be a part of.
            </p>

            <div className="pt-8 border-t border-[#002060]/20">
              <p className="text-lg font-semibold text-[#002060]">Mr. Sorawit Paiboonrattanakorn</p>
              <p className="text-[#002060]/70">CEO Of Saturday School Foundation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#002060] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">Join Our Community</h2>
          <p className="text-xl text-white/90 leading-relaxed text-pretty">
            Be part of this movement. Together, we can create a future where every child discovers their potential and makes a difference.
          </p>
        </div>
      </section>
    </div>
  );
}