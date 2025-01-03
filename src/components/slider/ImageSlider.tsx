import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageSlider = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="w-full h-full">
        <div style={{padding:'56.15% 0 0 0', position:'relative'}}>
          <iframe 
            src="https://player.vimeo.com/video/1043623606?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;loop=1&amp;autoplay=1&amp;muted=1"
            style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title="newphoneixboating"
          />
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/60">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-20 left-0 right-0 text-center text-white"
          >
            <h2 className="text-4xl font-bold">New Phoenix Boating</h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
};