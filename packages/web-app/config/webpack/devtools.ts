if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not defined');
}

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const devtool = isProduction ? 'source-map' : 'inline-cheap-module-source-map';

export { isProduction, isDevelopment, devtool };
