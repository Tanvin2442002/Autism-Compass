import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const RevealUp = ({ children, delay }) => {
    const ref = useRef(null);
    // Set amount to 0.3 to trigger when 30% of the component is visible
    const isInView = useInView(ref, { amount: 0.4, once: true });
    const mainContent = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainContent.start("visible");
        } else {
            mainContent.start("hidden");
        }
    }, [isInView, mainContent]);

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainContent}
                transition={{ duration: 0.5, delay: delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default RevealUp;
