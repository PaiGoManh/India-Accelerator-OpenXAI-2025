'use client';
import { useEffect, useRef } from "react";
import Navbar from '../components/Navbar'
import CommentCheck from '../components/CommentCheck'
import Home from '../components/Home'
import Features from '../components/Features'
import FooterSection from '../components/Footer'
import ContactUs from '../components/ContactUs'
import ScrollToTop from '../components/Helper/ScrollToTop'
import AOS, { init } from 'aos';
import 'aos/dist/aos.css'; 

export default function VibeCheckAI() {
  const homeRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const checkRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(  () => {

    const initAOS = async () => {      
      await import('aos');
      AOS.init({
        duration: 1000 ,
        easing: 'ease',
        once: true,
        anchorPlacement: 'top-bottom',
      });
    };
    
    initAOS();
  }, []);



  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <Navbar 
        refs={{ homeRef, featuresRef, checkRef, contactRef }} 
      />
      <section ref={homeRef}>
        <Home />
      </section>
      <section ref={featuresRef}>
        <Features />
      </section>
      <section ref={checkRef}>
        <CommentCheck />
      </section>
      <section ref={contactRef}>
        <ContactUs />
      </section>
      <FooterSection/>
      <ScrollToTop />
    </main>
  )
}
