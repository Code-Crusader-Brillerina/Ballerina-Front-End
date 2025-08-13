import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Stethoscope, 
  Pill, 
  FileText, 
  Calendar, 
  Video, 
  Truck, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  PlayCircle,
  Check,
  Users,
  Activity,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return <span>{count}{suffix}</span>;
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <div className="group relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-bl-3xl rounded-tr-3xl" style={{backgroundImage: gradient}}></div>
    
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6 bg-gradient-to-br ${gradient.replace('opacity-10', '')}`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    
    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>
    
    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex items-center text-blue-600 font-semibold">
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

// Service Card Component
const ServiceCard = ({ icon: Icon, title, features, buttonText, primary = false }) => (
  <div className={`relative rounded-3xl p-8 shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
    primary 
      ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white scale-105' 
      : 'bg-white text-gray-800 hover:shadow-3xl'
  }`}>
    {primary && (
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
        Popular
      </div>
    )}
    
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6 ${
      primary ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-blue-500 to-purple-600'
    }`}>
      <Icon className={`w-8 h-8 ${primary ? 'text-white' : 'text-white'}`} />
    </div>
    
    <h3 className="text-2xl font-bold mb-6">{title}</h3>
    
    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className={`w-5 h-5 mr-3 ${primary ? 'text-green-300' : 'text-green-500'}`} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <button className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-200 ${
      primary 
        ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl' 
        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
    }`}>
      {buttonText}
    </button>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ name, role, content, rating, avatar }) => (
  <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
    <div className="flex items-center mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
      ))}
    </div>
    
    <p className="text-gray-600 mb-6 italic leading-relaxed">"{content}"</p>
    
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg mr-4">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  </div>
);

// Main Landing Page Component
const Home = () => {
  const [activeTab, setActiveTab] = useState('doctors');

  const features = [
    {
      icon: Stethoscope,
      title: "Expert Doctors",
      description: "Connect with qualified healthcare professionals from the comfort of your home through our secure video consultation platform.",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Pill,
      title: "Online Pharmacy",
      description: "Order prescribed medications with fast delivery to your doorstep. Track your orders in real-time with our advanced system.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: FileText,
      title: "Digital Records",
      description: "Access your complete medical history, prescriptions, and test results anytime, anywhere with our secure cloud storage.",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const services = [
    {
      icon: Video,
      title: "Telemedicine",
      features: [
        "HD video consultations",
        "Secure messaging",
        "Digital prescriptions",
        "Follow-up appointments"
      ],
      buttonText: "Start Consultation",
      primary: false
    },
    {
      icon: Calendar,
      title: "Appointment Booking",
      features: [
        "Easy online booking",
        "Real-time availability",
        "Automated reminders",
        "Flexible rescheduling"
      ],
      buttonText: "Book Appointment",
      primary: true
    },
    {
      icon: Truck,
      title: "Medicine Delivery",
      features: [
        "Same-day delivery",
        "Prescription verification",
        "Order tracking",
        "Contactless delivery"
      ],
      buttonText: "Order Medicine",
      primary: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "Halgouce made healthcare so convenient for me. I can consult with my doctor from home and get my medicines delivered the same day!",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content: "The platform is incredibly user-friendly. I can provide quality care to more patients while maintaining the personal touch.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Regular User",
      content: "The prescription management feature is amazing. I never miss my medications anymore, and the delivery is always on time.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Your Health, Our Priority</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Halgouce
                </span>
                <br />
                Healthcare
                <br />
                <span className="text-5xl lg:text-6xl">Revolution</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience the future of healthcare with our comprehensive e-channeling and online pharmacy platform. 
                Connect with doctors, manage prescriptions, and get medicines delivered - all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group flex items-center bg-white/90 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
                  <PlayCircle className="w-5 h-5 mr-2 text-blue-600" />
                  <span>Watch Demo</span>
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={50} suffix="K+" />
                  </div>
                  <p className="text-gray-600 text-sm">Happy Patients</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <p className="text-gray-600 text-sm">Expert Doctors</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={24} suffix="/7" />
                  </div>
                  <p className="text-gray-600 text-sm">Available</p>
                </div>
              </div>
            </div>
            
            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="p4.png"
                  alt="Healthcare Professional"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                
                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Health Score</p>
                      <p className="text-green-500 font-bold">98%</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce animation-delay-1000">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Next Appointment</p>
                      <p className="text-purple-500 font-bold">Today 2PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl blur-3xl opacity-20 scale-105"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Halgouce?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing healthcare by making it more accessible, convenient, and personal. 
              Experience healthcare like never before.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed for the modern world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with Halgouce in just three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your account and complete your health profile in minutes",
                icon: Users
              },
              {
                step: "02", 
                title: "Book Appointment",
                description: "Choose your doctor and schedule a consultation that fits your schedule",
                icon: Calendar
              },
              {
                step: "03",
                title: "Get Treatment",
                description: "Receive expert care and get your medicines delivered to your doorstep",
                icon: Truck
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied patients and healthcare providers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;