import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const COUPLE_PHOTO = "https://cdn.poehali.dev/projects/5373c500-55d4-493a-9aef-b36641f8d934/bucket/d77f210b-7202-4398-98a4-b156629a4f0a.jpg";
const VENUE_PHOTO = "https://cdn.poehali.dev/projects/5373c500-55d4-493a-9aef-b36641f8d934/files/937715c3-3c5f-4182-bc4a-f456633c89fe.jpg";
const STORY_PHOTO = "https://cdn.poehali.dev/projects/5373c500-55d4-493a-9aef-b36641f8d934/files/62d131ba-b1b6-4626-af1c-41deeafa49ed.jpg";

const petals = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 8.5) % 100}%`,
  delay: `${(i * 0.7) % 8}s`,
  size: `${14 + (i % 3) * 4}px`,
  duration: `${7 + (i % 4) * 2}s`,
}));

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

const schedule = [
  { time: "11:00", icon: "Heart", title: "Торжественная регистрация брака", desc: "ЗАГС Красносельского района, ул. Доблести, д. 36", color: "#e8c4d4" },
  { time: "11:30", icon: "Camera", title: "Фотосессия", desc: "Фотопрогулка возле ЗАГСа", color: "#f0d5c8" },
  { time: "14:00", icon: "Car", title: "Поездка в Петергоф", desc: "Прогулка в Нижнем парке среди фонтанов", color: "#d4e0c4" },
  { time: "17:30", icon: "UtensilsCrossed", title: "Торжественный ужин", desc: "Праздничный банкет в честь молодожёнов", color: "#c4d4e8" },
];


const galleryImages = [
  { src: COUPLE_PHOTO, caption: "Наш день" },
  { src: VENUE_PHOTO, caption: "Место праздника" },
  { src: STORY_PHOTO, caption: "История любви" },
];

export default function Index() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const weddingDate = new Date("2026-08-01T11:00:00");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      if (diff <= 0) { setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen font-montserrat" style={{ background: "#fdf8f4", color: "#3a2a2a" }}>
      {/* Falling petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute opacity-0"
            style={{
              left: p.left,
              top: "-20px",
              fontSize: p.size,
              animationName: "petalFall",
              animationDuration: p.duration,
              animationDelay: p.delay,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Фото на весь экран */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${COUPLE_PHOTO})`, filter: "brightness(0.5) saturate(0.85)" }}
        />
        {/* Градиент поверх */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,8,14,0.3) 0%, rgba(20,8,14,0.15) 40%, rgba(20,8,14,0.65) 100%)" }} />

        {/* Декор углы */}
        <div className="absolute top-5 left-5 text-3xl opacity-50">🌸</div>
        <div className="absolute top-5 right-5 text-3xl opacity-50">🌸</div>
        <div className="absolute bottom-20 left-5 text-2xl opacity-40">🌿</div>
        <div className="absolute bottom-20 right-5 text-2xl opacity-40">🌿</div>

        {/* Контент */}
        <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center">

          {/* Подпись сверху */}
          <p
            className="font-caveat text-xl tracking-widest mb-8 opacity-0"
            style={{ color: "#f9d4e2", animationName: "fadeIn", animationDuration: "1.2s", animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            приглашаем вас на нашу свадьбу
          </p>

          {/* Имена */}
          <div
            className="flex items-center justify-center gap-6 md:gap-10 opacity-0"
            style={{ animationName: "fadeUp", animationDuration: "1.2s", animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            {/* Жених */}
            <div className="text-center">
              <p className="font-caveat text-base md:text-xl mb-1" style={{ color: "rgba(249,212,226,0.8)" }}>жених</p>
              <h2
                className="font-cormorant font-light"
                style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", color: "#fff8f5", textShadow: "0 2px 30px rgba(0,0,0,0.6)", lineHeight: 1 }}
              >
                Руслан
              </h2>
            </div>

            {/* Разделитель */}
            <div className="flex flex-col items-center gap-1 pb-2">
              <div className="h-12 md:h-16 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(249,212,226,0.6), transparent)" }} />
              <span className="font-cormorant text-2xl md:text-3xl" style={{ color: "rgba(249,212,226,0.7)" }}>&</span>
              <div className="h-12 md:h-16 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(249,212,226,0.6), transparent)" }} />
            </div>

            {/* Невеста */}
            <div className="text-center">
              <p className="font-caveat text-base md:text-xl mb-1" style={{ color: "rgba(249,212,226,0.8)" }}>невеста</p>
              <h2
                className="font-cormorant font-light"
                style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", color: "#fff8f5", textShadow: "0 2px 30px rgba(0,0,0,0.6)", lineHeight: 1 }}
              >
                Анастасия
              </h2>
            </div>
          </div>

          {/* Дата */}
          <div
            className="mt-10 opacity-0"
            style={{ animationName: "fadeIn", animationDuration: "1s", animationDelay: "1.1s", animationFillMode: "forwards" }}
          >
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px w-14 md:w-20" style={{ background: "rgba(249,212,226,0.5)" }} />
              <span className="font-cormorant text-xl md:text-2xl italic font-light" style={{ color: "#f9d4e2" }}>1 августа 2026</span>
              <div className="h-px w-14 md:w-20" style={{ background: "rgba(249,212,226,0.5)" }} />
            </div>
            <p className="text-xs md:text-sm font-light tracking-widest mt-1" style={{ color: "rgba(255,240,235,0.55)" }}>
              САНКТ-ПЕТЕРБУРГ
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-8 flex flex-col items-center gap-2 opacity-0"
          style={{ animationName: "fadeIn", animationDuration: "1s", animationDelay: "1.8s", animationFillMode: "forwards" }}
        >
          <span className="text-xs tracking-widest font-light" style={{ color: "rgba(255,240,235,0.4)" }}>ЛИСТАЙТЕ ВНИЗ</span>
          <Icon name="ChevronDown" size={20} className="animate-bounce" style={{ color: "rgba(255,240,235,0.4)" } as React.CSSProperties} />
        </div>
      </section>

      {/* COUNTDOWN */}
      <AnimatedSection>
        <section className="py-20 px-6" style={{ background: "#fff0f3" }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-caveat text-2xl mb-2" style={{ color: "#c97fa8" }}>до нашего дня осталось</p>
            <div className="flex justify-center gap-6 flex-wrap mt-6">
              {[
                { label: "дней", value: countdown.days },
                { label: "часов", value: countdown.hours },
                { label: "минут", value: countdown.minutes },
                { label: "секунд", value: countdown.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-cormorant font-medium shadow-md"
                    style={{ background: "#fff", border: "1px solid #f4c8d8", color: "#8a4060" }}
                  >
                    {String(value).padStart(2, "0")}
                  </div>
                  <span className="mt-2 text-xs tracking-widest font-light" style={{ color: "#b07090" }}>{label.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* WEDDING INFO */}
      <AnimatedSection>
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-caveat text-xl" style={{ color: "#c97fa8" }}>детали торжества</p>
              <h2 className="font-cormorant text-5xl font-light mt-2" style={{ color: "#5a2a3a" }}>Наш особенный день</h2>
              <div className="flex justify-center mt-4">
                <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, #e0a0c0, transparent)" }} />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "Calendar", title: "Дата", value: "1 августа 2026", sub: "суббота" },
                { icon: "Clock", title: "Время", value: "11:00", sub: "начало церемонии" },
                { icon: "MapPin", title: "Место", value: "ЗАГС Красносельского р-на", sub: "ул. Доблести, д. 36, СПб" },
              ].map(({ icon, title, value, sub }) => (
                <div
                  key={title}
                  className="rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
                  style={{ background: "#fff", border: "1px solid #f0d0e0" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "#fff0f5" }}
                  >
                    <Icon name={icon as "Calendar"} size={26} style={{ color: "#c97fa8" } as React.CSSProperties} />
                  </div>
                  <p className="text-xs tracking-widest font-light mb-2" style={{ color: "#b07090" }}>{title.toUpperCase()}</p>
                  <p className="font-cormorant text-2xl font-medium" style={{ color: "#5a2a3a" }}>{value}</p>
                  <p className="text-sm mt-1 font-light" style={{ color: "#9a7080" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* SCHEDULE */}
      <AnimatedSection>
        <section className="py-24 px-6" style={{ background: "#fdf4f8" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-caveat text-xl" style={{ color: "#c97fa8" }}>распорядок дня</p>
              <h2 className="font-cormorant text-5xl font-light mt-2" style={{ color: "#5a2a3a" }}>График торжества</h2>
              <div className="flex justify-center mt-4">
                <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, #e0a0c0, transparent)" }} />
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, #e0b0c8, transparent)" }} />
              <div className="flex flex-col gap-10">
                {schedule.map((item, i) => (
                  <div key={i} className="flex gap-8 items-start">
                    <div className="flex-shrink-0 text-right w-12">
                      <span className="font-cormorant text-xl font-light" style={{ color: "#9a6070" }}>{item.time}</span>
                    </div>
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center relative z-10"
                      style={{ background: item.color, border: "3px solid #fff", boxShadow: "0 0 0 1px #e8c0d0" }}
                    >
                      <Icon name={item.icon as "Heart"} size={14} style={{ color: "#6a3040" } as React.CSSProperties} />
                    </div>
                    <div
                      className="flex-1 rounded-2xl p-5 -mt-1"
                      style={{ background: "#fff", border: "1px solid #f0d8e4" }}
                    >
                      <p className="font-cormorant text-xl font-medium" style={{ color: "#5a2a3a" }}>{item.title}</p>
                      <p className="text-sm mt-1 font-light" style={{ color: "#9a7080" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* GALLERY */}
      <AnimatedSection>
        <section className="py-24 px-6" style={{ background: "#fdf4f8" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-caveat text-xl" style={{ color: "#c97fa8" }}>воспоминания</p>
              <h2 className="font-cormorant text-5xl font-light mt-2" style={{ color: "#5a2a3a" }}>Наша галерея</h2>
              <div className="flex justify-center mt-4">
                <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, #e0a0c0, transparent)" }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500"
                  style={{ aspectRatio: i === 1 ? "3/4" : "4/3" }}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                    style={{ background: "linear-gradient(to top, rgba(90,42,58,0.7) 0%, transparent 60%)" }}
                  >
                    <p className="font-cormorant text-white text-xl italic">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FOOTER CTA */}
      <AnimatedSection>
        <section
          className="py-24 px-6 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #5a2a3a 0%, #8a4060 50%, #5a2a3a 100%)" }}
        >
          <div className="absolute inset-0 flex flex-wrap gap-8 items-center justify-center pointer-events-none overflow-hidden" style={{ opacity: 0.08, fontSize: "5rem" }}>
            {["🌸", "🌿", "🌹", "💐", "🌸", "🌿", "🌹", "💐"].map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="font-caveat text-2xl mb-3" style={{ color: "#f9c8de" }}>с нетерпением ждём вас</p>
            <h2
              className="font-cormorant font-light leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff8f5" }}
            >
              Разделите с нами<br />этот волшебный день
            </h2>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-px w-16" style={{ background: "rgba(249,200,222,0.4)" }} />
              <span className="font-cormorant text-xl italic font-light" style={{ color: "#f9c8de" }}>1 августа 2026</span>
              <div className="h-px w-16" style={{ background: "rgba(249,200,222,0.4)" }} />
            </div>
            <button
              className="mt-10 px-10 py-4 rounded-full font-montserrat text-sm tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: "#fff8f5", color: "#8a4060" }}
            >
              ПОДТВЕРДИТЬ ПРИСУТСТВИЕ
            </button>
          </div>
        </section>
      </AnimatedSection>

      {/* FOOTER */}
      <footer className="py-8 text-center" style={{ background: "#3a1a28" }}>
        <p className="font-cormorant text-xl italic font-light" style={{ color: "rgba(249,200,222,0.7)" }}>
          Руслан & Анастасия 🌸 01.08.2026
        </p>
      </footer>
    </div>
  );
}