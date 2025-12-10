// import { useEffect, useRef, useState } from "react";
// import { motion, useAnimation, AnimatePresence } from "framer-motion";
// import {
//   Sparkles,
//   Zap,
//   ShieldCheck,
//   Bike,
//   MapPin,
//   Star,
//   Clock,
// } from "lucide-react";

// /**
//  * ABOUT PAGE
//  * Tech: React (JS), TailwindCSS, Framer Motion, lucide-react
//  * Sections:
//  * 1) Hero (premium banner + subtle parallax)
//  * 2) Animated Counters (500+ hotels, 500+ dishes, 1000+ happy users, 24/7 support)
//  * 3) "What makes us unique" – image cards with staggered scroll animations
//  * 4) Timeline Line – on scroll, cards pop onto the line one-by-one
//  * 5) Closing CTA
//  *
//  * Notes:
//  * - All numbers & text are mock/static here. Replace with API data if needed.
//  * - Images use Unsplash (royalty-free). Replace with your own CDN if preferred.
//  */

// // -------------------------------------------
// // Small util: useInView (IntersectionObserver)
// // -------------------------------------------
// function useInView(options = { threshold: 0.2 }) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       options
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [options]);
//   return { ref, inView };
// }

// // -------------------------------------------
// // Counter: animates numbers when in view
// // -------------------------------------------
// function Counter({ to = 100, suffix = "+", duration = 1.6, className = "" }) {
//   const { ref, inView } = useInView({ threshold: 0.5 });
//   const [val, setVal] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const step = Math.max(1, Math.floor(to / (60 * duration))); // ~60fps
//     const id = setInterval(() => {
//       start += step;
//       if (start >= to) {
//         setVal(to);
//         clearInterval(id);
//       } else {
//         setVal(start);
//       }
//     }, 1000 / 60);
//     return () => clearInterval(id);
//   }, [inView, to, duration]);

//   return (
//     <div ref={ref} className={className}>
//       {val}
//       {suffix}
//     </div>
//   );
// }

// // -------------------------------------------
// // FeatureCard (image + text + icon)
// // -------------------------------------------
// function FeatureCard({ icon, title, desc, image, delay = 0 }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 28 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.5, delay }}
//       className="group relative overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-xl transition-shadow"
//     >
//       <div className="h-40 md:h-48 w-full overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           loading="lazy"
//         />
//       </div>
//       <div className="p-5">
//         <div className="inline-flex items-center gap-2 rounded-xl bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
//           {icon}
//           <span>{title}</span>
//         </div>
//         <p className="mt-2 text-gray-700 leading-relaxed">{desc}</p>
//       </div>
//     </motion.div>
//   );
// }

// // -------------------------------------------
// // Timeline item (card on a line, reveals in order)
// // -------------------------------------------
// function LineItem({ side = "left", title, desc, icon, delay = 0 }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.5, delay }}
//       className={`relative w-full md:w-1/2 ${side === "left" ? "md:pr-8" : "md:pl-8"} mt-8 md:mt-12`}
//     >
//       {/* Dot */}
//       <span
//         className={`hidden md:block absolute top-2 ${
//           side === "left" ? "right-[-9px]" : "left-[-9px]"
//         } w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20`}
//       />
//       {/* Card */}
//       <div className="bg-white border rounded-2xl p-5 shadow-sm">
//         <div className="flex items-center gap-2 text-primary font-semibold">
//           {icon}
//           <h4 className="text-base md:text-lg">{title}</h4>
//         </div>
//         <p className="mt-1 text-gray-700 leading-relaxed text-sm md:text-base">{desc}</p>
//       </div>
//     </motion.div>
//   );
// }

// export default function About() {
//   // Hero subtle parallax controls
//   const controls = useAnimation();
//   useEffect(() => {
//     const onScroll = () => {
//       const y = window.scrollY;
//       controls.start({ y: y * 0.1 }); // subtle parallax
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [controls]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
//       {/* ============= Hero ============= */}
//       <section className="relative overflow-hidden">
//         <motion.div
//           animate={controls}
//           className="pointer-events-none absolute inset-0 opacity-70"
//           style={{
//             background:
//               "radial-gradient(1200px 400px at 20% -10%, rgba(255,80,80,0.12), transparent 60%), radial-gradient(1200px 400px at 80% 10%, rgba(255,120,60,0.12), transparent 60%)",
//           }}
//         />
//         <div className="relative px-4 md:px-10 lg:px-14 py-16 md:py-24">
//           <div className="max-w-5xl">
//             <p className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
//               <Sparkles className="w-4 h-4" />
//               Crafting delightful food experiences
//             </p>
//             <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
//               About <span className="text-primary">Tiffino</span>
//             </h1>
//             <p className="mt-3 md:mt-4 text-gray-600 max-w-2xl">
//               We’re on a mission to deliver fresh, hygienic and tasty meals from trusted kitchens,
//               backed by lightning-fast logistics and delightful service.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ============= Stats (Animated Counters) ============= */}
//       <section className="px-4 md:px-10 lg:px-14 pb-4">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Hotels</div>
//             <Counter to={500} className="text-3xl md:text-4xl font-extrabold mt-1" />
//             <div className="text-sm text-gray-600 mt-1">partner kitchens</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Dishes</div>
//             <Counter to={500} className="text-3xl md:text-4xl font-extrabold mt-1" />
//             <div className="text-sm text-gray-600 mt-1">across cuisines</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Happy Users</div>
//             <Counter to={1000} className="text-3xl md:text-4xl font-extrabold mt-1" />
//             <div className="text-sm text-gray-600 mt-1">and counting</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Support</div>
//             <Counter to={24} suffix="/7" className="text-3xl md:text-4xl font-extrabold mt-1" />
//             <div className="text-sm text-gray-600 mt-1">always online</div>
//           </div>
//         </div>
//       </section>

//       {/* ============= Unique Features (Image Cards) ============= */}
//       <section className="px-4 md:px-10 lg:px-14 py-10 md:py-14">
//         <div className="flex items-end justify-between">
//           <div>
//             <h2 className="text-xl md:text-2xl font-bold">What makes us unique</h2>
//             <p className="text-sm text-gray-600 mt-0.5">
//               A few reasons customers love us
//             </p>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
//           <FeatureCard
//             icon={<Zap className="w-4 h-4" />}
//             title="Lightning Fast Delivery"
//             desc="Smart routing + dense delivery mesh ensures your food arrives hot and on time."
//             image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1400&auto=format&fit=crop"
//             delay={0.0}
//           />
//           <FeatureCard
//             icon={<ShieldCheck className="w-4 h-4" />}
//             title="Hygiene Assured"
//             desc="FSSAI-compliant partner kitchens with regular audits and quality checks."
//             image="https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1400&auto=format&fit=crop"
//             delay={0.07}
//           />
//           <FeatureCard
//             icon={<MapPin className="w-4 h-4" />}
//             title="Live Order Tracking"
//             desc="Watch your order move from kitchen to your door, minute-by-minute."
//             image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop"
//             delay={0.14}
//           />
//           <FeatureCard
//             icon={<Star className="w-4 h-4" />}
//             title="Curated Menus"
//             desc="From homely meals to premium picks—handpicked for taste & nutrition."
//             image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop"
//             delay={0.21}
//           />
//         </div>
//       </section>

//       {/* ============= Timeline Line (cards appear one-by-one) ============= */}
//       <section className="px-4 md:px-10 lg:px-14 py-10 md:py-14">
//         <div className="text-center max-w-3xl mx-auto">
//           <h3 className="text-xl md:text-2xl font-bold">How we deliver delight</h3>
//           <p className="text-gray-600 mt-2">
//             Scroll to see each step pop in along the line
//           </p>
//         </div>

//         <div className="relative mt-10 md:mt-14">
//           {/* The line */}
//           <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 rounded-full" />
//           {/* Mobile line (left) */}
//           <div className="md:hidden absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 rounded-full" />

//           <div className="relative max-w-5xl mx-auto">
//             <div className="flex flex-col md:block">
//               <LineItem
//                 side="left"
//                 title="Order placed"
//                 desc="You pick from our curated menu; we confirm instantly."
//                 icon={<Clock className="w-4 h-4" />}
//                 delay={0.0}
//               />
//               <LineItem
//                 side="right"
//                 title="Kitchen accepts"
//                 desc="Partner kitchen starts prepping your fresh meal."
//                 icon={<ShieldCheck className="w-4 h-4" />}
//                 delay={0.08}
//               />
//               <LineItem
//                 side="left"
//                 title="Rider assigned"
//                 desc="A nearby delivery partner is auto-assigned for fastest pickup."
//                 icon={<Bike className="w-4 h-4" />}
//                 delay={0.16}
//               />
//               <LineItem
//                 side="right"
//                 title="Live tracking"
//                 desc="You track the rider in real-time until the order arrives."
//                 icon={<MapPin className="w-4 h-4" />}
//                 delay={0.24}
//               />
//               <LineItem
//                 side="left"
//                 title="Bon appétit!"
//                 desc="Enjoy your meal—don’t forget to rate and share feedback."
//                 icon={<Star className="w-4 h-4" />}
//                 delay={0.32}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ============= Closing CTA ============= */}
//       <section className="px-4 md:px-10 lg:px-14 pb-16 md:pb-24">
//         <motion.div
//           initial={{ opacity: 0, y: 18 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.5 }}
//           className="relative overflow-hidden rounded-3xl border bg-white shadow-sm"
//         >
//           <div className="absolute inset-0 pointer-events-none opacity-70" style={{
//             background:
//               "radial-gradient(600px 200px at 15% 10%, rgba(255,80,80,0.10), transparent 60%), radial-gradient(600px 200px at 85% 90%, rgba(255,120,60,0.10), transparent 60%)",
//           }} />
//           <div className="relative p-6 md:p-10">
//             <h4 className="text-xl md:text-2xl font-bold">
//               We’re not just delivering food, we’re delivering experiences.
//             </h4>
//             <p className="text-gray-600 mt-2 max-w-2xl">
//               Join thousands of happy customers who trust us for everyday meals, celebrations,
//               and everything in between.
//             </p>
//             <div className="mt-5 flex flex-wrap gap-3">
//               <a
//                 href="/cuisine"
//                 className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90"
//               >
//                 Explore Menu
//               </a>
//               <a
//                 href="/subscription"
//                 className="px-5 py-2.5 rounded-xl border bg-white hover:bg-gray-50 font-semibold"
//               >
//                 View Subscriptions
//               </a>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// }






