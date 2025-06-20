import { useState, useEffect } from 'react'
import { Heart, Sparkles, Star, Leaf } from 'lucide-react'
import mintIllustration from './assets/mint-illustration.jpg'
import './App.css'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [sparklePositions, setSparklePositions] = useState([])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-mint-100 to-emerald-100 overflow-hidden relative">
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

      {/* Main Content Container */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className={`text-center transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Header with animated title */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-mint-800 mb-4 animate-bounce-gentle">
              Hi, I'm <span className="text-mint-600 animate-pulse">Mint</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-5 h-5 text-yellow-400 animate-spin-slow" />
              <p className="text-xl text-mint-700 font-medium">
                Fresh • Cute • Delightful
              </p>
              <Star className="w-5 h-5 text-yellow-400 animate-spin-slow" />
            </div>
          </div>

          {/* Central Photo with decorative frame */}
          <div className="relative mb-8 group">
            <div className="absolute -inset-4 bg-gradient-to-r from-mint-300 to-emerald-300 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
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
            <p className="text-lg text-mint-700 leading-relaxed">
              Welcome to my little corner of the internet! I'm all about spreading joy, 
              freshness, and positive vibes. Let's make the world a little more colorful together! 
              <span className="inline-block animate-bounce ml-1">🌿</span>
            </p>
          </div>

          {/* Interactive Elements */}
          <div className="flex justify-center gap-6">
            <button className="group bg-mint-500 hover:bg-mint-600 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <span className="flex items-center gap-2">
                Say Hello 
                <Heart className="w-4 h-4 group-hover:animate-bounce" />
              </span>
            </button>
            <button className="group bg-white hover:bg-mint-50 text-mint-600 px-8 py-3 rounded-full font-semibold border-2 border-mint-300 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <span className="flex items-center gap-2">
                Learn More 
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              </span>
            </button>
          </div>

          {/* Footer tagline */}
          <div className="mt-12">
            <p className="text-mint-600 font-medium text-sm tracking-wide">
              ✨ Stay Fresh, Stay Mint ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

