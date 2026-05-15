"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BoardMembers() {
  return (
   // Board Members Section

<section className="py-24 px-6 bg-[#F5F1E6]">
  <div className="max-w-6xl mx-auto">
    {/* Heading */}
    <div className="text-center mb-14">
      <p className="text-[#C65D3A] uppercase tracking-widest text-sm font-bold mb-3">
        Leadership Team
      </p>

      <h2 className="text-3xl md:text-5xl font-black text-[#0F4C4C]">
        Meet Our Board Members
      </h2>

      <p className="max-w-3xl mx-auto mt-5 text-gray-600 text-lg leading-relaxed">
        TICOWE Green Africa is guided by passionate leaders and professionals
        dedicated to empowering communities and driving sustainable impact.
      </p>
    </div>

    {/* Members Grid */}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          name: "Phanis Awiti Odhiambo ",
          role: "Director & Founder",
          image: "board/director.png",
          description: "Phanis Awiti Odhiambo is the Founder and Director of TICOWE Green Africa, bringing strong expertise in finance, community development, and sustainable empowerment initiatives. She holds a Bachelor of Commerce (Finance) degree from Pwani University and is currently pursuing a Master of Business Administration (MBA) in Finance at the European University of Lefke, Cyprus.With extensive experience in financial management and administration, she has worked with DTB Bank and other reputable financial institutions, where she gained valuable skills in strategic planning, financial operations, and organizational leadership.Phanis is deeply passionate about environmental conservation, women empowerment, and community transformation. Through her leadership, TICOWE Green Africa continues to support farmers, empower women and youth, and promote sustainable development programs that improve livelihoods and strengthen communities across Kenya.",
        },
        {
          name: "Florence Ouma",
          role: "Board Chairperson",
          image: "board/board_chairperson.jpeg",
          description: "Florence Ouma is an accomplished educationist, public administrator, and community development advocate with extensive experience in leadership, governance, and social empowerment. She holds a Master’s degree in Public Administration and Policy Analysis, a Bachelor of Education in Special Needs Education, and is also qualified as a Primary Teacher 1. In addition, she has undertaken Strategic Leadership and Development Programme training, strengthening her expertise in leadership and institutional development.With a strong background in education, Florence has served as a teacher and mentor, dedicating her career to empowering learners and supporting inclusive education. She has also played significant leadership roles in public service, including serving as a Member of the County Public Service Board and as a Member of the County Assembly.Florence is widely recognized for her passion and commitment to women and youth empowerment. Through her advocacy and leadership, she continues to champion initiatives that promote education, leadership development, social inclusion, and sustainable community transformation.",
        },
        {
          name: "Oscar Ouma",
          role: "Project Coordinator",
          image: "board/project_coordinator.jpeg",
          description: "Oscar Ouma is a dedicated community development professional and Project Coordinator at TICOWE Green Africa. He holds a Bachelor’s degree in Business Administration (Procurement) from Great Lakes University of Kisumu and has extensive experience in project coordination, disaster management, and community empowerment initiatives.He previously served as the Director of Disaster and Special Projects in Homa Bay County, where he played a key role in coordinating development programs, emergency response initiatives, and community support projects aimed at improving livelihoods and strengthening resilience among vulnerable populations.Oscar has been instrumental in championing community-driven activities focused on women empowerment, youth empowerment, farmer support, and educational development. He is passionate about creating opportunities that uplift communities socially and economically through sustainable initiatives and grassroots engagement.Through fundraising programs and partnerships, he continues to support education for school-going children, assist small-scale businesses, and promote entrepreneurship among youth and women. His commitment to service, leadership, and community transformation continues to make a positive and lasting impact across the region.",
        },
        {
          name: "Mercy Akinyi",
          role: "Lead Community Outreach",
          image: "board/lead_community_outreach.jpeg",
          description: "Mercy Akinyi is a passionate community outreach leader and advocate for social empowerment at TICOWE Green Africa. With a background in community development and social work, Mercy has dedicated her career to supporting vulnerable populations and driving positive change through grassroots initiatives.She holds a Bachelor’s degree in Social Work and has extensive experience in community engagement, program coordination, and advocacy for women and youth empowerment. Mercy has been instrumental in leading outreach programs focused on education, health, and economic empowerment, working closely with local communities to identify needs and implement sustainable solutions.Her commitment to service and community transformation is evident in her efforts to promote education for school-going children, support small-scale businesses, and empower youth and women through entrepreneurship initiatives. Mercy’s leadership and dedication continue to make a meaningful impact in the communities served by TICOWE Green Africa, fostering resilience, opportunity, and sustainable development. ",
        },
      ].map((member) => (
        <div
          key={member.name}
          className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C4C]/70 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-[#0F4C4C]">
              {member.name}
            </h3>

            <p className="mt-2 text-sm font-semibold tracking-wide text-[#C65D3A] uppercase">
              {member.role}
            </p>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#D7992E]" />

            <p className="mt-5 text-sm leading-7 text-gray-600">
              {member.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
