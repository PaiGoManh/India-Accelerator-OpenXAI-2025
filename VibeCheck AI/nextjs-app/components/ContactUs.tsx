"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  agreement: z.boolean().refine(val => val === true, "You must agree to our Privacy Policy"),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setSuccess("Thanks for reaching out! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="py-20 bg-black flex justify-center">
      <div className="flex w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden">
        {/* Left column: Text content */}
        <div data-aos="fade-right" className="flex flex-col justify-center bg-black w-1/2 mt-[-40%]">
          <button className="mb-4 px-4 py-1 bg-[#8B5CF6] text-white rounded-lg w-fit">Contact Us</button>
          <h2 className="text-4xl font-bold mb-3 text-white">Let’s Get In Touch.</h2>
          <p className="text-white mb-8 text-lg">
            Or just reach out manually to <span className="text-[#8B5CF6]">rahulrahulsajeevan@gmail.com</span>
          </p>
        </div>
        {/* Right column: Form */}
        <div data-aos="zoom-in" className="bg-white/5 p-10 w-1/2 flex items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full text-white">
            <div>
              <label className="block mb-1 text-white">Full Name</label>
              <input
                {...register("fullName")}
                type="text"
                placeholder="Enter your full name…"
                className="w-full px-4 py-2 rounded bg-white/5 border border-gray-700 text-white focus:outline-none"
              />
              {errors.fullName && <span className="text-red-400 text-sm">{errors.fullName.message}</span>}
            </div>
            <div>
              <label className="block mb-1 text-white">Email Address</label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email address..."
                className="w-full px-4 py-2 rounded bg-white/5 border border-gray-700 text-white focus:outline-none"
              />
              {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <label className="block mb-1 text-white">Phone Number</label>
              <input
                {...register("phone")}
                type="text"
                placeholder="+91 (___) ___-____"
                className="w-full px-4 py-2 rounded bg-white/5 border border-gray-700 text-white focus:outline-none"
              />
              {errors.phone && <span className="text-red-400 text-sm">{errors.phone.message}</span>}
            </div>
            <div>
              <label className="block mb-1 text-white">Message</label>
              <textarea
                {...register("message")}
                placeholder="Enter your main text here…"
                className="w-full px-4 py-2 rounded bg-white/5 border border-gray-700 text-white focus:outline-none resize-none"
                maxLength={300}
                rows={5}
              />
              <span className="text-gray-400 text-xs">300/300</span>
              {errors.message && <span className="text-red-400 text-sm">{errors.message.message}</span>}
            </div>
            <div className="flex items-center mb-2">
              <input
                {...register("agreement")}
                type="checkbox"
                id="agreement"
                className="mr-2 accent-blue-400"
              />
              <label htmlFor="agreement" className="text-white text-sm">
                I hereby agree to our <span className="text-blue-400 underline cursor-pointer">Privacy Policy</span> terms.
              </label>
            </div>
            {errors.agreement && <span className="text-red-400 text-sm">{errors.agreement.message}</span>}
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-[#8B5CF6] text-white rounded font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              Contact Us <span>→</span>
            </button>
            {success && <div className="text-green-400 mt-2">{success}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
