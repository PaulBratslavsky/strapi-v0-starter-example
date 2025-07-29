/**
 * `populate-articles-middleware` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = {
  cover: {
    fields: ["url", "alternativeText"],
  },
  category: true,
  author: {
    populate: {
      avatar: {
        fields: ["url", "alternativeText"],
      },
    },
  },
  blocks: {
    on: {
      "shared.media": {
        populate: {
          file: {
            fields: ["alternativeText", "url"],
          },
        },
      },
      "shared.slider": {
        populate: {
          files: {
            fields: ["alternativeText", "url"],
          },
        },
      },
      "shared.rich-text": true,
      "shared.quote": true,
    },
  },
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In article-populate middleware.");
    
    const mergedPopulate = {
      ...ctx.query.populate,
      ...populate,
    };
    
    ctx.query.populate = mergedPopulate;
    await next();
  };
};