// import { useEffect, useRef, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import {
//   Sparkles,
//   Zap,
//   ShieldCheck,
//   Bike,
//   MapPin,
//   Star,
//   Clock,
// } from "lucide-react";
// import "@fontsource/playfair-display"; // premium heading font
// import "@fontsource/inter"; // body font

// // -------------------------------------------
// // useInView Hook
// // -------------------------------------------
// function useInView(options = { threshold: 0.2 }) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       options
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [options]);
//   return { ref, inView };
// }

// // -------------------------------------------
// // Counter Animation
// // -------------------------------------------
// function Counter({ to = 100, suffix = "+", duration = 1.6, className = "" }) {
//   const { ref, inView } = useInView({ threshold: 0.5 });
//   const [val, setVal] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const step = Math.max(1, Math.floor(to / (60 * duration)));
//     const id = setInterval(() => {
//       start += step;
//       if (start >= to) {
//         setVal(to);
//         clearInterval(id);
//       } else {
//         setVal(start);
//       }
//     }, 1000 / 60);
//     return () => clearInterval(id);
//   }, [inView, to, duration]);

//   return (
//     <div ref={ref} className={className}>
//       {val}
//       {suffix}
//     </div>
//   );
// }

// // -------------------------------------------
// // FeatureCard
// // -------------------------------------------
// function FeatureCard({ icon, title, desc, image, delay = 0 }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 28 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.5, delay }}
//       className="group relative overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-xl transition"
//     >
//       <div className="h-40 md:h-48 w-full overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           loading="lazy"
//         />
//       </div>
//       <div className="p-5">
//         <div className="inline-flex items-center gap-2 rounded-xl bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
//           {icon}
//           <span>{title}</span>
//         </div>
//         <p className="mt-2 text-gray-700 leading-relaxed">{desc}</p>
//       </div>
//     </motion.div>
//   );
// }

// // -------------------------------------------
// // Timeline Line
// // -------------------------------------------
// function LineItem({ side = "left", title, desc, icon, delay = 0 }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.5, delay }}
//       className={`relative w-full md:w-1/2 ${
//         side === "left" ? "md:pr-8" : "md:pl-8"
//       } mt-8 md:mt-12`}
//     >
//       <span
//         className={`hidden md:block absolute top-2 ${
//           side === "left" ? "right-[-9px]" : "left-[-9px]"
//         } w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20`}
//       />
//       <div className="bg-white border rounded-2xl p-5 shadow-sm">
//         <div className="flex items-center gap-2 text-primary font-semibold">
//           {icon}
//           <h4 className="text-base md:text-lg">{title}</h4>
//         </div>
//         <p className="mt-1 text-gray-700 leading-relaxed text-sm md:text-base">
//           {desc}
//         </p>
//       </div>
//     </motion.div>
//   );
// }

// export default function About() {
//   const controls = useAnimation();
//   useEffect(() => {
//     const onScroll = () => {
//       const y = window.scrollY;
//       controls.start({ y: y * 0.1 });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [controls]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white font-inter">
//       {/* Hero */}
//      <section className="relative overflow-hidden">
//   <motion.div
//     animate={controls}
//     className="pointer-events-none absolute inset-0 opacity-70"
//     style={{
//       background:
//         "radial-gradient(1200px 400px at 20% -10%, rgba(255,80,80,0.12), transparent 60%), radial-gradient(1200px 400px at 80% 10%, rgba(255,120,60,0.12), transparent 60%)",
//     }}
//   />
//   <div className="relative flex px-4 md:px-10 lg:px-14 py-16 md:py-24">
//     <div className="max-w-5xl">
//       <p className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
//         <Sparkles className="w-4 h-4" />
//         Crafting delightful food experiences
//       </p>
//       <br />

//       {/* Premium Gradient Heading + Underline */}
//       <div className="relative inline-block mt-6">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
//           Think it. <span className="text-primary">About it.</span> Love it.
//         </h1>
//         <span className="block h-[3px] w-24 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full mt-3" />
//       </div>

//       <p className="mt-3 text-lg md:text-xl italic text-gray-800 font-['Playfair_Display']">
//         “Savor the Royal Taste of India – Every Meal, A Story”
//       </p>
//       <p className="mt-4 text-gray-600 max-w-2xl">
//         We’re on a mission to deliver fresh, hygienic and tasty meals from trusted kitchens, backed by lightning-fast logistics and delightful service.
//       </p>
//     </div>
//   </div>
// </section>

//       {/* Stats */}
//       <section className="px-4 md:px-10 lg:px-14 pb-4">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Hotels</div>
//             <Counter
//               to={500}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display']"
//             />
//             <div className="text-sm text-gray-600 mt-1">partner kitchens</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Dishes</div>
//             <Counter
//               to={500}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display']"
//             />
//             <div className="text-sm text-gray-600 mt-1">across cuisines</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Happy Users</div>
//             <Counter
//               to={1000}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display']"
//             />
//             <div className="text-sm text-gray-600 mt-1">and counting</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Support</div>
//             <Counter
//               to={24}
//               suffix="/7"
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display']"
//             />
//             <div className="text-sm text-gray-600 mt-1">always online</div>
//           </div>
//         </div>
//       </section>

//       {/* Gallery Grid (7–8 images) */}
//       <section className="px-4 md:px-10 lg:px-14 py-10 md:py-14">
//         <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-6">
//           A Glimpse of Our World
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {[
//             "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
//             "https://images.unsplash.com/photo-1546069901-eacef0df6022?w=800",
//             "https://images.unsplash.com/photo-1543353071-087092ec393c?w=800",
//             "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
//             "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
//             "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
//             "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
//             "https://images.unsplash.com/photo-1565958011702-44e3a5dcf2d1?w=800",
//           ].map((src, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition"
//             >
//               <img
//                 src={src}
//                 alt="gallery"
//                 className="w-full h-40 md:h-52 lg:h-60 object-cover"
//               />
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Rest of sections (Features, Timeline, CTA) */}
//       {/* Keep your existing code here below ... */}
//     </div>
//   );
// }





// import { useEffect, useRef, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import {
//   Sparkles,
//   Zap,
//   ShieldCheck,
//   Bike,
//   MapPin,
//   Star,
//   Clock,
//   Heart,
// } from "lucide-react";
// import "@fontsource/playfair-display"; // premium heading font
// import "@fontsource/inter"; // body font

// // -------------------------------------------
// // useInView Hook
// // -------------------------------------------
// function useInView(options = { threshold: 0.2 }) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       options
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [options]);
//   return { ref, inView };
// }

// // -------------------------------------------
// // Counter Animation
// // -------------------------------------------
// function Counter({ to = 100, suffix = "+", duration = 2.0, className = "" }) {
//   const { ref, inView } = useInView({ threshold: 0.5 });
//   const [val, setVal] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const step = Math.max(1, Math.floor(to / (60 * duration)));
//     const id = setInterval(() => {
//       start += step;
//       if (start >= to) {
//         setVal(to);
//         clearInterval(id);
//       } else {
//         setVal(start);
//       }
//     }, 1000 / 60);
//     return () => clearInterval(id);
//   }, [inView, to, duration]);

//   return (
//     <div ref={ref} className={className}>
//       {val}
//       {suffix}
//     </div>
//   );
// }

// export default function About() {
//   const controls = useAnimation();
//   useEffect(() => {
//     const onScroll = () => {
//       const y = window.scrollY;
//       controls.start({ y: y * 0.1 });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [controls]);

//   // Specs data
//   const specs = [
//     {
//       icon: <Zap className="w-5 h-5 text-primary" />,
//       title: "Lightning Fast Delivery",
//       desc: "Your food arrives hot & fresh within minutes.",
//     },
//     {
//       icon: <ShieldCheck className="w-5 h-5 text-primary" />,
//       title: "Hygiene Guaranteed",
//       desc: "Every kitchen is verified and food quality checked.",
//     },
//     {
//       icon: <Bike className="w-5 h-5 text-primary" />,
//       title: "Live Order Tracking",
//       desc: "Know exactly where your order is in real-time.",
//     },
//     {
//       icon: <MapPin className="w-5 h-5 text-primary" />,
//       title: "Widest Coverage",
//       desc: "Serving across multiple cities and towns in India.",
//     },
//   ];

