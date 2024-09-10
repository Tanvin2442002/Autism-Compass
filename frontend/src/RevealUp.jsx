import React, { useEffect, useRef } from "react";

import { motion, useAnimation, useInView } from "framer-motion";

const RevealUp = ({ children }) => {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainContent = useAnimation();

    useEffect(() => {
        console.log(isInView);
        // console.log(ref);
        if (isInView) {
            mainContent.start("visible");
        }
        else {
            mainContent.start("hidden");
        }
    }, [isInView]);

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainContent}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
        </div>
    );
};


export default RevealUp;