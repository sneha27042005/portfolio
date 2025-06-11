import React, { useEffect, useState } from 'react';
import { Mail, Github, Linkedin, Twitter, ExternalLink, User, Code, Palette, Phone, MapPin, Calendar, Send } from 'lucide-react';
import snehaImage from './assets/sneha.jpg';



function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [showCursorText, setShowCursorText] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;
    
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail effect
      setTrails(prev => {
        const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
        const updatedTrails = [newTrail, ...prev.slice(0, 8)];
        return updatedTrails;
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
          setShowCursorText(true);
        }
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(false);
        setShowCursorText(false);
        setCursorText('');
      }
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Custom Cursor Elements */}
      <div 
        className={`cursor-dot ${isHovering ? 'cursor-hover' : ''} ${isClicking ? 'cursor-click' : ''}`}
        style={{ 
          left: cursorPosition.x - 4, 
          top: cursorPosition.y - 4 
        }}
      />
      <div 
        className={`cursor-outline ${isHovering ? 'cursor-hover' : ''} ${isClicking ? 'cursor-click' : ''}`}
        style={{ 
          left: cursorPosition.x - 16, 
          top: cursorPosition.y - 16 
        }}
      />
      
      {/* Cursor Trail */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 2,
            top: trail.y - 2,
            opacity: (8 - index) / 8,
            transform: `scale(${(8 - index) / 8})`,
          }}
        />
      ))}

      {/* Cursor Text */}
      <div 
        className={`cursor-text ${showCursorText ? 'show' : ''}`}
        style={{ 
          left: cursorPosition.x, 
          top: cursorPosition.y - 40 
        }}
      >
        {cursorText}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-purple-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Sneha R</h1>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-purple-600 transition-colors" data-cursor-text="Home">Home</a>
              <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors" data-cursor-text="About">About</a>
              <a href="#projects" className="text-gray-600 hover:text-purple-600 transition-colors" data-cursor-text="Projects">Projects</a>
              <a href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors" data-cursor-text="Contact">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sneha
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A passionate  Designer & Frontend Developer creating beautiful digital experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                data-cursor-text="View Work"
              >
                View My Work
              </button>
              <button 
                className="border-2 border-purple-300 text-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 hover:scale-105 transition-all duration-300"
                data-cursor-text="Go To"
              >
                About Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About Me</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {/* EDIT: Change this paragraph to describe yourself */}
                I'm a creative designer and developer with beginner experience crafting digital experiences that users love.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {/* EDIT: Add more about your background, skills, or interests */}
As a designer, I focus on:

Aesthetic UI with a love for pastel palettes and clean layouts.

Creating visually appealing and mobile-friendly interfaces.
     </p>
      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {/* EDIT: Add more about your background, skills, or interests */}
                

 <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {/* EDIT: Add more about your background, skills, or interests */}
                
As a developer, I specialize in:

HTML, CSS, and JavaScript to build responsive and interactive websites.

Using React for dynamic user interfaces.



     </p>
     </p>
              <div className="flex flex-wrap gap-3">
                {/* EDIT: Change these skills to match your expertise */}
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm cursor-pointer" data-cursor-text="node-js">NODE-JS</span>
                <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm cursor-pointer" data-cursor-text="React">React</span>
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm cursor-pointer" data-cursor-text="java">JAVA</span>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm cursor-pointer" data-cursor-text="python">PYTHON</span>
                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm cursor-pointer" data-cursor-text="html">HTML</span>
              </div>
            </div>
       <div className="flex justify-center">
  <div className="relative">
    {/* Replace with your image */}
    <div className="w-80 h-80 rounded-full overflow-hidden flex items-center justify-center shadow-2xl cursor-pointer" data-cursor-text="That's me!">

<img 
  src={snehaImage} 
  alt="Sneha's Profile" 
  className="w-full h-full object-cover"
/>

    </div>
    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer" data-cursor-text="Design">
      <Palette className="text-purple-500" size={32} />
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Projects Section - Bento Grid */}
      <section id="projects" className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Featured Projects</h2>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
            {/* Large Project Card */}
            <div 
              className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => window.open('http://superb-sundae-6eeac8.netlify.app', '_blank')}
              data-cursor-text="View Project"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Code className="text-purple-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {/* EDIT: Change to your project name */}
                    PROJECT-ZELION
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {/* EDIT: Change to your project description */}
                 
Project-Zelion: A Dynamic Cricket Hub

Project-Zelion is an interactive web project dedicated to the exciting world of cricket. Designed to engage fans of all ages, it offers real-time updates, player profiles, match statistics, team comparisons, and upcoming fixtures — all in one sleek, user-friendly platform. Whether you're a casual viewer or a hardcore fan, Project-Zelion brings the thrill of the game right to your screen with visually appealing design, smooth animations, and responsive layouts.

