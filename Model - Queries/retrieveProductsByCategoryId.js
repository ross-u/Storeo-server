import Sequelize from 'sequelize';
import sequelize from '../db';
import { db } from '../Models';
import formatProductProperties from '../Helpers/formatProductProperties';

const { Product } = db;

const retrieveProductsByCategoryId = async (categoryId) => {
  const products = await sequelize.query(
    `SELECT products.*,
  GROUP_CONCAT(product_properties.property_name) as property_names,
  GROUP_CONCAT(product_properties.property_value) as property_values
  FROM products, product_properties
  WHERE products.category_id = ${categoryId} and products.id = product_properties.product_id GROUP BY products.id;`,
    {
      model: Product,
      type: Sequelize.QueryTypes.SELECT,
    },
  );
  const formattedProducts = formatProductProperties(products);
  return formattedProducts;
};

export default retrieveProductsByCategoryId;
