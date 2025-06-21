import { useState, useEffect, useRef } from 'react'
import { Heart, Sparkles, Star, Leaf } from 'lucide-react'
// import mintIllustration from './assets/mint-illustration.jpg'
import mintIllustration from './assets/cover.JPG'
import mintCursor from './assets/mint-cursor.png'
import mintMascot from './assets/mint-mascot.png';
import './App.css'


function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [sparklePositions, setSparklePositions] = useState([])
  const [showHello, setShowHello] = useState(false)
  const [night, setNight] = useState(false)
  const [mascotFly, setMascotFly] = useState(true)
  const [mascotFlyDone, setMascotFlyDone] = useState(false);
const [mascotWave, setMascotWave] = useState(false);
const [showHeart, setShowHeart] = useState(false);

useEffect(() => {
  // Kết thúc hiệu ứng bay vòng tròn sau 2.3s
  const t = setTimeout(() => setMascotFlyDone(true), 2300);
  return () => clearTimeout(t);
}, []);

useEffect(() => {
  if (!mascotFlyDone) return;
  const interval = setInterval(() => {
    setMascotWave(true);
    setShowHeart(true);
    setTimeout(() => setMascotWave(false), 1100);
    setTimeout(() => setShowHeart(false), 1400);
  }, 5000);
  return () => clearInterval(interval);
}, [mascotFlyDone]);
  const handleSayHello = () => {
    setShowHello(true)
    setTimeout(() => setShowHello(false), 2000)
  }

  useEffect(() => {
    setIsLoaded(true)
    
    // Generate random sparkle positions
    const positions = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }))
    setSparklePositions(positions)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setNight(mq.matches)
    const listener = (e) => setNight(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setMascotFly(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  // Generate random stars and leaves positions for night mode
  const nightStars = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }))
  const nightLeaves = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: 0.3 + Math.random() * 0.7,
    delay: Math.random() * 5
  }))

  return (
    <div
      className={`min-h-screen overflow-hidden relative ${
        night
          ? 'bg-gradient-to-br from-[#232746] via-[#1a1d2a] to-[#2a3556]'
          : 'bg-gradient-to-br from-mint-50 via-mint-100 to-emerald-100'
      }`}
      style={{ cursor: `url(${mintCursor}) 16 16, auto` }}
    >
      {night && (
        <>
          {nightStars.map((star) => (
            <div
              key={`night-star-${star.id}`}
              className="absolute text-yellow-300 animate-star-blink"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                animationDelay: `${star.delay}s`,
                fontSize: '1.25rem',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            >
              <Star />
            </div>
          ))}
          {nightLeaves.map((leaf) => (
            <div
              key={`night-leaf-${leaf.id}`}
              className="absolute text-mint-400 animate-night-leaf"
              style={{
                left: `${leaf.x}%`,
                top: `${leaf.y}%`,
                opacity: leaf.opacity,
                animationDelay: `${leaf.delay}s`,
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            >
              <Leaf className="w-6 h-6" />
            </div>
          ))}
        </>
      )}

      {/* Animated Background Sparkles */}
      {sparklePositions.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-twinkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`
          }}
        >
          <Sparkles className="w-4 h-4 text-mint-300 opacity-60" />
        </div>
      ))}

      {/* Floating Leaves */}
      <div className="absolute top-10 left-10 animate-float">
        <Leaf className="w-8 h-8 text-mint-400 opacity-70" />
      </div>
      <div className="absolute top-20 right-20 animate-float-delayed">
        <Leaf className="w-6 h-6 text-emerald-400 opacity-60" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float-slow">
        <Leaf className="w-7 h-7 text-mint-500 opacity-50" />
      </div>

      <button onClick={() => setNight(v => !v)} className="fixed top-6 right-8 z-50 bg-mint-900/70 text-mint-100 px-4 py-2 rounded-full shadow-md border border-mint-400 backdrop-blur-lg hover:bg-mint-800 transition-all">
        {night ? '☀️ Day' : '🌙 Night'}
      </button>

      {/* Main Content Container */}
      <div className={`flex items-center justify-center min-h-screen p-8 ${night ? 'text-mint-100' : ''}`}>
        <div className={`relative mx-auto shadow-xl rounded-3xl p-8 transition-all duration-500
          ${night
            ? 'bg-[#232746]/80 border border-[#334060]'
            : 'bg-white/70'
          }`}>
          <div className={`text-center transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Header with animated title */}
            <div className="mb-8">
              <h1 className={`text-6xl font-bold mb-4 animate-bounce-gentle ${night ? 'text-mint-200' : 'text-mint-800'}`}>
                Hi, I'm <span className={`animate-pulse ${night ? 'text-mint-300' : 'text-mint-600'}`}>Mint</span>
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Star className="w-5 h-5 text-yellow-400 animate-spin-slow" />
                <p className={`text-xl font-medium ${night ? 'text-mint-200' : 'text-mint-700'}`}>
                  Fresh • Cute • Delightful
                </p>
                <Star className="w-5 h-5 text-yellow-400 animate-spin-slow" />
              </div>
            </div>

            {/* Central Photo with decorative frame */}
            <div className="relative mb-8 group">
              <div className={`absolute -inset-4 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow ${
                night
                  ? 'bg-gradient-to-r from-[#263254] to-[#34537b]'
                  : 'bg-gradient-to-r from-mint-300 to-emerald-300'
              }`}></div>
              <div className="relative">
                <img 
                  src={mintIllustration} 
                  alt="Mint illustration" 
                  className="w-64 h-64 object-cover rounded-full border-8 border-white shadow-2xl mx-auto transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Floating hearts around the photo */}
                <Heart className="absolute -top-2 -right-2 w-8 h-8 text-pink-400 animate-bounce" />
                <Heart className="absolute -bottom-2 -left-2 w-6 h-6 text-pink-300 animate-bounce-delayed" />
                <Heart className="absolute top-1/2 -left-8 w-5 h-5 text-pink-200 animate-float" />
                <Heart className="absolute top-1/4 -right-8 w-7 h-7 text-pink-400 animate-float-delayed" />
              </div>
            </div>

            {/* Description */}
            <div className="max-w-md mx-auto mb-8">
              <p className={`text-lg leading-relaxed ${night ? 'text-mint-200' : 'text-mint-700'}`}>
              Our little princess! <strong>Mint</strong>, you are the most wonderful gift life has given us. We wish for you to always be joyful, happy, and strong—just like your star sign! ✨💚
                <span className="inline-block animate-bounce ml-1">🌿</span>
              </p>
            </div>
            <p className={`text-base mt-2 mb-4 flex items-center justify-center gap-2
              font-semibold px-4 py-2 rounded-full shadow animate-pulse-slow
              backdrop-blur-md
              ${night ? 'bg-[#2b385a] border-[#5eead4] text-mint-100' : 'bg-mint-100 border-mint-300 text-mint-500'}
              `}
            >
              <span className="animate-bounce text-lg">🌱</span>
              <span
                className="bg-gradient-to-r from-mint-600 to-emerald-500 text-transparent bg-clip-text drop-shadow"
                style={{ fontFamily: 'cursive', letterSpacing: '0.03em' }}
              >
                {`${new Date().getFullYear() - 2018} years old (since 2018)`}
              </span>
              <span className="animate-bounce text-lg">🌿</span>
            </p>
            {/* Interactive Elements */}
            <div className="flex justify-center gap-6">
              <button className={`group ${night
                ? 'bg-[#334060] text-mint-100 border-[#6ee7b7] hover:bg-[#2c3550]'
                : 'bg-mint-500 text-white border-mint-300 hover:bg-mint-600'
              } px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}>
                <span className="flex items-center gap-2" onClick={handleSayHello}>
                  Say Hello 
                  <Heart className="w-4 h-4 group-hover:animate-bounce" />
                </span>
              </button>
              {/* <button className={`group ${night
                ? 'bg-[#262b40] text-mint-200 border-[#5eead4] hover:bg-[#223554]'
                : 'bg-white text-mint-600 border-mint-300 hover:bg-mint-50'
              } px-8 py-3 rounded-full font-semibold border-2 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}>
                <span className="flex items-center gap-2">
                  Learn More 
                  <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                </span>
              </button> */}
            </div>

            {/* Footer tagline */}
            <div className="mt-12">
              <p className={`font-medium text-sm tracking-wide ${night ? 'text-mint-300' : 'text-mint-600'}`}>
                ✨ Stay Fresh, Stay Mint ✨
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
  className={`z-50 drop-shadow-lg cursor-pointer mascot-mint
    ${mascotFlyDone ? 'fixed bottom-6 right-6' : 'absolute mascot-flying'}
    ${mascotWave ? 'animate-mascot-wave' : ''}
  `}
  style={{
    width: 96,
    height: 96,
    left: mascotFlyDone ? undefined : '50%',
    top: mascotFlyDone ? undefined : '54%', // chỉnh top cho trùng với profile
    transform: mascotFlyDone ? undefined : 'translate(-50%, -50%)',
  }}
  title="Mint mascot says hi! 🌿"
  onClick={handleSayHello}
>
  <img
    src={mintMascot}
    alt="Mint Mascot"
    style={{ width: '100%', height: '100%', display: 'block' }}
    draggable={false}
  />
  {/* 👋 emoji waving */}
  {mascotWave && (
    <span
      role="img"
      aria-label="waving hand"
      className="mascot-hand"
      style={{
        position: 'absolute', top: '16%', right: '12%',
        fontSize: '1.5rem', transformOrigin: 'bottom center',
        pointerEvents: 'none', userSelect: 'none',
        animation: 'mascot-hand-wave 1.1s cubic-bezier(.66,1.3,.48,.9)'
      }}
    >👋</span>
  )}
  {/* ❤️ heart fly */}
  {showHeart && (
  <span
    className="mascot-heart-fly"
    style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      fontSize: '2.2rem',
      pointerEvents: 'none',
      userSelect: 'none',
      zIndex: 100,
      animation: 'mascot-heart-global-fly 1.3s cubic-bezier(.66,1.15,.41,.96)'
    }}
  >💖</span>
)}
</div>
      {showHello && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white/70 backdrop-blur-xl border-2 border-mint-300 rounded-3xl px-8 py-6 shadow-2xl flex flex-col items-center animate-pop-fade">
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-mint-500 to-emerald-500 text-transparent bg-clip-text mb-3 animate-wave" style={{ fontFamily: 'cursive', letterSpacing: '0.03em' }}>
              👋 Mint says Hello!
            </span>
            <p className="text-lg md:text-2xl text-mint-700 font-semibold animate-heartbeat" style={{ fontFamily: 'cursive', letterSpacing: '0.03em' }}>
              Love you all 💚
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
