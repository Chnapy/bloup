const isProduction = process.env.NODE_ENV === 'production';

const devtool = isProduction ? 'source-map' : 'inline-cheap-module-source-map';

export { isProduction, devtool };
