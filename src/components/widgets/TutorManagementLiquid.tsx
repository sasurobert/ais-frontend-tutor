import React from 'react';
import './TutorManagementLiquid.css';

export function TutorManagementLiquid() {
  return (
    <div className="tutormanagementliquid-wrapper h-full w-full">
      
<div className="relative flex min-h-screen w-full flex-col pb-24">
<header className="flex items-center justify-between px-6 py-6 sticky top-0 z-50 backdrop-blur-md bg-background-dark/30">
<div className="flex items-center gap-3">
<div className="size-10 rounded-full liquid-glass flex items-center justify-center border border-primary/30">
<span className="material-symbols-outlined text-primary text-2xl">school</span>
</div>
<h1 className="text-xl font-extrabold tracking-tight text-slate-100">AISchoolOS</h1>
</div>
<div className="flex items-center gap-4">
<button className="size-10 rounded-full liquid-glass flex items-center justify-center text-slate-300">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="size-10 rounded-full bg-cover bg-center border-2 border-primary/50" data-alt="Tutor professional headshot avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAFDfT9KqIdtUsGGQ2jMZ4UEXRTnRXV0J_2Fo98_6xMYLIt3M_nHKEH0I1KCNT7cjo8l4eYIUTivddRf1xAopqBqCXW_A1DKjNFFu6TRuqpDefKOzipvEpoZANGQ3qi2NkEa8UPkE2vAL0-xPqfn1WikjnpjLr9NR9kZFqxOJzHzTmNa6W8EkSP3xYsvKxn8gSNWQ2o-W1nYQcVZIOeDNir9a8FkYK8P3_FxiXlVYxmjIUaFqEmZlFTTMCXSDUZZRV2PVQK58htMu1')" }}></div>
</div>
</header>
<main className="flex-1 px-4 space-y-6">
<section className="liquid-glass rounded-2xl p-6 relative overflow-hidden">
<div className="absolute top-0 right-0 p-4 opacity-20">
<span className="material-symbols-outlined text-8xl text-primary">auto_awesome</span>
</div>
<div className="flex items-center gap-4 mb-4">
<div className="size-20 rounded-2xl bg-cover bg-center ring-2 ring-primary/20" data-alt="Dr. Sarah Miller profile photo" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFh0iqCTBljsG5i3tyqP2j1JZw-UeEHO0AnDTUn9QkNzWfPbtFKe-liu_eQMecrOTNfo8ttNML4Zjd7cSQ39Jp1N4TWBRvoY-qn3Zrglz5N7raZLJgvmKDzBlS2iejekkDvcpASCSCNcyz4t0vcEUgB61i3Q4K13fKO9i4O3Ld6JCDZYE74VI4kuPpLxVxb00W6orsB-8mfn26VpLYorWJw0jGwvjPl0IYPTvB4agoGw0AD4qnk8dXzMx_-39ORYlk-p9HVDNXI1ZU')" }}></div>
<div>
<h2 className="text-2xl font-bold text-slate-100">Dr. Sarah Miller</h2>
<p className="text-slate-400 text-sm">Senior AI &amp; Mathematics Tutor</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-primary text-sm fill-1">star</span>
<span className="text-primary font-bold text-sm tracking-wide">4.9</span>
<span className="text-slate-500 text-xs ml-1">(500+ Sessions)</span>
</div>
</div>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">Machine Learning</span>
<span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">Calculus</span>
<span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">Data Science</span>
</div>
</section>
<section className="grid grid-cols-2 gap-4">
<div className="liquid-glass rounded-2xl p-4 flex flex-col justify-between h-32 border-l-4 border-primary">
<span className="text-slate-400 text-xs uppercase font-bold tracking-widest">Revenue</span>
<div>
<p className="text-2xl font-black text-slate-100">$12,450</p>
<div className="flex items-center text-emerald-400 text-xs font-medium">
<span className="material-symbols-outlined text-xs">trending_up</span>
<span>+12.5% this month</span>
</div>
</div>
</div>
<div className="liquid-glass rounded-2xl p-4 flex flex-col justify-between h-32 relative overflow-hidden">
<div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-primary to-transparent"></div>
<span className="text-slate-400 text-xs uppercase font-bold tracking-widest">Efficiency</span>
<div>
<p className="text-2xl font-black text-slate-100">98%</p>
<p className="text-slate-500 text-xs">Peak Performance</p>
</div>
</div>
</section>
<section>
<div className="flex items-center justify-between mb-4 px-2">
<h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">calendar_today</span>
                        Upcoming Sessions
                    </h3>