//   // Testimonials data
//   const testimonials = [
//     {
//       name: "Aarav S.",
//       feedback:
//         "Tiffino changed my lunch routine completely! Fresh food, fast delivery, and reliable service.",
//       rating: 5,
//     },
//     {
//       name: "Priya K.",
//       feedback:
//         "The hygiene and taste are unmatched. I love ordering dinner from here almost daily.",
//       rating: 5,
//     },
//     {
//       name: "Rohan M.",
//       feedback:
//         "Super easy app to use. Live tracking makes it stress-free, and food quality is always top-notch.",
//       rating: 4,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white font-inter">
//       {/* Hero */}
//       <section className="relative overflow-hidden">
//         <motion.div
//           animate={controls}
//           className="pointer-events-none absolute inset-0 opacity-70"
//           style={{
//             background:
//               "radial-gradient(1200px 400px at 20% -10%, rgba(255,80,80,0.12), transparent 60%), radial-gradient(1200px 400px at 80% 10%, rgba(255,120,60,0.12), transparent 60%)",
//           }}
//         />
//         <div className="relative flex px-4 md:px-10 lg:px-14 py-16 md:py-24">
//           <div className="max-w-5xl">
//             <p className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
//               <Sparkles className="w-4 h-4" />
//               Crafting delightful food experiences
//             </p>
//             <br />
//             {/* Premium Gradient Heading + Underline */}
//             <div className="relative inline-block mt-6">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
//                 Think it. <span className="text-primary">About it.</span> Love
//                 it.
//               </h1>
//               <span className="block h-[3px] w-24 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full mt-3" />
//             </div>
//             <p className="mt-3 text-lg md:text-xl italic text-gray-800 font-['Playfair_Display']">
//               “Savor the Royal Taste of India – Every Meal, A Story”
//             </p>
//             <p className="mt-4 text-gray-600 max-w-2xl">
//               We’re on a mission to deliver fresh, hygienic and tasty meals from
//               trusted kitchens, backed by lightning-fast logistics and
//               delightful service.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="px-4 md:px-10 lg:px-14 pb-4">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Hotels</div>
//             <Counter
//               to={500}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">partner kitchens</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Dishes</div>
//             <Counter
//               to={500}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">across cuisines</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Happy Users</div>
//             <Counter
//               to={1000}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">and counting</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Support</div>
//             <Counter
//               to={24}
//               suffix="/7"
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">always online</div>
//           </div>
//         </div>
//       </section>

//       {/* Gallery Grid */}
//       <section className="px-4 md:px-10 lg:px-14 py-10 md:py-14">
//         <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-6">
//           A Glimpse of Our World
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {[
//             "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
//             "https://images.unsplash.com/photo-1546069901-eacef0df6022?w=800",
//             "https://i.pinimg.com/736x/7c/0b/9b/7c0b9bc37e96e0a9d4a222177414e976.jpg",
//             "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
//             "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
//             "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
//             "https://i.pinimg.com/1200x/80/bd/1a/80bd1aacc9f1bdb966461341f398b5d9.jpg",
//             "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
//           ].map((src, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition"
//             >
//               <img
//                 src={src}
//                 alt="gallery"
//                 className="w-full h-40 md:h-52 lg:h-60 object-cover"
//               />
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Specifications Bar */}
//       <section className="px-4 md:px-10 lg:px-14 py-12 md:py-16 bg-gray-50">
//         <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-10 text-center">
//           Why Choose <span className="text-primary">Tiffino?</span>
//         </h2>
//         <div className="space-y-8 max-w-4xl mx-auto">
//           {specs.map((s, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//               viewport={{ once: true, amount: 0.3 }}
//               className="flex items-start gap-4 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
//             >
//               <div className="p-2 rounded-xl bg-primary/10">{s.icon}</div>
//               <div>
//                 <h4 className="font-semibold text-lg">{s.title}</h4>
//                 <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="px-4 md:px-10 lg:px-14 py-12 md:py-16">
//         <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-10 text-center">
//           What Our <span className="text-primary">Customers Say</span>
//         </h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           {testimonials.map((t, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: i * 0.2 }}
//               viewport={{ once: true }}
//               className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col"
//             >
//               <p className="text-gray-700 flex-1">{t.feedback}</p>
//               <div className="mt-4 flex items-center justify-between">
//                 <span className="font-semibold text-gray-800">{t.name}</span>
//                 <div className="flex text-yellow-500">
//                   {Array.from({ length: t.rating }).map((_, j) => (
//                     <Star key={j} className="w-4 h-4 fill-yellow-500" />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }




// import { useEffect, useRef, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import {
//   Sparkles,
//   Zap,
//   ShieldCheck,
//   Bike,
//   MapPin,
//   Star,
// } from "lucide-react";
// import "@fontsource/playfair-display"; // premium heading font
// import "@fontsource/inter"; // body font

// // -------------------------------------------
// // useInView Hook
// // -------------------------------------------
// function useInView(options = { threshold: 0.2 }) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       options
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [options]);
//   return { ref, inView };
// }

// // -------------------------------------------
// // Counter Animation
// // -------------------------------------------
// function Counter({ to = 100, suffix = "+", duration = 2.0, className = "" }) {
//   const { ref, inView } = useInView({ threshold: 0.5 });
//   const [val, setVal] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const step = Math.max(1, Math.floor(to / (60 * duration)));
//     const id = setInterval(() => {
//       start += step;
//       if (start >= to) {
//         setVal(to);
//         clearInterval(id);
//       } else {
//         setVal(start);
//       }
//     }, 1000 / 60);
//     return () => clearInterval(id);
//   }, [inView, to, duration]);

//   return (
//     <div ref={ref} className={className}>
//       {val}
//       {suffix}
//     </div>
//   );
// }

// // -------------------------------------------
// // Hero Carousel Component
// // -------------------------------------------
// function HeroCarousel() {
//   const images = [
//     "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   ];
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 2000); // 2 sec interval
//     return () => clearInterval(id);
//   }, [images.length]);

//   return (
//     <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
//       {images.map((src, i) => (
//         <motion.img
//           key={i}
//           src={src}
//           alt="hero slide"
//           className="absolute w-full h-full object-cover"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: i === current ? 1 : 0 }}
//           transition={{ duration: 0.8 }}
//         />
//       ))}
//       <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center">
//         <h1 className="text-3xl md:text-5xl font-bold font-['Playfair_Display'] drop-shadow-lg">
//           Delicious Moments, Delivered
//         </h1>
//         <p className="mt-2 text-sm md:text-lg italic">
//           Fresh. Fast. Right at your doorstep.
//         </p>
//       </div>
//       {/* Indicators */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//         {images.map((_, i) => (
//           <div
//             key={i}
//             className={`w-3 h-3 rounded-full transition ${
//               i === current ? "bg-white" : "bg-gray-400/70"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // -------------------------------------------
// // About Component
// // -------------------------------------------
// export default function About() {
//   const controls = useAnimation();
//   useEffect(() => {
//     const onScroll = () => {
//       const y = window.scrollY;
//       controls.start({ y: y * 0.1 });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [controls]);

//   // Specs data
//   const specs = [
//     {
//       icon: <Zap className="w-5 h-5 text-primary" />,
//       title: "Lightning Fast Delivery",
//       desc: "Your food arrives hot & fresh within minutes.",
//     },
//     {
//       icon: <ShieldCheck className="w-5 h-5 text-primary" />,
//       title: "Hygiene Guaranteed",
//       desc: "Every kitchen is verified and food quality checked.",
//     },
//     {
//       icon: <Bike className="w-5 h-5 text-primary" />,
//       title: "Live Order Tracking",
//       desc: "Know exactly where your order is in real-time.",
//     },
//     {
//       icon: <MapPin className="w-5 h-5 text-primary" />,
//       title: "Widest Coverage",
//       desc: "Serving across multiple cities and towns in India.",
//     },
//   ];

//   // Testimonials data
//   const testimonials = [
//     {
//       name: "Aarav S.",
//       feedback:
//         "Tiffino changed my lunch routine completely! Fresh food, fast delivery, and reliable service.",
//       rating: 5,
//     },
//     {
//       name: "Priya K.",
//       feedback:
//         "The hygiene and taste are unmatched. I love ordering dinner from here almost daily.",
//       rating: 5,
//     },
//     {
//       name: "Rohan M.",
//       feedback:
//         "Super easy app to use. Live tracking makes it stress-free, and food quality is always top-notch.",
//       rating: 4,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white font-inter">
//       {/* Hero Carousel */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-8 md:py-12">
//         <HeroCarousel />
//       </section>

