import { HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import Image from '@11ty/eleventy-img';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import pluginRss from "@11ty/eleventy-plugin-rss";
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs';
import { DateTime } from "luxon";
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import YAML from "yaml";

const pipeline = postcss([
  tailwindcss(),
  autoprefixer(),
  cssnano({
    preset: 'default',
  })
]);

const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const processCss = async (source, destination) => {
  const cssRaw = fs.readFileSync(source, 'utf8');
  const product = await pipeline.process(cssRaw, {
    from: source,
    to: destination
  });
  fs.writeFileSync(destination, product.css);
}

const TIME_ZONE = "America/New_York";

export default async function (eleventyConfig) {
  eleventyConfig.addCollection("getTags", function(collection) {
    let tags = new Set();

    collection.getFilteredByGlob("./src/blog/**/*.md").forEach(post => {
      if (post.data.tags) {
        post.data.tags.forEach(tag => tags.add(tag))
      }
    });

    return Array.from(tags).sort();
  })
  
  eleventyConfig.addCollection("postsByTag", function(collection) {
    let postsByTag = {};

    collection.getFilteredByGlob("./src/blog/**/*.md").forEach(post => {
      if (post.data.tags) {
        post.data.tags.forEach(tag => {
          if (!postsByTag[tag]) {
            postsByTag[tag] = [];
          }
          postsByTag[tag].push(post);
        });
      }
    });

    return postsByTag;
  });

  eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents))

  eleventyConfig.addFilter("getMostRecentDate", (collection) => {
    if (!collection || collection.length === 0) {
      return new Date();
    }

    const mostRecent = collection.reduce((prev, curr) => {
      const prevDate = prev.data.lastmod ? prev.data.lastmod : prev.date;
      const currDate = curr.data.lastmod ? curr.data.lastmod : curr.date;
      return prevDate > currDate ? prev : curr;
    });

    return mostRecent.data.lastmod
      ? DateTime.fromJSDate(mostRecent.data.lastmod, { zone: "utc" }).setZone(TIME_ZONE, { keepLocalTime: true }).toJSDate()
      : DateTime.fromJSDate(mostRecent.date, { zone: "utc" }).setZone(TIME_ZONE, { keepLocalTime: true }).toJSDate();
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }

    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("htmlDate", function(date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("naturalDate", function(date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat("yyyy LLL dd");
  });

  eleventyConfig.addFilter("timezoneDate", (dateValue) => {
    return DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(TIME_ZONE, { keepLocalTime: true }).toJSDate();
  });

  // Shortcode to inline SVGs
  eleventyConfig.addNunjucksAsyncShortcode('inlineSvg', async (svgName, width="32", height="32", classes="") => {
    const metadata = await Image(`./src/assets/icons/${svgName}`, {
      formats: ['svg'],
      dryRun: true,
    })

    const svg = metadata.svg[0].buffer.toString()
    return svg.replace(/<svg /, `<svg width="${width}" height="${height}" class="${classes}" `);
  });
  
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/fonts/hack-regular.woff2");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addShortcode("currentYear", () => {
    return new Date().getFullYear();
  });

  // Process Tailwind CSS
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindSource = path.resolve('./src/styles/global.css');
    const tailwindDestination = './dist/styles/global.css';
    const outputPath = path.dirname(tailwindDestination);
    ensureDirectoryExists(outputPath);
    await processCss(tailwindSource, tailwindDestination)
  });

  eleventyConfig.setDataDirectory("../_data");
  eleventyConfig.setIncludesDirectory("../_includes");
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("dist");
}