<button className="text-primary text-sm font-medium">View All</button>
</div>
<div className="space-y-4 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-slate-700/50">
<div className="liquid-glass rounded-xl p-4 ml-12 relative group">
<div className="absolute -left-10 top-1/2 -translate-y-1/2 size-4 rounded-full bg-primary ring-4 ring-primary/20 z-10"></div>
<div className="flex justify-between items-start">
<div>
<p className="text-xs text-primary font-bold mb-1 uppercase tracking-tighter">14:00 - 15:30</p>
<h4 className="font-bold text-slate-100">Alex Chen</h4>
<p className="text-slate-400 text-sm">Neural Networks Deep Dive</p>
</div>
<button className="size-8 rounded-lg bg-primary flex items-center justify-center text-background-dark shadow-lg shadow-primary/20">
<span className="material-symbols-outlined text-lg font-bold">videocam</span>
</button>
</div>
</div>
<div className="liquid-glass rounded-xl p-4 ml-12 relative opacity-70">
<div className="absolute -left-10 top-1/2 -translate-y-1/2 size-4 rounded-full bg-slate-600 z-10"></div>
<div className="flex justify-between items-start">
<div>
<p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-tighter">16:15 - 17:00</p>
<h4 className="font-bold text-slate-100">Maya Patel</h4>
<p className="text-slate-400 text-sm">Linear Algebra Foundations</p>
</div>
<div className="flex items-center gap-2">
<span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300">Pending</span>
</div>
</div>
</div>
</div>
</section>
<section>
<div className="flex items-center justify-between mb-4 px-2">
<h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">description</span>
                        Student Notes
                    </h3>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="liquid-glass rounded-2xl p-4 space-y-3">
<div className="flex items-center gap-2">
<div className="size-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">JD</div>
<p className="text-sm font-bold truncate">James D.</p>
</div>
<p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">Struggling with backpropagation. Needs extra viz.</p>
<div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
<span className="text-[10px] text-primary">Progress: 65%</span>
</div>
</div>
<div className="liquid-glass rounded-2xl p-4 space-y-3">
<div className="flex items-center gap-2">
<div className="size-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">LW</div>
<p className="text-sm font-bold truncate">Leo Wong</p>
</div>
<p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">Excelled in Python optimization. Ready for C++.</p>
<div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
<span className="text-[10px] text-primary">Progress: 92%</span>
</div>
</div>
</div>
</section>
</main>
<nav className="fixed bottom-6 left-4 right-4 z-50">
<div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between border-t-0 shadow-2xl shadow-black/50">
<a className="flex flex-col items-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined fill-1">dashboard</span>
<span className="text-[10px] font-bold">Home</span>
</a>
<a className="flex flex-col items-center gap-1 text-slate-400" href="#">
<span className="material-symbols-outlined">calendar_month</span>
<span className="text-[10px] font-medium">Sessions</span>
</a>
<div className="relative -top-8">
<button className="size-14 rounded-full bg-primary flex items-center justify-center text-background-dark shadow-xl shadow-primary/30 active:scale-95 transition-transform">
<span className="material-symbols-outlined text-3xl font-bold">add</span>
</button>
</div>
<a className="flex flex-col items-center gap-1 text-slate-400" href="#">
<span className="material-symbols-outlined">group</span>
<span className="text-[10px] font-medium">Students</span>
</a>
<a className="flex flex-col items-center gap-1 text-slate-400" href="#">
<span className="material-symbols-outlined">payments</span>
<span className="text-[10px] font-medium">Earnings</span>
</a>
</div>
</nav>
</div>

    </div>
  );
}