//       {/* Stats */}
//       <section className="px-4 md:px-10 lg:px-14 pb-4">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Hotels</div>
//             <Counter
//               to={500}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">partner kitchens</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Dishes</div>
//             <Counter
//               to={500}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">across cuisines</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Happy Users</div>
//             <Counter
//               to={1000}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">and counting</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Support</div>
//             <Counter
//               to={24}
//               suffix="/7"
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">always online</div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="px-4 md:px-10 lg:px-14 py-12 md:py-16 bg-gray-50">
//         <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-10 text-center">
//           Why Choose <span className="text-primary">Tiffino?</span>
//         </h2>
//         <div className="space-y-8 max-w-4xl mx-auto">
//           {specs.map((s, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//               viewport={{ once: true, amount: 0.3 }}
//               className="flex items-start gap-4 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
//             >
//               <div className="p-2 rounded-xl bg-primary/10">{s.icon}</div>
//               <div>
//                 <h4 className="font-semibold text-lg">{s.title}</h4>
//                 <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="px-4 md:px-10 lg:px-14 py-12 md:py-16">
//         <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-10 text-center">
//           What Our <span className="text-primary">Customers Say</span>
//         </h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           {testimonials.map((t, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: i * 0.2 }}
//               viewport={{ once: true }}
//               className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col"
//             >
//               <p className="text-gray-700 flex-1">{t.feedback}</p>
//               <div className="mt-4 flex items-center justify-between">
//                 <span className="font-semibold text-gray-800">{t.name}</span>
//                 <div className="flex text-yellow-500">
//                   {Array.from({ length: t.rating }).map((_, j) => (
//                     <Star key={j} className="w-4 h-4 fill-yellow-500" />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }













// imp one ....

// import { useEffect, useRef, useState } from "react";
// import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
// import {
//   Sparkles,
//   Zap,
//   ShieldCheck,
//   Bike,
//   MapPin,
//   Star,
//   Award,
//   Target,
//   Eye,
//   Heart,
//   Users,
//   TrendingUp,
//   Clock,
//   CheckCircle2,
//   Quote,
//   ArrowRight,
//   Flame,
//   ChefHat,
//    Utensils
// } from "lucide-react";
// import "@fontsource/playfair-display";
// import "@fontsource/inter";

// // -------------------------------------------
// // useInView Hook
// // -------------------------------------------
// function useInView(options = { threshold: 0.2 }) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       options
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [options]);
//   return { ref, inView };
// }

// // -------------------------------------------
// // Counter Animation
// // -------------------------------------------
// function Counter({ to = 100, suffix = "+", duration = 2.0, className = "" }) {
//   const { ref, inView } = useInView({ threshold: 0.5 });
//   const [val, setVal] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const step = Math.max(1, Math.floor(to / (60 * duration)));
//     const id = setInterval(() => {
//       start += step;
//       if (start >= to) {
//         setVal(to);
//         clearInterval(id);
//       } else {
//         setVal(start);
//       }
//     }, 1000 / 60);
//     return () => clearInterval(id);
//   }, [inView, to, duration]);

//   return (
//     <div ref={ref} className={className}>
//       {val}
//       {suffix}
//     </div>
//   );
// }

// // -------------------------------------------
// // Hero Carousel Component
// // -------------------------------------------
// function HeroCarousel() {
//   const images = [
//     "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1170&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?q=80&w=776&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=1170&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?q=80&w=1334&auto=format&fit=crop",
//   ];
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(id);
//   }, [images.length]);

//   return (
//     <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
//       {images.map((src, i) => (
//         <motion.div
//           key={i}
//           className="absolute inset-0"
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ 
//             opacity: i === current ? 1 : 0,
//             scale: i === current ? 1 : 1.1
//           }}
//           transition={{ duration: 1 }}
//         >
//           <img
//             src={src}
//             alt="hero slide"
//             className="w-full h-full object-cover"
//           />
//         </motion.div>
//       ))}
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
//       {/* Content */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           className="mb-4"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/90 backdrop-blur-sm rounded-full text-sm font-semibold">
//             <Sparkles className="w-4 h-4" />
//             Premium Food Delivery
//           </div>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.8 }}
//           className="text-4xl md:text-6xl lg:text-7xl font-bold font-['Playfair_Display'] drop-shadow-2xl mb-4"
//         >
//           Delicious Moments,
//           <br />
//           <span className="text-[#E23744]">Delivered</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.9, duration: 0.8 }}
//           className="text-lg md:text-xl text-gray-200 max-w-2xl"
//         >
//           Fresh. Fast. Right at your doorstep. Experience authentic Indian flavors.
//         </motion.p>

//         <motion.button
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="mt-8 px-8 py-4 bg-[#E23744] text-white font-bold rounded-full shadow-2xl hover:shadow-[#E23744]/50 transition-all flex items-center gap-2"
//         >
//           Order Now
//           <ArrowRight className="w-5 h-5" />
//         </motion.button>
//       </div>

//       {/* Indicators */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
//         {images.map((_, i) => (
//           <motion.button
//             key={i}
//             onClick={() => setCurrent(i)}
//             whileHover={{ scale: 1.2 }}
//             className={`h-2 rounded-full transition-all ${
//               i === current ? "bg-[#E23744] w-8" : "bg-white/50 w-2"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // -------------------------------------------
// // About Component
// // -------------------------------------------
// export default function About() {
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

//   // Stats data
//   const stats = [
//     { label: "Hotels", value: 500, suffix: "+", desc: "partner kitchens", icon: <ChefHat className="w-6 h-6" /> },
//     { label: "Dishes", value: 500, suffix: "+", desc: "across cuisines", icon: <Utensils className="w-6 h-6" /> },
//     { label: "Happy Users", value: 1000, suffix: "+", desc: "and counting", icon: <Users className="w-6 h-6" /> },
//     { label: "Support", value: 24, suffix: "/7", desc: "always online", icon: <Clock className="w-6 h-6" /> },
//   ];

//   // Specs data
//   const specs = [
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: "Lightning Fast Delivery",
//       desc: "Your food arrives hot & fresh within minutes with our optimized delivery system.",
//       color: "from-yellow-500 to-orange-500"
//     },
//     {
//       icon: <ShieldCheck className="w-6 h-6" />,
//       title: "Hygiene Guaranteed",
//       desc: "Every kitchen is verified and food quality checked with strict hygiene protocols.",
//       color: "from-green-500 to-emerald-500"
//     },
//     {
//       icon: <Bike className="w-6 h-6" />,
//       title: "Live Order Tracking",
//       desc: "Know exactly where your order is in real-time with GPS-enabled tracking.",
//       color: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <MapPin className="w-6 h-6" />,
//       title: "Widest Coverage",
//       desc: "Serving across multiple cities and towns in India with expanding network.",
//       color: "from-purple-500 to-pink-500"
//     },
//   ];

//   // Mission & Vision
//   const missionVision = [
//     {
//       icon: <Target className="w-8 h-8" />,
//       title: "Our Mission",
//       desc: "To deliver authentic, delicious meals that bring joy and convenience to every household across India.",
//       color: "bg-[#E23744]"
//     },
//     {
//       icon: <Eye className="w-8 h-8" />,
//       title: "Our Vision",
//       desc: "To become India's most trusted and loved food delivery platform, connecting people with great food.",
//       color: "bg-gradient-to-r from-[#E23744] to-pink-500"
//     },
//     {
//       icon: <Heart className="w-8 h-8" />,
//       title: "Our Values",
//       desc: "Quality, Trust, Speed, and Customer Satisfaction drive everything we do every single day.",
//       color: "bg-gradient-to-r from-pink-500 to-[#E23744]"
//     },
//   ];

//   // Timeline
//   const timeline = [
//     { year: "2020", title: "Founded", desc: "Tiffino was born with a dream to revolutionize food delivery" },
//     { year: "2021", title: "Expansion", desc: "Expanded to 5 major cities with 100+ partner restaurants" },
//     { year: "2023", title: "Growth", desc: "Reached 500+ restaurants and 1000+ happy customers" },
//     { year: "2025", title: "Innovation", desc: "Launched AI-powered delivery and premium subscriptions" },
//   ];

//   // Team
//   const team = [
//     { name: "Nikhileshwar Kshirsagar", role: "Founder & CEO", image: "https://media.licdn.com/dms/image/v2/D5603AQEzL9cqlUoMUQ/profile-displayphoto-crop_800_800/B56ZhfN4dIHQAQ-/0/1753944132456?e=1765411200&v=beta&t=wS4Co8iK6yL2V1bU4ktL5KHSGzfSXGeJJGEiI-HwtvY" },
//     { name: "Ketan Shevatkar", role: "Chief Operating Officer", image: "https://media.licdn.com/dms/image/v2/D5603AQFICdT5L2YJUQ/profile-displayphoto-shrink_800_800/B56ZPUSb2lGsAc-/0/1734433423775?e=1765411200&v=beta&t=nxN841dtuvSbilBvce-ybc_KJtofSGqH9c058aI4ygs" },
//     { name: "Rajesh Patale", role: "Head of Technology", image: "https://media.licdn.com/dms/image/v2/D4D03AQEpea7y5szPig/profile-displayphoto-shrink_800_800/B4DZOrh2n6HYAc-/0/1733749599327?e=1765411200&v=beta&t=WzKSddIBwoMaCvH-cs-IIULrwGhsbTYhUR-Lvn97ML4" },
//     { name: "Sagar Katekhaye", role: "Marketing Director", image: "https://media.licdn.com/dms/image/v2/D4D03AQHswZaoyj8VZw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728452586286?e=1765411200&v=beta&t=wN08E-icmRk6DtMZCjO0ct1ukZJvvoqEiCZMKHVA25o" },
//   ];

