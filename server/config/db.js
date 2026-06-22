const mongoose = require("mongoose");
const dns = require("dns");

// Fix for Node.js c-ares DNS resolver failing on Windows.
// The mongodb+srv:// connection string relies on dns.resolveSrv() and
// dns.resolveTxt(), which use the c-ares library. On some Windows setups
// c-ares cannot reach the configured DNS server and fails with
// ECONNREFUSED even though the system resolver (nslookup) works.
// Explicitly pointing c-ares at Google's public DNS servers resolves this.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    w: 'majority',
    maxPoolSize: 10,
    minPoolSize: 2,
    heartbeatFrequencyMS: 10000,
  };

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt++;
      console.log(`MongoDB connection attempt ${attempt}/${maxRetries}...`);
      await mongoose.connect(process.env.MONGO_URI, options);
      console.log("MongoDB Connected ✅");
      return;
    } catch (error) {
      console.error(`MongoDB Connection Error (attempt ${attempt}/${maxRetries}) ❌`, error.message);
      if (attempt >= maxRetries) {
        console.error("All MongoDB connection attempts failed. Server cannot start without database.");
        process.exit(1);
      }
      // Wait 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

module.exports = connectDB;