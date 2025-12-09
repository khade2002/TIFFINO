
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Bike,
  MapPin,
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  Quote,
  ArrowRight,
  ChefHat,
  Utensils,
  Linkedin,
  Twitter,
  Thermometer,
  PackageCheck
} from "lucide-react";
import "@fontsource/playfair-display";
import "@fontsource/inter";

/* =====================================================================
   🎨 ANIMATION HELPERS
   ===================================================================== */
const FadeInUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const Counter = ({ from = 0, to, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? to : from}{suffix}
    </span>
  );
};

/* =====================================================================
   🎡 HERO SECTION (Cloud Kitchen Theme)
   ===================================================================== */
function AboutHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  
  return (
    <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-gray-900">
      {/* Dynamic Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-60">
        <img
          // Professional Chef Plating - High Quality Cloud Kitchen Vibe
          src="https://i.pinimg.com/1200x/20/98/13/209813e33c5f411ddfd49d98eef34c14.jpg"
          alt="Cloud Kitchen Chef"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3 h-3 text-yellow-400" /> Redefining Food Delivery
        </motion.div>
        
        <motion.h1 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-['Playfair_Display'] text-white leading-tight mb-6"
        >
          Future of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Good Food.</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
          className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
        >
          We are a <span className="text-white font-medium">Cloud Kitchen</span> network merging culinary art with technology to deliver hygienic, restaurant-quality meals to your doorstep.
        </motion.p>
      </div>
    </div>
  );
}

/* =====================================================================
   🚀 MAIN COMPONENT
   ===================================================================== */
export default function About() {
  const stats = [
    { label: "Cloud Kitchens", value: 12, suffix: "+", icon: <ChefHat className="w-6 h-6"/> },
    { label: "Daily Meals", value: "15k", suffix: "+", icon: <Utensils className="w-6 h-6"/> },
    { label: "Cities Served", value: 8, suffix: "", icon: <MapPin className="w-6 h-6"/> },
    { label: "Delivery Time", value: "30", suffix: "min", icon: <Clock className="w-6 h-6"/> },
  ];

  const hygieneSteps = [
    { title: "Temp Checks", desc: "Staff temperature tracked daily.", icon: <Thermometer/> },
    { title: "Sanitization", desc: "Kitchens sanitized every 4 hours.", icon: <Sparkles/> },
    { title: "Fresh Sourcing", desc: "Ingredients procured daily.", icon: <PackageCheck/> },
    { title: "Contactless", desc: "Safe packaging & delivery.", icon: <ShieldCheck/> },
  ];

  const team = [
    { name: "Nikhileshwar Kshirsagar", role: "Founder & CEO", img: "https://media.licdn.com/dms/image/v2/D5603AQEzL9cqlUoMUQ/profile-displayphoto-crop_800_800/B56ZhfN4dIHQAQ-/0/1753944132456?e=1765411200&v=beta&t=wS4Co8iK6yL2V1bU4ktL5KHSGzfSXGeJJGEiI-HwtvY" },
    { name: "Ketan Shevatkar", role: "COO", img: "https://media.licdn.com/dms/image/v2/D5603AQFICdT5L2YJUQ/profile-displayphoto-shrink_800_800/B56ZPUSb2lGsAc-/0/1734433423775?e=1765411200&v=beta&t=nxN841dtuvSbilBvce-ybc_KJtofSGqH9c058aI4ygs" },
    { name: "Rajesh Patale", role: "Tech Lead", img: "https://media.licdn.com/dms/image/v2/D4D03AQEpea7y5szPig/profile-displayphoto-shrink_800_800/B4DZOrh2n6HYAc-/0/1733749599327?e=1765411200&v=beta&t=WzKSddIBwoMaCvH-cs-IIULrwGhsbTYhUR-Lvn97ML4" },
    { name: "Sagar Katekhaye", role: "Marketing Head", img: "https://media.licdn.com/dms/image/v2/D4D03AQHswZaoyj8VZw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728452586286?e=1765411200&v=beta&t=wN08E-icmRk6DtMZCjO0ct1ukZJvvoqEiCZMKHVA25o" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-900">
      
      <AboutHero />

      {/* --- FLOATING STATS STRIP --- */}
      <div className="relative -mt-24 z-20 max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-gray-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-2xl shadow-sm">{s.icon}</div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-['Playfair_Display']">
                  <Counter to={s.value} suffix={s.suffix} />
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- HYGIENE & TECH SECTION --- */}
      <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
             <motion.img 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop" // Pasta/Prep
                className="rounded-3xl shadow-lg mt-8"
             />
             <motion.img 
                initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop" // Chef Plating (Dark/Premium)
                className="rounded-3xl shadow-lg"
             />
          </div>

          <FadeInUp>
            <span className="text-red-600 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
               <ShieldCheck size={18}/> Hygiene First
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mt-4 mb-6 text-gray-900">
              Not just a Kitchen,<br/> It's a <span className="text-red-600 italic">Science Lab.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We operate centralized <b>Cloud Kitchens</b> where technology meets tradition. No dining halls, just pure focus on food quality, packaging, and hygiene.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hygieneSteps.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-100 transition-colors">
                  <div className="mt-1 text-red-500">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* --- STORY & VISION --- */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/30 rounded-full blur-[150px] pointer-events-none"/>
         
         <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <Quote className="text-red-500 w-12 h-12 mx-auto mb-6 opacity-80"/>
            <h2 className="text-3xl md:text-5xl font-bold font-['Playfair_Display'] leading-snug mb-8">
               "We realized that people don't just want food delivery. They want the <span className="text-red-500">assurance</span> that their meal was cooked in a clean, professional environment."
            </h2>
            <div className="flex items-center justify-center gap-4">
               <img src={team[0].img} className="w-12 h-12 rounded-full border-2 border-red-500" alt="Founder"/>
               <div className="text-left">
                  <p className="font-bold text-lg">Nikhileshwar Kshirsagar</p>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Founder, Tiffino</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- LEADERSHIP TEAM --- */}
      <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-red-600 font-bold text-xs uppercase tracking-widest">The Brains</span>
          <h2 className="text-4xl font-bold font-['Playfair_Display'] text-gray-900 mt-2">Leadership Team</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100">
                <div className="h-72 overflow-hidden bg-gray-100 relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                     <button className="bg-white text-black p-2 rounded-full hover:bg-red-600 hover:text-white transition"><Linkedin size={18}/></button>
                     <button className="bg-white text-black p-2 rounded-full hover:bg-blue-400 hover:text-white transition"><Twitter size={18}/></button>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-xs text-red-500 font-bold uppercase tracking-wider mt-1">{member.role}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION (Food Focus) --- */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden relative shadow-2xl h-[400px] flex items-center justify-center text-center">
           <img 
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover"
              alt="Food Spread"
           />
           <div className="absolute inset-0 bg-black/60"/>
           
           <div className="relative z-10 px-4">
              <h2 className="text-4xl md:text-6xl font-bold text-white font-['Playfair_Display'] mb-6">
                 Hungry yet?
              </h2>
              <p className="text-gray-200 text-lg mb-8 max-w-xl mx-auto">
                 Experience the magic of cloud kitchen dining. Freshly prepared, hygienically packed, and delivered fast.
              </p>
              <button className="px-10 py-4 bg-red-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all flex items-center gap-3 mx-auto">
                 Order Your Meal <ArrowRight size={20}/>
              </button>
           </div>
        </div>
      </section>

    </div>
  );
}