//   // Testimonials
//   const testimonials = [
//     {
//       name: "Aarav S.",
//       role: "Regular Customer",
//       feedback: "Tiffino changed my lunch routine completely! Fresh food, fast delivery, and reliable service every single time.",
//       rating: 5,
//       image: "https://i.pravatar.cc/150?img=1"
//     },
//     {
//       name: "Priya K.",
//       role: "Food Enthusiast",
//       feedback: "The hygiene and taste are unmatched. I love ordering dinner from here almost daily. Highly recommended!",
//       rating: 5,
//       image: "https://i.pravatar.cc/150?img=10"
//     },
//     {
//       name: "Rohan M.",
//       role: "Tech Professional",
//       feedback: "Super easy app to use. Live tracking makes it stress-free, and food quality is always top-notch.",
//       rating: 4,
//       image: "https://i.pravatar.cc/150?img=15"
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-red-50/20 to-white font-inter overflow-hidden">
//       {/* Decorative Background */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <motion.div
//           style={{ y }}
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.03, 0.05, 0.03],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute top-40 right-20 w-96 h-96 bg-[#E23744] rounded-full blur-3xl"
//         />
//         <motion.div
//           style={{ y }}
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.02, 0.04, 0.02],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1
//           }}
//           className="absolute bottom-60 left-20 w-80 h-80 bg-[#E23744] rounded-full blur-3xl"
//         />
//       </div>

//       {/* Hero Carousel */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-8 md:py-12">
//         <HeroCarousel />
//       </section>

//       {/* Stats Section */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-12">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//           {stats.map((stat, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-lg hover:shadow-xl transition-all group"
//             >
//               <div className="flex justify-between items-start mb-3">
//                 <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
//                 <div className="p-2 rounded-lg bg-[#E23744]/10 text-[#E23744] group-hover:scale-110 transition-transform">
//                   {stat.icon}
//                 </div>
//               </div>
//               <Counter
//                 to={stat.value}
//                 suffix={stat.suffix}
//                 className="text-4xl md:text-5xl font-extrabold font-['Playfair_Display'] text-[#E23744]"
//               />
//               <div className="text-sm text-gray-600 mt-2">{stat.desc}</div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-16 md:py-20">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full mb-4">
//             <Sparkles className="w-4 h-4 text-[#E23744]" />
//             <span className="text-sm font-semibold text-[#E23744]">Who We Are</span>
//           </div>
//           <h2 className="text-3xl md:text-5xl font-bold font-['Playfair_Display']">
//             Our <span className="text-[#E23744]">Purpose</span>
//           </h2>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//           {missionVision.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -10 }}
//               className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
//             >
//               <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
//                 {item.icon}
//               </div>
//               <h3 className="text-2xl font-bold mb-3 font-['Playfair_Display']">{item.title}</h3>
//               <p className="text-gray-600 leading-relaxed">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-16 md:py-20 bg-gradient-to-br from-gray-50 to-red-50/30">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full mb-4">
//             <Award className="w-4 h-4 text-[#E23744]" />
//             <span className="text-sm font-semibold text-[#E23744]">Why Choose Us</span>
//           </div>
//           <h2 className="text-3xl md:text-5xl font-bold font-['Playfair_Display']">
//             What Makes Us <span className="text-[#E23744]">Special</span>
//           </h2>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
//           {specs.map((s, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.15 }}
//               viewport={{ once: true }}
//               whileHover={{ scale: 1.03 }}
//               className="flex items-start gap-5 bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all group"
//             >
//               <div className={`p-4 rounded-xl bg-gradient-to-r ${s.color} text-white group-hover:scale-110 transition-transform shadow-lg`}>
//                 {s.icon}
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-bold text-xl mb-2 font-['Playfair_Display']">{s.title}</h4>
//                 <p className="text-gray-600 leading-relaxed">{s.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Timeline */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-16 md:py-20">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full mb-4">
//             <TrendingUp className="w-4 h-4 text-[#E23744]" />
//             <span className="text-sm font-semibold text-[#E23744]">Our Journey</span>
//           </div>
//           <h2 className="text-3xl md:text-5xl font-bold font-['Playfair_Display']">
//             The <span className="text-[#E23744]">Tiffino Story</span>
//           </h2>
//         </motion.div>

//         <div className="max-w-4xl mx-auto relative">
//           {/* Timeline Line */}
//           <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E23744] to-pink-300 hidden md:block" />

//           {timeline.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//               viewport={{ once: true }}
//               className={`flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
//             >
//               <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#E23744]/30 transition-all"
//                 >
//                   <div className="text-3xl font-bold text-[#E23744] mb-2 font-['Playfair_Display']">{item.year}</div>
//                   <h4 className="text-xl font-bold mb-2">{item.title}</h4>
//                   <p className="text-gray-600">{item.desc}</p>
//                 </motion.div>
//               </div>

//               <div className="hidden md:block relative">
//                 <motion.div
//                   whileHover={{ scale: 1.2, rotate: 360 }}
//                   transition={{ duration: 0.5 }}
//                   className="w-16 h-16 bg-[#E23744] rounded-full flex items-center justify-center text-white font-bold shadow-xl z-10 relative"
//                 >
//                   <CheckCircle2 className="w-8 h-8" />
//                 </motion.div>
//               </div>

//               <div className="flex-1" />
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-16 md:py-20 bg-gradient-to-br from-gray-50 to-red-50/30">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full mb-4">
//             <Users className="w-4 h-4 text-[#E23744]" />
//             <span className="text-sm font-semibold text-[#E23744]">Meet Our Team</span>
//           </div>
//           <h2 className="text-3xl md:text-5xl font-bold font-['Playfair_Display']">
//             The People Behind <span className="text-[#E23744]">Tiffino</span>
//           </h2>
//         </motion.div>

//         <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
//           {team.map((member, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -10 }}
//               className="text-center group"
//             >
//               <div className="relative mb-4">
//                 <motion.img
//                   whileHover={{ scale: 1.1 }}
//                   src={member.image}
//                   alt={member.name}
//                   className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-xl"
//                 />
//                 <div className="absolute inset-0 bg-[#E23744]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
//               </div>
//               <h4 className="font-bold text-lg mb-1">{member.name}</h4>
//               <p className="text-sm text-gray-600">{member.role}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-16 md:py-20">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E23744]/10 rounded-full mb-4">
//             <Quote className="w-4 h-4 text-[#E23744]" />
//             <span className="text-sm font-semibold text-[#E23744]">Testimonials</span>
//           </div>
//           <h2 className="text-3xl md:text-5xl font-bold font-['Playfair_Display']">
//             What Our <span className="text-[#E23744]">Customers Say</span>
//           </h2>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((t, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30, rotate: -5 }}
//               whileInView={{ opacity: 1, y: 0, rotate: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -10, rotate: 2 }}
//               className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative"
//             >
//               {/* Quote Icon */}
//               <div className="absolute top-4 right-4 text-6xl text-[#E23744]/10 font-serif">"</div>

//               {/* Profile */}
//               <div className="flex items-center gap-4 mb-6">
//                 <img
//                   src={t.image}
//                   alt={t.name}
//                   className="w-14 h-14 rounded-full object-cover border-2 border-[#E23744]"
//                 />
//                 <div>
//                   <h4 className="font-bold text-lg">{t.name}</h4>
//                   <p className="text-sm text-gray-500">{t.role}</p>
//                 </div>
//               </div>

//               {/* Feedback */}
//               <p className="text-gray-700 leading-relaxed mb-6 relative z-10">{t.feedback}</p>

//               {/* Rating */}
//               <div className="flex text-yellow-500">
//                 {Array.from({ length: 5 }).map((_, j) => (
//                   <Star
//                     key={j}
//                     className={`w-5 h-5 ${j < t.rating ? 'fill-yellow-500' : 'fill-gray-300'}`}
//                   />
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative px-4 md:px-10 lg:px-14 py-20">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="bg-gradient-to-r from-[#E23744] to-pink-600 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
//         >
//           {/* Decorative Elements */}
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.1, 0.2, 0.1],
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//             }}
//             className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
//           />
//           <motion.div
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.1, 0.15, 0.1],
//             }}
//             transition={{
//               duration: 5,
//               repeat: Infinity,
//               delay: 1
//             }}
//             className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"
//           />

//           <div className="relative z-10">
//             <motion.div
//               initial={{ scale: 0 }}
//               whileInView={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="inline-block mb-6"
//             >
//               <Flame className="w-16 h-16 mx-auto" />
//             </motion.div>

//             <h2 className="text-3xl md:text-5xl font-bold font-['Playfair_Display'] mb-4">
//               Ready to Order?
//             </h2>
//             <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//               Join thousands of happy customers and experience the best food delivery service in India.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 bg-white text-[#E23744] font-bold rounded-full shadow-2xl hover:shadow-white/20 transition-all flex items-center justify-center gap-2"
//               >
//                 Order Now
//                 <ArrowRight className="w-5 h-5" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#E23744] transition-all"
//               >
//                 Learn More
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// }








// Instead of grid we use carasel

// import { useEffect, useRef, useState } from "react";
// import { motion, useAnimation, AnimatePresence } from "framer-motion";
// import {
//   Sparkles,
//   Zap,
//   ShieldCheck,
//   Bike,
//   MapPin,
//   Star,
// } from "lucide-react";
// import "@fontsource/playfair-display"; // premium heading font
// import "@fontsource/inter"; // body font

// // -------------------------------------------
// // useInView Hook
// // -------------------------------------------
// function useInView(options = { threshold: 0.2 }) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       options
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [options]);
//   return { ref, inView };
// }

