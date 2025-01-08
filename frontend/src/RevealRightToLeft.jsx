import React, { useEffect, useRef } from "react";

import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";

const Reveal = ({ children}) => {

   const ref = useRef(null);
   const isInView = useInView(ref, {amount: 0.3, once: true});
   const mainContent = useAnimation();

   useEffect(() => {
      if (isInView) {
         mainContent.start("visible");
      }
      else {
         mainContent.start("hidden");
      }
   }, [isInView]);

   return (
      <div ref = {ref} style={{ position: 'relative'}}>
         <motion.div
            variants={{
               hidden: { opacity: 0, x: 100 },
               visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate={mainContent}
            transition={{ duration: 1, delay: 0.25 }}
         >
            {children}
         </motion.div>
      </div>
   );
};


export default Reveal;