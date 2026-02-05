const NETHUNT_API_KEY = '15c64ae7-e8c4-4d84-9127-ec741d47509e';
const NETHUNT_EMAIL = 'bohdansbv@gmail.com';
const NETHUNT_API_BASE = 'https://nethunt.com/api/v1';

class NethuntService {
  constructor() {
    this.apiKey = NETHUNT_API_KEY;
    this.email = NETHUNT_EMAIL;
  }

  async makeRequest(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${this.email}:${this.apiKey}`)}`,
      ...options.headers,
    };

    const response = await fetch(`${NETHUNT_API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`NetHunt API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getCustomerOrders(customerEmail) {
    try {
      const response = await this.makeRequest(`/zapier/triggers/record-found`, {
        method: 'POST',
        body: JSON.stringify({
          email: customerEmail,
        }),
      });
      return response;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      return [];
    }
  }

  async getCustomerData(customerEmail) {
    try {
      const response = await this.makeRequest(`/zapier/triggers/record-found`, {
        method: 'POST',
        body: JSON.stringify({
          email: customerEmail,
        }),
      });
      return response;
    } catch (error) {
      console.error('Error fetching customer data:', error);
      return null;
    }
  }

  async searchRecords(query) {
    try {
      const response = await this.makeRequest('/records/search', {
        method: 'POST',
        body: JSON.stringify({
          query,
        }),
      });
      return response;
    } catch (error) {
      console.error('Error searching records:', error);
      return [];
    }
  }
}

export const nethuntService = new NethuntService();
