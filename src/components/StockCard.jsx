import { motion } from 'framer-motion';

const StockCard = ({ stock, index }) => {
  const isPositive = stock.change >= 0;

  return (
    <motion.div
      className="stock-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}
    >
      <div className="stock-header">
        <div className="stock-symbol">
          <h3>{stock.ticker}</h3>
          <span className="stock-name">{stock.name}</span>
        </div>
        <div className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
          <span className="change-value">
            {isPositive ? '+' : ''}{stock.change.toFixed(2)}
          </span>
          <span className="change-percent">
            ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
      
      <div className="stock-price">
        <motion.span
          className="price-value"
          key={stock.price}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          ${stock.price.toFixed(2)}
        </motion.span>
      </div>
      
      <div className="stock-trend">
        <motion.div
          className={`trend-bar ${isPositive ? 'positive' : 'negative'}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.abs(stock.changePercent) * 10, 100)}%` }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

export default StockCard;