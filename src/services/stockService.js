import axios from 'axios';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

class StockService {
  constructor() {
    this.apiKey = process.env.REACT_APP_PERPLEXITY_API_KEY || '';
  }

  async getTopStocks() {
    console.log('Fetching stocks...');
    
    // For now, let's use mock data to ensure the UI works
    // Uncomment the API call below when ready to use real data
    /*
    try {
      if (!this.apiKey || this.apiKey === 'dummy_key_for_testing') {
        console.log('No valid API key, using mock data');
        return this.getMockData();
      }

      const response = await axios.post(
        PERPLEXITY_API_URL,
        {
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a financial data assistant. Return only a valid JSON array of the top 10 performing stocks today with their current price, change, and percentage change. Include ticker, name, price, change, and changePercent fields.'
            },
            {
              role: 'user',
              content: 'Get the top 10 best performing stocks today with current prices, price changes, and percentage changes. Return as JSON array only.'
            }
          ],
          max_tokens: 1000,
          temperature: 0.1
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0].message.content;
      
      // Extract JSON from response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback mock data if parsing fails
      return this.getMockData();
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return this.getMockData();
    }
    */
    
    // Return mock data for now
    return this.getMockData();
  }

  getMockData() {
    return [
      { ticker: 'AAPL', name: 'Apple Inc.', price: 175.23, change: 3.45, changePercent: 2.01 },
      { ticker: 'MSFT', name: 'Microsoft Corp.', price: 342.67, change: 8.21, changePercent: 2.45 },
      { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 128.45, change: 2.89, changePercent: 2.30 },
      { ticker: 'TSLA', name: 'Tesla Inc.', price: 234.56, change: 12.34, changePercent: 5.56 },
      { ticker: 'AMZN', name: 'Amazon.com Inc.', price: 145.67, change: 4.23, changePercent: 2.99 },
      { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 456.78, change: 15.67, changePercent: 3.56 },
      { ticker: 'META', name: 'Meta Platforms', price: 298.45, change: 7.89, changePercent: 2.71 },
      { ticker: 'NFLX', name: 'Netflix Inc.', price: 387.23, change: 9.12, changePercent: 2.41 },
      { ticker: 'AMD', name: 'Advanced Micro Devices', price: 156.34, change: 5.67, changePercent: 3.76 },
      { ticker: 'CRM', name: 'Salesforce Inc.', price: 267.89, change: 6.45, changePercent: 2.47 }
    ];
  }
}

export default new StockService();