From live scores to historical records, this project combines passion for cricket with modern web technology to create an immersive digital experience.
                  </p>
                </div>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-3 transition-all">
                  View Project <ExternalLink size={20} className="ml-2" />
                </div>
              </div>
            </div>

            {/* Medium Project Card */}
            <div 
              className="md:col-span-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => window.open('http://frabjous-moonbeam-efe9e7.netlify.app', '_blank')}
              data-cursor-text="View Project"
            >
              <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {/* EDIT: Change to your project name */}
                MELODY-QR CODE
              </h3>
              <p className="text-gray-600 mb-4">
                {/* EDIT: Change to your project description */}
              A simple website or code that allows you to open Spotify and access your favorite songs.


              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all">
                View Project <ExternalLink size={16} className="ml-2" />
              </div>
            </div>

            {/* Small Project Card 1 */}
            <div 
              className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => window.open('https://github.com/sneha27042005/hello-demo.git', '_blank')}
              data-cursor-text="View Project"
            >
              <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {/* EDIT: Change to your project name */}
                HELLO-DEMO
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {/* EDIT: Change to your project description */}
                hello-demo is a simple starter project using Node.js and React. It serves as a basic template to understand the integration between frontend and backend, perfect for beginners exploring full-stack development.
              </p>
              <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
                View <ExternalLink size={14} className="ml-1" />
              </div>
            </div>

            {/* Small Project Card 2 */}
            <div 
              className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => window.open('https://github.com/sneha27042005/tic-tac-toe-python.git', '_blank')}
              data-cursor-text="View Project"
            >
              <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="text-orange-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {/* EDIT: Change to your project name */}
                TIC-TAC-TOE
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {/* EDIT: Change to your project description */}
                A simple tic-tac-toe game in python which is  offline sync.
              </p>
              <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                View <ExternalLink size={14} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Let's Connect</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to discuss new projects and opportunities.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Email Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-purple-100 cursor-pointer" data-cursor-text="Send Email">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email Me</h3>
              <p className="text-gray-600 mb-4">Drop me a line anytime</p>
              <a 
                href="mailto:sarah.johnson@example.com" 
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                data-cursor-text="Click to Email"
              >
                {/* EDIT: Change to your email */}
                sneha2005427@gmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-pink-100 cursor-pointer" data-cursor-text="Call Me">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Phone className="text-pink-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Call Me</h3>
              <p className="text-gray-600 mb-4">Let's have a conversation</p>
              <a 
                href="tel:+1234567890" 
                className="text-pink-600 font-semibold hover:text-pink-700 transition-colors"
                data-cursor-text="Click to Call"
              >
                {/* EDIT: Change to your phone number */}
                +91 9645305369
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-100 md:col-span-2 lg:col-span-1 cursor-pointer" data-cursor-text="My Location">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600 mb-4">Based in</p>
              <p className="text-blue-600 font-semibold">
                {/* EDIT: Change to your location */}
                Kerala,India
              </p>
            </div>
          </div>

          {/* Availability & CTA Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-purple-100 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <Calendar className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Available for Work</h3>
                    <p className="text-green-600 font-semibold">Open to new opportunities</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {/* EDIT: Update your availability status */}
                  I'm currently available for freelance projects and full-time opportunities. 
                  Let's discuss how we can work together to create something amazing.
                </p>
              </div>
              <div className="text-center md:text-right">
                <a 
                  href="sneha2005427@gmail.com?subject=Let's Work Together" 
                  className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg font-semibold"
                  data-cursor-text="Let's Work!"
                >
                  <Send className="mr-2" size={20} />
                  Start a Project
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Follow My Journey</h3>
            <div className="flex justify-center space-x-6">
              {/* EDIT: Update these links with your actual social media profiles */}
              <a 
                href="https://github.com/sneha27042005" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
                data-cursor-text="GitHub"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 border border-gray-100">
                  <Github className="text-gray-700 group-hover:text-purple-600 transition-colors" size={28} />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  GitHub
                </span>
              </a>
              
              <a 
                href="https://linkedin.com/in/sneha-r-7523b7330" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
                data-cursor-text="LinkedIn"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 border border-gray-100">
                  <Linkedin className="text-gray-700 group-hover:text-blue-600 transition-colors" size={28} />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  LinkedIn
                </span>
              </a>
              
             
              
              <a 
                href="sneha2005427@gmail.com" 
                className="group relative"
                data-cursor-text="Email"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 border border-gray-100">
                  <Mail className="text-gray-700 group-hover:text-pink-600 transition-colors" size={28} />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Email
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            {/* EDIT: Update with your name and year */}
            © 2025 Sneha. Designed & Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;