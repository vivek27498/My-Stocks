import axios from 'axios';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

class StockService {
  constructor() {
    this.apiKey = process.env.VITE_PERPLEXITY_API_KEY || '';
  }

  async getTopStocks(market = 'us') {
    console.log(`Fetching ${market} stocks...`);
    
    try {
      if (!this.apiKey) {
        console.log('No API key, using mock data');
        return this.getMockData(market);
      }

      const marketPrompts = {
        us: 'Get the top 8 best performing US stocks today from NYSE and NASDAQ with current prices, price changes, and percentage changes. Include major companies like Apple, Microsoft, Google, Tesla, Amazon, NVIDIA, Meta, Netflix.',
        indian: 'Get the top 8 best performing Indian stocks today from NSE and BSE with current prices in INR, price changes, and percentage changes. Include major companies like Reliance, TCS, HDFC Bank, Infosys, ICICI Bank, Hindustan Unilever, ITC, SBI.'
      };

      const response = await axios.post(
        PERPLEXITY_API_URL,
        {
          model: 'sonar',
          messages: [
            {
              role: 'system',
              content: `You are a financial data assistant. Return only a valid JSON array of stocks with their current price, change, and percentage change. Include ticker, name, price, change, changePercent, and currency fields. For US stocks use currency: "$", for Indian stocks use currency: "₹".`
            },
            {
              role: 'user',
              content: `${marketPrompts[market]} Return as JSON array only with no additional text.`
            }
          ],
          max_tokens: 1500,
          temperature: 0.1
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Full response:', response.data);
      console.log('Choices:', response.data.choices);
      
      // Try different possible response structures
      let content = '';
      if (response.data.choices && response.data.choices[0]) {
        if (response.data.choices[0].message) {
          content = response.data.choices[0].message.content;
        } else if (response.data.choices[0].text) {
          content = response.data.choices[0].text;
        } else if (response.data.choices[0].delta && response.data.choices[0].delta.content) {
          content = response.data.choices[0].delta.content;
        }
      }
      
      console.log('Extracted content:', content);
      
      // Extract JSON from response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        console.log('Found JSON:', jsonMatch[0]);
        const stockData = JSON.parse(jsonMatch[0]);
        // Ensure currency field is present
        return stockData.map(stock => ({
          ...stock,
          currency: market === 'indian' ? '₹' : '$'
        }));
      }
      
      // Fallback mock data if parsing fails
      console.log('Failed to parse API response, using mock data');
      return this.getMockData(market);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return this.getMockData(market);
    }
  }

  getMockData(market = 'us') {
    const mockData = {
      us: [
        { ticker: 'AAPL', name: 'Apple Inc.', price: 175.23, change: 3.45, changePercent: 2.01, currency: '$' },
        { ticker: 'MSFT', name: 'Microsoft Corp.', price: 342.67, change: 8.21, changePercent: 2.45, currency: '$' },
        { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 128.45, change: 2.89, changePercent: 2.30, currency: '$' },
        { ticker: 'TSLA', name: 'Tesla Inc.', price: 234.56, change: 12.34, changePercent: 5.56, currency: '$' },
        { ticker: 'AMZN', name: 'Amazon.com Inc.', price: 145.67, change: 4.23, changePercent: 2.99, currency: '$' },
        { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 456.78, change: 15.67, changePercent: 3.56, currency: '$' },
        { ticker: 'META', name: 'Meta Platforms', price: 298.45, change: 7.89, changePercent: 2.71, currency: '$' },
        { ticker: 'NFLX', name: 'Netflix Inc.', price: 387.23, change: 9.12, changePercent: 2.41, currency: '$' }
      ],
      indian: [
        { ticker: 'RELIANCE', name: 'Reliance Industries Ltd.', price: 2435.50, change: 45.30, changePercent: 1.89, currency: '₹' },
        { ticker: 'TCS', name: 'Tata Consultancy Services', price: 3542.75, change: 78.25, changePercent: 2.26, currency: '₹' },
        { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: 1634.80, change: -23.40, changePercent: -1.41, currency: '₹' },
        { ticker: 'INFY', name: 'Infosys Ltd.', price: 1456.90, change: 34.55, changePercent: 2.43, currency: '₹' },
        { ticker: 'ICICIBANK', name: 'ICICI Bank Ltd.', price: 1067.20, change: 18.75, changePercent: 1.79, currency: '₹' },
        { ticker: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', price: 2387.45, change: -12.35, changePercent: -0.51, currency: '₹' },
        { ticker: 'ITC', name: 'ITC Ltd.', price: 467.80, change: 8.90, changePercent: 1.94, currency: '₹' },
        { ticker: 'SBIN', name: 'State Bank of India', price: 634.25, change: 15.60, changePercent: 2.52, currency: '₹' }
      ]
    };
    
    return mockData[market] || mockData.us;
  }
}

export default new StockService();