// // -------------------------------------------
// // Counter Animation
// // -------------------------------------------
// function Counter({ to = 100, suffix = "+", duration = 2.0, className = "" }) {
//   const { ref, inView } = useInView({ threshold: 0.5 });
//   const [val, setVal] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const step = Math.max(1, Math.floor(to / (60 * duration)));
//     const id = setInterval(() => {
//       start += step;
//       if (start >= to) {
//         setVal(to);
//         clearInterval(id);
//       } else {
//         setVal(start);
//       }
//     }, 1000 / 60);
//     return () => clearInterval(id);
//   }, [inView, to, duration]);

//   return (
//     <div ref={ref} className={className}>
//       {val}
//       {suffix}
//     </div>
//   );
// }

// export default function About() {
//   const controls = useAnimation();
//   useEffect(() => {
//     const onScroll = () => {
//       const y = window.scrollY;
//       controls.start({ y: y * 0.1 });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [controls]);

//   // Specs data
//   const specs = [
//     {
//       icon: <Zap className="w-5 h-5 text-primary" />,
//       title: "Lightning Fast Delivery",
//       desc: "Your food arrives hot & fresh within minutes.",
//     },
//     {
//       icon: <ShieldCheck className="w-5 h-5 text-primary" />,
//       title: "Hygiene Guaranteed",
//       desc: "Every kitchen is verified and food quality checked.",
//     },
//     {
//       icon: <Bike className="w-5 h-5 text-primary" />,
//       title: "Live Order Tracking",
//       desc: "Know exactly where your order is in real-time.",
//     },
//     {
//       icon: <MapPin className="w-5 h-5 text-primary" />,
//       title: "Widest Coverage",
//       desc: "Serving across multiple cities and towns in India.",
//     },
//   ];

//   // Testimonials data
//   const testimonials = [
//     {
//       name: "Aarav S.",
//       feedback:
//         "Tiffino changed my lunch routine completely! Fresh food, fast delivery, and reliable service.",
//       rating: 5,
//     },
//     {
//       name: "Priya K.",
//       feedback:
//         "The hygiene and taste are unmatched. I love ordering dinner from here almost daily.",
//       rating: 5,
//     },
//     {
//       name: "Rohan M.",
//       feedback:
//         "Super easy app to use. Live tracking makes it stress-free, and food quality is always top-notch.",
//       rating: 4,
//     },
//   ];

//   // Carousel images
//   const images = [
//     "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
//     "https://images.unsplash.com/photo-1546069901-eacef0df6022?w=800",
//     "https://i.pinimg.com/736x/7c/0b/9b/7c0b9bc37e96e0a9d4a222177414e976.jpg",
//     "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
//     "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
//     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
//     "https://i.pinimg.com/1200x/80/bd/1a/80bd1aacc9f1bdb966461341f398b5d9.jpg",
//     "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
//   ];

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 2000); // 2 sec interval
//     return () => clearInterval(id);
//   }, [images.length]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white font-inter">
//       {/* Hero */}
//       <section className="relative overflow-hidden">
//         <motion.div
//           animate={controls}
//           className="pointer-events-none absolute inset-0 opacity-70"
//           style={{
//             background:
//               "radial-gradient(1200px 400px at 20% -10%, rgba(255,80,80,0.12), transparent 60%), radial-gradient(1200px 400px at 80% 10%, rgba(255,120,60,0.12), transparent 60%)",
//           }}
//         />
//         <div className="relative flex px-4 md:px-10 lg:px-14 py-16 md:py-24">
//           <div className="max-w-5xl">
//             <p className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
//               <Sparkles className="w-4 h-4" />
//               Crafting delightful food experiences
//             </p>
//             <br />
//             <div className="relative inline-block mt-6">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
//                 Think it. <span className="text-primary">About it.</span> Love
//                 it.
//               </h1>
//               <span className="block h-[3px] w-24 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full mt-3" />
//             </div>
//             <p className="mt-3 text-lg md:text-xl italic text-gray-800 font-['Playfair_Display']">
//               “Savor the Royal Taste of India – Every Meal, A Story”
//             </p>
//             <p className="mt-4 text-gray-600 max-w-2xl">
//               We’re on a mission to deliver fresh, hygienic and tasty meals from
//               trusted kitchens, backed by lightning-fast logistics and
//               delightful service.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="px-4 md:px-10 lg:px-14 pb-4">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Hotels</div>
//             <Counter
//               to={500}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">partner kitchens</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Dishes</div>
//             <Counter
//               to={500}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">across cuisines</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Happy Users</div>
//             <Counter
//               to={1000}
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">and counting</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-gray-500 text-sm">Support</div>
//             <Counter
//               to={24}
//               suffix="/7"
//               className="text-3xl md:text-4xl font-extrabold mt-1 font-['Playfair_Display'] bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
//             />
//             <div className="text-sm text-gray-600 mt-1">always online</div>
//           </div>
//         </div>
//       </section>

//       {/* Carousel Section */}
//       <section className="px-4 md:px-10 lg:px-14 py-10 md:py-14">
//         <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-6">
//           A Glimpse of Our World
//         </h2>
//         <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg">
//           <AnimatePresence mode="wait">
//             <motion.img
//               key={index}
//               src={images[index]}
//               initial={{ opacity: 0, scale: 1.05 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.8 }}
//               className="w-full h-60 md:h-80 lg:h-96 object-cover"
//               alt="carousel"
//             />
//           </AnimatePresence>
//         </div>
//         {/* Dots */}
//         <div className="flex justify-center mt-4 gap-2">
//           {images.map((_, i) => (
//             <div
//               key={i}
//               className={`h-2 w-2 rounded-full ${
//                 i === index ? "bg-primary" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Specifications Bar */}
//       <section className="px-4 md:px-10 lg:px-14 py-12 md:py-16 bg-gray-50">
//         <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-10 text-center">
//           Why Choose <span className="text-primary">Tiffino?</span>
//         </h2>
//         <div className="space-y-8 max-w-4xl mx-auto">
//           {specs.map((s, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//               viewport={{ once: true, amount: 0.3 }}
//               className="flex items-start gap-4 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
//             >
//               <div className="p-2 rounded-xl bg-primary/10">{s.icon}</div>
//               <div>
//                 <h4 className="font-semibold text-lg">{s.title}</h4>
//                 <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="px-4 md:px-10 lg:px-14 py-12 md:py-16">
//         <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-10 text-center">
//           What Our <span className="text-primary">Customers Say</span>
//         </h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           {testimonials.map((t, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: i * 0.2 }}
//               viewport={{ once: true }}
//               className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col"
//             >
//               <p className="text-gray-700 flex-1">{t.feedback}</p>
//               <div className="mt-4 flex items-center justify-between">
//                 <span className="font-semibold text-gray-800">{t.name}</span>
//                 <div className="flex text-yellow-500">
//                   {Array.from({ length: t.rating }).map((_, j) => (
//                     <Star key={j} className="w-4 h-4 fill-yellow-500" />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }





// import React, { useRef } from "react";
// import { motion, useScroll, useTransform, useInView } from "framer-motion";
// import {
//   Sparkles,
//   Zap,
//   ShieldCheck,
//   Bike,
//   MapPin,
//   Target,
//   Eye,
//   Heart,
//   Users,
//   TrendingUp,
//   Clock,
//   CheckCircle2,
//   Quote,
//   ArrowRight,
//   ChefHat,
//   Utensils,
//   Linkedin,
//   Twitter
// } from "lucide-react";
// import "@fontsource/playfair-display";
// import "@fontsource/inter";

// /* =====================================================================
//    🎨 ANIMATION HELPERS
//    ===================================================================== */
// const FadeInUp = ({ children, delay = 0 }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true, margin: "-50px" }}
//     transition={{ duration: 0.6, delay, ease: "easeOut" }}
//   >
//     {children}
//   </motion.div>
// );

// const ScaleIn = ({ children, delay = 0 }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.8 }}
//     whileInView={{ opacity: 1, scale: 1 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.6, delay, type: "spring", bounce: 0.4 }}
//   >
//     {children}
//   </motion.div>
// );

// // Count Up Animation
// const Counter = ({ from = 0, to, suffix = "" }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });
  
//   // Using simple text/state approach for simplicity in React
//   // Ideally use a library like 'react-countup' for smoother numbers
//   return (
//     <span ref={ref} className="tabular-nums">
//       {isInView ? to : from}{suffix}
//     </span>
//   );
// };

// /* =====================================================================
//    🎡 HERO SECTION (PARALLAX)
//    ===================================================================== */
// function AboutHero() {
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 500], [0, 200]);
//   const opacity = useTransform(scrollY, [0, 300], [1, 0]);

//   return (
//     <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
//       <motion.div style={{ y }} className="absolute inset-0 z-0">
//         <img
//           src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop"
//           alt="About Background"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white" />
//       </motion.div>

//       <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-4xl">
//         <motion.div 
//           initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
//           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-6"
//         >
//           <Sparkles className="w-4 h-4 text-yellow-400" /> Since 2020
//         </motion.div>
        
//         <motion.h1 
//           initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
//           className="text-5xl md:text-7xl font-extrabold font-['Playfair_Display'] text-white leading-tight mb-6 drop-shadow-lg"
//         >
//           More Than Just <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Food Delivery.</span>
//         </motion.h1>

//         <motion.p 
//           initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
//           className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light"
//         >
//           We are bridging the gap between hungry stomachs and wholesome, hygienic, home-style meals.
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// }

