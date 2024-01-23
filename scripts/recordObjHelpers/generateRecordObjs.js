/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

// To do: Make this ESM.
// To do: properly check heading numbers (headings with the same text get
// numbered, this script doesn’t check that).

const assert = require('assert');
const fs = require('fs');
const GithubSlugger = require('github-slugger');
const walk = require('./walk');

let modules;

function stripLinks(line) {
  return line.replace(/\[([^\]]+)\]\([^)]+\)/, (match, p1) => p1);
}

function genObject(line, slugger, objValue, idx) {
  const match =
    /^(#+\s+)(.+?)(\s*\{(?:\/\*|#)([^\}\*\/]+)(?:\*\/)?\}\s*)?$/.exec(line);
  const before = match[1] + match[2];
  const existingId = match[4];
  const title = match[2];
  const proc = modules
    .unified()
    .use(modules.remarkParse)
    .use(modules.remarkSlug);
  const tree = proc.runSync(proc.parse(before));
  const head = tree.children[0];

  if (head.type !== 'heading') {
    return null;
  }

  if (title === 'シナリオ実行') {
    console.log();
  }

  const result = {
    objectID: `${idx++}-${objValue.url}#${existingId}`,
    url: `${objValue.url}#${existingId}`,
    content: null,
    hierarchy: {...objValue.hierarchy},
  };
  switch (head.depth) {
    case 2:
      result.type = 'lvl2';
      result.hierarchy.lvl2 = title;
      break;
    case 3:
      result.type = 'lvl3';
      result.hierarchy.lvl3 = title;
      break;
    case 4:
      result.type = 'lvl4';
      result.hierarchy.lvl4 = title;
      break;
    case 5:
      result.type = 'lvl5';
      result.hierarchy.lvl5 = title;
    case 6:
      result.type = 'lvl6';
      result.hierarchy.lvl6 = title;
      break;
    default:
      return null;
  }

  return result;
}

function generateRecords(lines, objValue) {
  // Sluggers should be per file
  const slugger = new GithubSlugger();
  let inCode = false;
  const results = [];
  lines.forEach((line) => {
    // Ignore code blocks
    if (line.startsWith('```')) {
      inCode = !inCode;
      return;
    }
    if (inCode) {
      return;
    }

    // check if we're a header at all
    if (!line.startsWith('#')) {
      return line;
    }

    const generateObject = genObject(
      line,
      slugger,
      {...objValue},
      results.length + 1
    );
    if (generateObject !== null) {
      // results.splice(0, 0, generateObject);
      results.push(generateObject);
    }
  });

  return results;
}

async function main(sidebarContent, outputContentPath) {
  if (sidebarContent === undefined || sidebarContent === null) {
    return;
  }
  if (
    !(
      sidebarContent.hasOwnProperty('title') &&
      sidebarContent.hasOwnProperty('path')
    )
  ) {
    return;
  }

  const [unifiedMod, remarkParseMod, remarkSlugMod] = await Promise.all([
    import('unified'),
    import('remark-parse'),
    import('remark-slug'),
  ]);
  const unified = unifiedMod.unified;
  const remarkParse = remarkParseMod.default;
  const remarkSlug = remarkSlugMod.default;
  modules = {unified, remarkParse, remarkSlug};

  const indexFiles = [];
  const updatedRecords = [];
  const base_url = 'http://localhost:3000';
  const title_lvl0 = sidebarContent['title'];

  sidebarContent.routes
    .filter(
      (route) => route.hasOwnProperty('title') && route.hasOwnProperty('path')
    )
    .forEach((route) => {
      indexFiles.push(
        `src/content${route.path === '/learn' ? '/index' : route.path}.md`
      );
      updatedRecords.push({
        objectID: `0-${base_url}${route.path}`,
        url: `${base_url}${route.path}`,
        content: null,
        type: 'lvl1',
        hierarchy: {
          lvl0: title_lvl0,
          lvl1: route.title,
          lvl2: null,
          lvl3: null,
          lvl4: null,
          lvl5: null,
          lvl6: null,
        },
      });

      if (route.hasOwnProperty('routes')) {
        route.routes.forEach((childRoute) => {
          indexFiles.push(`src/content${childRoute.path}.md`);
          updatedRecords.push({
            objectID: `0-${base_url}${childRoute.path}`,
            url: `${base_url}${childRoute.path}`,
            content: null,
            type: 'lvl1',
            hierarchy: {
              lvl0: title_lvl0,
              lvl1: childRoute.title,
              lvl2: null,
              lvl3: null,
              lvl4: null,
              lvl5: null,
              lvl6: null,
            },
          });
        });
      }
    });

  indexFiles.forEach((file, i) => {
    if (!(file.endsWith('.md') || file.endsWith('.mdx'))) {
      return;
    }

    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const generatedRecords = generateRecords(lines, updatedRecords[i]);
    updatedRecords.push(...generatedRecords);
  });

  fs.writeFileSync(outputContentPath, JSON.stringify(updatedRecords, null, 2));
}

module.exports = main;
