import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fs from 'fs';
import Image from '@11ty/eleventy-img';
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

export default async function (eleventyConfig) {
  // Process Tailwind CSS
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindSource = path.resolve('./src/styles/global.css');
    const tailwindDestination = './dist/styles/global.css';
    const outputPath = path.dirname(tailwindDestination);
    ensureDirectoryExists(outputPath);
    await processCss(tailwindSource, tailwindDestination)
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

  eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents))
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/fonts/hack-regular.woff2");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("dist");
}