// /* =====================================================================
//    🚀 MAIN PAGE COMPONENT
//    ===================================================================== */
// export default function About() {
//   const stats = [
//     { label: "Partner Kitchens", value: 500, suffix: "+", icon: <ChefHat className="w-6 h-6"/> },
//     { label: "Happy Customers", value: "50k", suffix: "+", icon: <Users className="w-6 h-6"/> },
//     { label: "Cities Covered", value: 25, suffix: "+", icon: <MapPin className="w-6 h-6"/> },
//     { label: "Orders Delivered", value: "1M", suffix: "+", icon: <Bike className="w-6 h-6"/> },
//   ];

//   const team = [
//     { name: "Nikhileshwar Kshirsagar", role: "Founder & CEO", img: "https://media.licdn.com/dms/image/v2/D5603AQEzL9cqlUoMUQ/profile-displayphoto-crop_800_800/B56ZhfN4dIHQAQ-/0/1753944132456?e=1765411200&v=beta&t=wS4Co8iK6yL2V1bU4ktL5KHSGzfSXGeJJGEiI-HwtvY" },
//     { name: "Ketan Shevatkar", role: "Chief Operating Officer", img: "https://media.licdn.com/dms/image/v2/D5603AQFICdT5L2YJUQ/profile-displayphoto-shrink_800_800/B56ZPUSb2lGsAc-/0/1734433423775?e=1765411200&v=beta&t=nxN841dtuvSbilBvce-ybc_KJtofSGqH9c058aI4ygs" },
//     { name: "Rajesh Patale", role: "Head of Technology", img: "https://media.licdn.com/dms/image/v2/D4D03AQEpea7y5szPig/profile-displayphoto-shrink_800_800/B4DZOrh2n6HYAc-/0/1733749599327?e=1765411200&v=beta&t=WzKSddIBwoMaCvH-cs-IIULrwGhsbTYhUR-Lvn97ML4" },
//     { name: "Sagar Katekhaye", role: "Marketing Director", img: "https://media.licdn.com/dms/image/v2/D4D03AQHswZaoyj8VZw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728452586286?e=1765411200&v=beta&t=wN08E-icmRk6DtMZCjO0ct1ukZJvvoqEiCZMKHVA25o" },
//   ];

//   const timeline = [
//     { year: "2020", title: "The Beginning", desc: "Started from a small garage with just 5 home chefs." },
//     { year: "2021", title: "Going Digital", desc: "Launched our first mobile app. Hit 1000 orders/day." },
//     { year: "2023", title: "Expansion", desc: "Expanded to 5 major cities. Introduced Subscription plans." },
//     { year: "2025", title: "Future Ready", desc: "AI-driven recommendations and 10-minute delivery pilots." },
//   ];

//   return (
//     <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-900">
      
//       <AboutHero />

//       {/* --- FLOATING STATS STRIP --- */}
//       <div className="relative -mt-20 z-20 max-w-6xl mx-auto px-4">
//         <motion.div 
//           initial={{ y: 40, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           viewport={{ once: true }}
//           className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100"
//         >
//           {stats.map((s, i) => (
//             <div key={i} className="flex flex-col items-center text-center px-2">
//               <div className="mb-3 p-3 bg-red-50 text-red-600 rounded-full">{s.icon}</div>
//               <h3 className="text-3xl font-extrabold text-gray-900 font-['Playfair_Display']">
//                 <Counter to={s.value} suffix={s.suffix} />
//               </h3>
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{s.label}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>

//       {/* --- MISSION & VISION (Split Layout) --- */}
//       <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
//         <div className="grid md:grid-cols-2 gap-16 items-center">
//           <FadeInUp>
//             <span className="text-red-600 font-bold text-sm uppercase tracking-widest">Our Philosophy</span>
//             <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mt-3 mb-6 text-gray-900">
//               Fueling Dreams with <span className="text-red-600 italic">Good Food</span>
//             </h2>
//             <p className="text-gray-600 text-lg leading-relaxed mb-6">
//               In a fast-paced world, eating healthy often takes a backseat. Tiffino was born out of a simple need – to provide home-like meals to students and professionals away from home.
//             </p>
//             <div className="space-y-4">
//               {[
//                 { title: "Hygiene First", desc: "FSSAI certified kitchens only." },
//                 { title: "Zero Waste", desc: "Smart inventory to minimize food waste." },
//                 { title: "Community", desc: "Empowering local home chefs." }
//               ].map((item, i) => (
//                 <div key={i} className="flex gap-4">
//                   <div className="mt-1"><CheckCircle2 className="text-green-500 w-5 h-5"/></div>
//                   <div>
//                     <h4 className="font-bold text-gray-900">{item.title}</h4>
//                     <p className="text-sm text-gray-500">{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </FadeInUp>
          
//           <ScaleIn delay={0.2}>
//             <div className="relative">
//               <img 
//                 src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop" 
//                 className="rounded-[2rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500" 
//                 alt="Chefs cooking"
//               />
//               <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-100 hidden md:block">
//                 <Quote className="text-red-500 mb-2 w-8 h-8"/>
//                 <p className="text-gray-800 font-medium italic">"Food is not just fuel, it's a memory of home."</p>
//                 <p className="text-gray-400 text-xs mt-2 font-bold uppercase">- Founder</p>
//               </div>
//             </div>
//           </ScaleIn>
//         </div>
//       </section>

//       {/* --- TIMELINE (The Journey) --- */}
//       <section className="py-20 bg-gray-50 relative overflow-hidden">
//         {/* Background Blobs */}
//         <div className="absolute top-0 left-0 w-96 h-96 bg-red-100/50 rounded-full blur-[120px] pointer-events-none"/>
        
//         <div className="max-w-5xl mx-auto px-4 md:px-10">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold font-['Playfair_Display'] text-gray-900">Our Journey</h2>
//             <p className="text-gray-500 mt-2">From a small idea to a nationwide movement.</p>
//           </div>

//           <div className="relative">
//             {/* Center Line */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block" />

//             {timeline.map((item, i) => (
//               <div key={i} className={`flex items-center justify-between mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
//                 <div className="w-full md:w-5/12">
//                   <FadeInUp delay={i * 0.1}>
//                     <div className={`bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:border-red-200 transition-colors ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
//                       <span className="text-5xl font-bold text-black absolute -mt-10 -ml-4 z-0 font-['Playfair_Display']">{item.year}</span>
//                       <h3 className="text-xl font-bold text-gray-900 relative z-10">{item.title}</h3>
//                       <p className="text-gray-600 mt-2 text-sm relative z-10">{item.desc}</p>
//                     </div>
//                   </FadeInUp>
//                 </div>
                
//                 {/* Dot */}
//                 <div className="w-2/12 flex justify-center relative hidden md:flex">
//                   <div className="w-4 h-4 bg-red-600 rounded-full ring-4 ring-red-100" />
//                 </div>
                
//                 <div className="w-full md:w-5/12" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- TEAM SECTION (Cards) --- */}
//       <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold font-['Playfair_Display'] text-gray-900">Meet the <span className="text-red-600">Visionaries</span></h2>
//           <p className="text-gray-500 mt-2">The passionate minds driving Tiffino forward.</p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {team.map((member, i) => (
//             <FadeInUp key={i} delay={i * 0.1}>
//               <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100">
//                 <div className="h-64 overflow-hidden bg-gray-200">
//                   <img 
//                     src={member.img} 
//                     alt={member.name} 
//                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
//                   />
//                 </div>
//                 <div className="p-6 text-center">
//                   <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
//                   <p className="text-sm text-red-500 font-medium uppercase tracking-wider">{member.role}</p>
                  
//                   {/* Social Reveal */}
//                   <div className="flex justify-center gap-3 mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
//                     <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-500 hover:text-white transition"><Linkedin size={16}/></a>
//                     <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-sky-400 hover:text-white transition"><Twitter size={16}/></a>
//                   </div>
//                 </div>
//               </div>
//             </FadeInUp>
//           ))}
//         </div>
//       </section>

//       {/* --- CTA SECTION --- */}
//       <section className="py-20 px-4">
//         <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
//           <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"/>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"/>
          
//           <div className="relative z-10">
//             <h2 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-6">
//               Ready to taste the difference?
//             </h2>
//             <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
//               Join thousands of happy customers who have switched to a healthier lifestyle with Tiffino.
//             </p>
//             <button className="px-10 py-4 bg-red-600 text-white rounded-full font-bold text-lg shadow-lg shadow-red-900/50 hover:bg-red-700 hover:scale-105 transition-all flex items-center gap-3 mx-auto">
//               Explore Our Menu <ArrowRight size={20}/>
//             </button>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }













// import React, { useRef } from "react";
// import { motion, useScroll, useTransform, useInView } from "framer-motion";
// import {
//   Sparkles,
//   Zap,
//   ShieldCheck,
//   Bike,
//   MapPin,
//   Target,
//   Eye,
//   Heart,
//   Users,
//   TrendingUp,
//   Clock,
//   CheckCircle2,
//   Quote,
//   ArrowRight,
//   ChefHat,
//   Utensils,
//   Linkedin,
//   Twitter,
//   Thermometer,
//   PackageCheck
// } from "lucide-react";
// import "@fontsource/playfair-display";
// import "@fontsource/inter";

// /* =====================================================================
//    🎨 ANIMATION HELPERS
//    ===================================================================== */
// const FadeInUp = ({ children, delay = 0 }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true, margin: "-50px" }}
//     transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
//   >
//     {children}
//   </motion.div>
// );

