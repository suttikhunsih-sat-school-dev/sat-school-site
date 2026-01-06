"use client"
import { Mail, Phone, Linkedin, Facebook, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react"

export default function ContactUs() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "saturdayschoolthailand@gmail.com",
      href: "mailto:saturdayschoolthailand@gmail.com",
    },
    {
      icon: MessageCircle,
      label: "LINE",
      value: "@zvf5772l",
      href: "https://line.me/ti/p/~zvf5772l",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@satschoolTH",
      href: "https://twitter.com/satschoolTH",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "099-397-0740",
      href: "tel:+66993970740",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Saturday School Foundation",
      href: "https://linkedin.com/company/saturday-school-foundation",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Saturday School",
      href: "https://facebook.com/saturdayschool",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "saturdayschoolthailand",
      href: "https://instagram.com/saturdayschoolthailand",
    },
    {
      icon: Youtube,
      label: "YouTube",
      value: "Saturday School",
      href: "https://youtube.com/saturdayschool",
    },
  ]

  return (
    <div className="min-h-screen bg-[#002060]">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-[#002060] pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight text-balance">Contact Us</h1>
            <div className="w-24 h-2 bg-[#fbde4f] rounded-full mx-auto"></div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-[#fbde4f] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#fbde4f] rounded-full opacity-10 animate-pulse delay-300"></div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-[#2d5a8c] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {contactLinks.map((contact, index) => {
              const Icon = contact.icon
              return (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center space-y-4 hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="p-4 bg-white rounded-full group-hover:bg-[#fbde4f] transition-colors">
                    <Icon className="w-8 h-8 text-[#2d5a8c] group-hover:text-[#002060]" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-white/70">{contact.label}</p>
                    <p className="text-lg font-bold text-white hover:text-[#fbde4f] transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-[#002060] py-24 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">Get In Touch</h2>
          <p className="text-xl text-white/90 leading-relaxed text-pretty max-w-2xl mx-auto">
            Have questions or want to join our community? Reach out to us through any of the channels above. We&apos;d love to hear from you!
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