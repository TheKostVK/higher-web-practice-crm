import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import {defineConfig, globalIgnores} from 'eslint/config';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(projectRoot, 'src');
const sourceExtensions = ['', '.ts', '.tsx', '.js', '.jsx', '.json'];
const indexFiles = ['index.ts', 'index.tsx', 'index.js', 'index.jsx'];
const fsdLayers = new Set(['app', 'processes', 'pages', 'widgets', 'features', 'entities']);

const stripQuery = (source) => source.split('?')[0];

const resolveImportPath = (source, filename) => {
  const cleanSource = stripQuery(source);
  let importPath;

  if (cleanSource.startsWith('@/')) {
    importPath = path.join(srcRoot, cleanSource.slice(2));
  } else if (cleanSource.startsWith('./') || cleanSource.startsWith('../')) {
    importPath = path.resolve(path.dirname(filename), cleanSource);
  } else {
    return null;
  }

  for (const extension of sourceExtensions) {
    const candidate = `${importPath}${extension}`;

    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  if (fs.existsSync(importPath) && fs.statSync(importPath).isDirectory()) {
    for (const indexFile of indexFiles) {
      const candidate = path.join(importPath, indexFile);

      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  return null;
};

const getPublicApiRoot = (filename) => {
  const relativePath = path.relative(srcRoot, filename);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return null;
  }

  const segments = relativePath.split(path.sep);
  const [layer] = segments;

  if (layer === 'shared' && segments[1] === 'ui' && segments[2]) {
    return path.join(srcRoot, layer, segments[1], segments[2]);
  }

  if (layer === 'pages' && segments[1] === 'layout' && segments[2]) {
    return path.join(srcRoot, layer, segments[1], segments[2]);
  }

  if (layer === 'app' && segments[1]) {
    return path.join(srcRoot, layer);
  }

  if (fsdLayers.has(layer) && segments[1]) {
    if (segments.length === 2 && path.extname(segments[1])) {
      return path.join(srcRoot, layer, segments[1]);
    }

    return path.join(srcRoot, layer, segments[1]);
  }

  return null;
};

const isPublicApiFile = (filename, publicApiRoot) => {
  if (filename === publicApiRoot && fs.existsSync(publicApiRoot) && fs.statSync(publicApiRoot).isFile()) {
    return true;
  }

  const relativePath = path.relative(publicApiRoot, filename);

  return indexFiles.includes(relativePath);
};

const publicApiImportsPlugin = {
  rules: {
    'only-public-api': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow imports from internal module files outside of their public API.',
        },
        messages: {
          onlyPublicApi: 'Импортируй модуль через public API: {{importPath}}',
          noSelfPublicApi:
            'Не импортируй public API своего же модуля. Используй прямой относительный импорт внутри {{importPath}}',
        },
        schema: [],
      },
      create(context) {
        const filename = context.filename;

        return {
          ImportDeclaration(node) {
            checkSource(node.source, context, filename);
          },
          ExportNamedDeclaration(node) {
            checkSource(node.source, context, filename);
          },
          ExportAllDeclaration(node) {
            checkSource(node.source, context, filename);
          },
        };
      },
    },
  },
};

const checkSource = (sourceNode, context, filename) => {
  if (!sourceNode?.value) {
    return;
  }

  const resolvedPath = resolveImportPath(sourceNode.value, filename);

  if (!resolvedPath) {
    return;
  }

  const importerRoot = getPublicApiRoot(filename);
  const importedRoot = getPublicApiRoot(resolvedPath);

  if (!importedRoot) {
    return;
  }

  const importPath = path.relative(srcRoot, importedRoot).split(path.sep).join('/');

  if (importerRoot === importedRoot) {
    if (filename !== resolvedPath && isPublicApiFile(resolvedPath, importedRoot)) {
      context.report({
        node: sourceNode,
        messageId: 'noSelfPublicApi',
        data: {
          importPath: `@/${importPath}`,
        },
      });
    }

    return;
  }

  if (isPublicApiFile(resolvedPath, importedRoot)) {
    return;
  }

  context.report({
    node: sourceNode,
    messageId: 'onlyPublicApi',
    data: {
      importPath: `@/${importPath}`,
    },
  });
};

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'public-api-imports': publicApiImportsPlugin,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'public-api-imports/only-public-api': 'error',
      indent: ['error', 4],
    },
  },
]);
