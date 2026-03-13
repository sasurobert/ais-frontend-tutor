'use client';

import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl"
        >
            <div className="absolute inset-0 pointer-events-none z-0 opacity-60 flex items-center justify-center">
                {/* 3D Cute Astronaut/Robot Scene */}
                <Spline scene="https://prod.spline.design/I-9eFnAF5TrY3NI4/scene.splinecode" />
            </div>
            <div className="z-10 flex flex-col items-center gap-6 relative p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-2xl shadow-2xl" style={{ boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)' }}>
                <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center space-y-2">
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-sm">
                        Loading Tutor Dashboard...
                    </p>
                    <p className="text-white/70 font-medium tracking-wide">
                        Preparing teaching tools
                    </p>
                </div>
                <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mt-4">
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                        className="h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-1/2" 
                    />
                </div>
            </div>
        </motion.div>
    );
}
