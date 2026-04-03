const Contact = () => {
  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Form එකේ දත්ත ලබා ගැනීම
    const formData = new FormData(e.currentTarget);
    const name = formData.get('userName');
    const email = formData.get('userEmail');
    
    // WhatsApp පණිවිඩය සකස් කිරීම
    const message = `Hello KeltiX Academy! 🚀%0A%0AI want to claim my 30% Discount.%0A%0A👤 *Name:* ${name}%0A📧 *Email:* ${email}%0A%0APlease send me the registration details!`;
    
    // WhatsApp එකට යොමු කිරීම
    window.open(`https://wa.me/94741302643?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-orange-500 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to start your AI journey?</h2>
            <p className="text-white/80 text-lg mb-8">
              අදම ලියාපදිංචි වන අයට 30% ක සුවිශේෂී වට්ටමක් හිමි වේ. දැන්ම සම්බන්ධ වෙන්න.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/94741302643" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-orange-500 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-100 transition-all"
              >
                <Phone size={20} />
                WhatsApp Us
              </a>
              <div className="flex items-center gap-3 text-white font-mono text-xl">
                0741302643
              </div>
            </div>
          </div>

          {/* Registration Form එක මෙතැන් සිට */}
          <div className="relative z-10 bg-black/20 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-full max-w-sm">
            <h3 className="text-white font-bold text-xl mb-6">Quick Registration</h3>
            <form onSubmit={handleRegistration} className="space-y-4">
              <input 
                name="userName" 
                type="text" 
                placeholder="Your Name" 
                required
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40" 
              />
              <input 
                name="userEmail" 
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40" 
              />
              <button 
                type="submit" 
                className="w-full bg-white text-orange-500 font-bold py-4 rounded-xl hover:bg-zinc-100 transition-all"
              >
                Claim 30% Discount
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