// const Counter = ({ from = 0, to, suffix = "" }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });
//   return (
//     <span ref={ref} className="tabular-nums">
//       {isInView ? to : from}{suffix}
//     </span>
//   );
// };

// /* =====================================================================
//    🎡 HERO SECTION (Cloud Kitchen Theme)
//    ===================================================================== */
// function AboutHero() {
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 500], [0, 200]);
  
//   return (
//     <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-gray-900">
//       {/* Dynamic Background */}
//       <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-60">
//         <img
//           // Professional Chef Plating - High Quality Cloud Kitchen Vibe
//           src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1600&auto=format&fit=crop"
//           alt="Cloud Kitchen Chef"
//           className="w-full h-full object-cover"
//         />
//       </motion.div>
      
//       {/* Overlay Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />

//       {/* Hero Content */}
//       <div className="relative z-10 text-center px-4 max-w-5xl">
//         <motion.div 
//           initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
//           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6"
//         >
//           <Sparkles className="w-3 h-3 text-yellow-400" /> Redefining Food Delivery
//         </motion.div>
        
//         <motion.h1 
//           initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
//           className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-['Playfair_Display'] text-white leading-tight mb-6"
//         >
//           Future of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Good Food.</span>
//         </motion.h1>

//         <motion.p 
//           initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
//           className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
//         >
//           We are a <span className="text-white font-medium">Cloud Kitchen</span> network merging culinary art with technology to deliver hygienic, restaurant-quality meals to your doorstep.
//         </motion.p>
//       </div>
//     </div>
//   );
// }

// /* =====================================================================
//    🚀 MAIN COMPONENT
//    ===================================================================== */
// export default function About() {
//   const stats = [
//     { label: "Cloud Kitchens", value: 12, suffix: "+", icon: <ChefHat className="w-6 h-6"/> },
//     { label: "Daily Meals", value: "15k", suffix: "+", icon: <Utensils className="w-6 h-6"/> },
//     { label: "Cities Served", value: 8, suffix: "", icon: <MapPin className="w-6 h-6"/> },
//     { label: "Delivery Time", value: "30", suffix: "min", icon: <Clock className="w-6 h-6"/> },
//   ];

//   const hygieneSteps = [
//     { title: "Temp Checks", desc: "Staff temperature tracked daily.", icon: <Thermometer/> },
//     { title: "Sanitization", desc: "Kitchens sanitized every 4 hours.", icon: <Sparkles/> },
//     { title: "Fresh Sourcing", desc: "Ingredients procured daily.", icon: <PackageCheck/> },
//     { title: "Contactless", desc: "Safe packaging & delivery.", icon: <ShieldCheck/> },
//   ];

//   const team = [
//     { name: "Nikhileshwar Kshirsagar", role: "Founder & CEO", img: "https://media.licdn.com/dms/image/v2/D5603AQEzL9cqlUoMUQ/profile-displayphoto-crop_800_800/B56ZhfN4dIHQAQ-/0/1753944132456?e=1765411200&v=beta&t=wS4Co8iK6yL2V1bU4ktL5KHSGzfSXGeJJGEiI-HwtvY" },
//     { name: "Ketan Shevatkar", role: "COO", img: "https://media.licdn.com/dms/image/v2/D5603AQFICdT5L2YJUQ/profile-displayphoto-shrink_800_800/B56ZPUSb2lGsAc-/0/1734433423775?e=1765411200&v=beta&t=nxN841dtuvSbilBvce-ybc_KJtofSGqH9c058aI4ygs" },
//     { name: "Rajesh Patale", role: "Tech Lead", img: "https://media.licdn.com/dms/image/v2/D4D03AQEpea7y5szPig/profile-displayphoto-shrink_800_800/B4DZOrh2n6HYAc-/0/1733749599327?e=1765411200&v=beta&t=WzKSddIBwoMaCvH-cs-IIULrwGhsbTYhUR-Lvn97ML4" },
//     { name: "Sagar Katekhaye", role: "Marketing Head", img: "https://media.licdn.com/dms/image/v2/D4D03AQHswZaoyj8VZw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728452586286?e=1765411200&v=beta&t=wN08E-icmRk6DtMZCjO0ct1ukZJvvoqEiCZMKHVA25o" },
//   ];

//   return (
//     <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-900">
      
//       <AboutHero />

//       {/* --- FLOATING STATS STRIP --- */}
//       <div className="relative -mt-24 z-20 max-w-7xl mx-auto px-4">
//         <motion.div 
//           initial={{ y: 40, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           viewport={{ once: true }}
//           className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-gray-100"
//         >
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
//             {stats.map((s, i) => (
//               <div key={i} className="flex flex-col items-center text-center px-4">
//                 <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-2xl shadow-sm">{s.icon}</div>
//                 <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-['Playfair_Display']">
//                   <Counter to={s.value} suffix={s.suffix} />
//                 </h3>
//                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">{s.label}</p>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* --- HYGIENE & TECH SECTION --- */}
//       <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
//         <div className="grid md:grid-cols-2 gap-16 items-center">
          
//           {/* Image Grid */}
//           <div className="grid grid-cols-2 gap-4">
//              <motion.img 
//                 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//                 src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop" // Pasta/Prep
//                 className="rounded-3xl shadow-lg mt-8"
//              />
//              <motion.img 
//                 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//                 src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop" // Chef Plating (Dark/Premium)
//                 className="rounded-3xl shadow-lg"
//              />
//           </div>

//           <FadeInUp>
//             <span className="text-red-600 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
//                <ShieldCheck size={18}/> Hygiene First
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mt-4 mb-6 text-gray-900">
//               Not just a Kitchen,<br/> It's a <span className="text-red-600 italic">Science Lab.</span>
//             </h2>
//             <p className="text-gray-600 text-lg leading-relaxed mb-8">
//               We operate centralized <b>Cloud Kitchens</b> where technology meets tradition. No dining halls, just pure focus on food quality, packaging, and hygiene.
//             </p>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {hygieneSteps.map((item, i) => (
//                 <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-100 transition-colors">
//                   <div className="mt-1 text-red-500">{item.icon}</div>
//                   <div>
//                     <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
//                     <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </FadeInUp>
//         </div>
//       </section>

//       {/* --- STORY & VISION --- */}
//       <section className="py-20 bg-black text-white relative overflow-hidden">
//          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/30 rounded-full blur-[150px] pointer-events-none"/>
         
//          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
//             <Quote className="text-red-500 w-12 h-12 mx-auto mb-6 opacity-80"/>
//             <h2 className="text-3xl md:text-5xl font-bold font-['Playfair_Display'] leading-snug mb-8">
//                "We realized that people don't just want food delivery. They want the <span className="text-red-500">assurance</span> that their meal was cooked in a clean, professional environment."
//             </h2>
//             <div className="flex items-center justify-center gap-4">
//                <img src={team[0].img} className="w-12 h-12 rounded-full border-2 border-red-500" alt="Founder"/>
//                <div className="text-left">
//                   <p className="font-bold text-lg">Nikhileshwar Kshirsagar</p>
//                   <p className="text-sm text-gray-400 uppercase tracking-widest">Founder, Tiffino</p>
//                </div>
//             </div>
//          </div>
//       </section>

//       {/* --- LEADERSHIP TEAM --- */}
//       <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <span className="text-red-600 font-bold text-xs uppercase tracking-widest">The Brains</span>
//           <h2 className="text-4xl font-bold font-['Playfair_Display'] text-gray-900 mt-2">Leadership Team</h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {team.map((member, i) => (
//             <FadeInUp key={i} delay={i * 0.1}>
//               <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100">
//                 <div className="h-72 overflow-hidden bg-gray-100 relative">
//                   <img 
//                     src={member.img} 
//                     alt={member.name} 
//                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                  
//                   <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
//                      <button className="bg-white text-black p-2 rounded-full hover:bg-red-600 hover:text-white transition"><Linkedin size={18}/></button>
//                      <button className="bg-white text-black p-2 rounded-full hover:bg-blue-400 hover:text-white transition"><Twitter size={18}/></button>
//                   </div>
//                 </div>
//                 <div className="p-6 text-center">
//                   <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
//                   <p className="text-xs text-red-500 font-bold uppercase tracking-wider mt-1">{member.role}</p>
//                 </div>
//               </div>
//             </FadeInUp>
//           ))}
//         </div>
//       </section>

//       {/* --- CTA SECTION (Food Focus) --- */}
//       <section className="py-20 px-4">
//         <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden relative shadow-2xl h-[400px] flex items-center justify-center text-center">
//            <img 
//               src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop" 
//               className="absolute inset-0 w-full h-full object-cover"
//               alt="Food Spread"
//            />
//            <div className="absolute inset-0 bg-black/60"/>
           
//            <div className="relative z-10 px-4">
//               <h2 className="text-4xl md:text-6xl font-bold text-white font-['Playfair_Display'] mb-6">
//                  Hungry yet?
//               </h2>
//               <p className="text-gray-200 text-lg mb-8 max-w-xl mx-auto">
//                  Experience the magic of cloud kitchen dining. Freshly prepared, hygienically packed, and delivered fast.
//               </p>
//               <button className="px-10 py-4 bg-red-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all flex items-center gap-3 mx-auto">
//                  Order Your Meal <ArrowRight size={20}/>
//               </button>
//            </div>
//         </div>
//       </section>

//     </div>
//   );
// }








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