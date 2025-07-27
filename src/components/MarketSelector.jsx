import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Typography, tokens } from '../design-system';

const MarketSelector = ({ onMarketSelect, selectedMarket }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const markets = [
    {
      id: 'indian',
      name: 'Indian Markets',
      subtitle: 'NSE & BSE',
      flag: '🇮🇳',
      color: tokens.colors.india.primary,
      accent: tokens.colors.india.accent,
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #ffb700 100%)',
      description: 'Trade in Indian rupees with NSE and BSE listed companies',
      features: ['NSE Listed Stocks', 'BSE Blue Chips', 'Nifty 50', 'Sectoral Indices'],
    },
    {
      id: 'us',
      name: 'US Markets',
      subtitle: 'NYSE & NASDAQ',
      flag: '🇺🇸',
      color: tokens.colors.us.primary,
      accent: tokens.colors.us.accent,
      gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      description: 'Access to American stock exchanges and global companies',
      features: ['S&P 500', 'NASDAQ Tech', 'Dow Jones', 'Growth Stocks'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const splitScreenVariants = {
    initial: { width: '50%' },
    hover: { width: '60%' },
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: tokens.spacing[4],
    }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          style={{
            textAlign: 'center',
            marginBottom: tokens.spacing[8],
          }}
        >
          <Typography variant="h1" color="white" animate>
            Choose Your Market
          </Typography>
          <Typography variant="body" color="white" animate style={{ marginTop: tokens.spacing[2] }}>
            Select between Indian and US stock markets to start trading
          </Typography>
        </motion.div>

        {/* Split Screen Layout */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: tokens.spacing[4],
            height: '500px',
            borderRadius: tokens.borderRadius['2xl'],
            overflow: 'hidden',
            boxShadow: tokens.shadow.xl,
          }}
        >
          {markets.map((market, index) => (
            <motion.div
              key={market.id}
              style={{
                flex: 1,
                background: market.gradient,
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              variants={splitScreenVariants}
              initial="initial"
              whileHover="hover"
              onClick={() => onMarketSelect(market.id)}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='9' cy='9' r='4'/%3E%3Cpath d='m49 49 4-4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />

              {/* Content */}
              <div style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: tokens.spacing[6],
                color: 'white',
              }}>
                {/* Flag and Title */}
                <div>
                  <motion.div
                    style={{ fontSize: '4rem', marginBottom: tokens.spacing[3] }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {market.flag}
                  </motion.div>
                  <Typography variant="h2" color="white" weight="bold">
                    {market.name}
                  </Typography>
                  <Typography variant="body" color="white" style={{ opacity: 0.9 }}>
                    {market.subtitle}
                  </Typography>
                </div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Typography variant="small" color="white" style={{ marginBottom: tokens.spacing[3] }}>
                    {market.description}
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing[1] }}>
                    {market.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: tokens.spacing[2],
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                        }} />
                        <Typography variant="small" color="white">
                          {feature}
                        </Typography>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      width: '100%',
                    }}
                  >
                    Explore {market.name}
                  </Button>
                </motion.div>
              </div>

              {/* Hover Overlay */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  pointerEvents: 'none',
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          style={{
            textAlign: 'center',
            marginTop: tokens.spacing[6],
          }}
        >
          <Typography variant="small" color="white" style={{ opacity: 0.8 }}>
            You can switch between markets anytime from the dashboard
          </Typography>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MarketSelector;