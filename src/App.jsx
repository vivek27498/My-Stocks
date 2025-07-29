import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MarketSelector from './components/MarketSelector'
import stockService from './services/stockService'
import { Button, Typography, tokens } from './design-system'
import './App.css'

function App() {
  const [selectedMarket, setSelectedMarket] = useState(null)
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)

  const handleMarketSelect = async (market) => {
    setSelectedMarket(market)
    setLoading(true)
    
    try {
      const stockData = await stockService.getTopStocks(market)
      setStocks(stockData)
    } catch (error) {
      console.error('Error fetching stocks:', error)
      // Fallback to mock data on error
      setStocks(stockService.getMockData(market))
    } finally {
      setLoading(false)
    }
  }

  const handleBackToMarketSelector = () => {
    setSelectedMarket(null)
    setStocks([])
  }

  if (!selectedMarket) {
    return <MarketSelector onMarketSelect={handleMarketSelect} selectedMarket={selectedMarket} />
  }

  const marketConfig = {
    indian: {
      title: 'Indian Stock Market',
      subtitle: 'NSE & BSE Real-time Data',
      flag: '🇮🇳',
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #ffb700 100%)',
    },
    us: {
      title: 'US Stock Market',
      subtitle: 'NYSE & NASDAQ Real-time Data',
      flag: '🇺🇸',
      gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    },
  }

  const currentMarket = marketConfig[selectedMarket]

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: currentMarket.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center',
            color: 'white',
          }}
        >
          <motion.div
            style={{ fontSize: '4rem', marginBottom: tokens.spacing[4] }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            {currentMarket.flag}
          </motion.div>
          <Typography variant="h2" color="white">
            Loading {currentMarket.title}
          </Typography>
          <Typography variant="body" color="white" style={{ opacity: 0.9, marginTop: tokens.spacing[2] }}>
            Fetching latest market data...
          </Typography>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: currentMarket.gradient }}>
      {/* Header with Market Info and Back Button */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: tokens.spacing[6],
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing[3] }}>
          <span style={{ fontSize: '2rem' }}>{currentMarket.flag}</span>
          <div>
            <Typography variant="h3" color="white" weight="bold">
              {currentMarket.title}
            </Typography>
            <Typography variant="small" color="white" style={{ opacity: 0.8 }}>
              {currentMarket.subtitle}
            </Typography>
          </div>
        </div>
        
        <Button
          variant="ghost"
          onClick={handleBackToMarketSelector}
          style={{
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          ← Switch Market
        </Button>
      </motion.header>

      {/* Stocks Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMarket}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{ padding: tokens.spacing[6] }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: tokens.spacing[4],
            maxWidth: '1400px',
            margin: '0 auto',
          }}>
            {stocks.map((stock, index) => {
              const isPositive = stock.change >= 0
              return (
                <motion.div
                  key={stock.ticker}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: tokens.borderRadius.xl,
                    padding: tokens.spacing[5],
                    boxShadow: tokens.shadow.lg,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: tokens.spacing[3],
                  }}>
                    <div>
                      <Typography variant="h4" weight="bold" color="primary">
                        {stock.ticker}
                      </Typography>
                      <Typography variant="small" color="secondary">
                        {stock.name}
                      </Typography>
                    </div>
                    <div style={{
                      padding: `${tokens.spacing[1]} ${tokens.spacing[2]}`,
                      borderRadius: tokens.borderRadius.md,
                      backgroundColor: isPositive ? tokens.colors.success[50] : tokens.colors.danger[50],
                      border: `1px solid ${isPositive ? tokens.colors.success[200] : tokens.colors.danger[200]}`,
                    }}>
                      <Typography 
                        variant="small" 
                        weight="medium"
                        color={isPositive ? 'success' : 'danger'}
                      >
                        {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </Typography>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: tokens.spacing[3] }}>
                    <Typography variant="h2" weight="bold" color="primary">
                      {stock.currency}{stock.price.toFixed(2)}
                    </Typography>
                    <Typography 
                      variant="body" 
                      color={isPositive ? 'success' : 'danger'}
                      weight="medium"
                    >
                      {isPositive ? '+' : ''}{stock.currency}{stock.change.toFixed(2)}
                    </Typography>
                  </div>
                  
                  <motion.div
                    style={{
                      height: '4px',
                      backgroundColor: tokens.colors.neutral[200],
                      borderRadius: tokens.borderRadius.full,
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      style={{
                        height: '100%',
                        backgroundColor: isPositive ? tokens.colors.success[500] : tokens.colors.danger[500],
                        borderRadius: tokens.borderRadius.full,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(Math.abs(stock.changePercent) * 10, 100)}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
