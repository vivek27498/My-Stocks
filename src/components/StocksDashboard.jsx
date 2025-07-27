import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StockCard from './StockCard';
import stockService from '../services/stockService';

const StocksDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const data = await stockService.getTopStocks();
      setStocks(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStocks();
  };

  return (
    <div className="stocks-dashboard">
      <motion.header
        className="dashboard-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <h1>Top Stocks Today</h1>
          <p>Real-time market data powered by Perplexity AI</p>
        </div>
        
        <motion.button
          className="refresh-btn"
          onClick={handleRefresh}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={loading ? { rotate: 360 } : {}}
            transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
          >
            🔄
          </motion.div>
          Refresh
        </motion.button>
      </motion.header>

      {lastUpdated && (
        <motion.div
          className="last-updated"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Last updated: {lastUpdated.toLocaleTimeString()}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            className="loading-container"
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p>Fetching latest stock data...</p>
          </motion.div>
        ) : (
          <motion.div
            className="stocks-grid"
            key="stocks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {stocks.map((stock, index) => (
              <StockCard key={stock.ticker} stock={stock} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StocksDashboard;