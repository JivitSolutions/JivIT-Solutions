import { motion } from 'framer-motion';
import { revealVariants } from './revealVariants';

const ScrollReveal = ({ children, className = '' }) => {
    return (
        <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
