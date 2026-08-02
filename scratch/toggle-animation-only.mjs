import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HF_BASE = path.join(__dirname, '..', 'hyperframes');

const COMPOSITIONS = ['branding', 'saas', 'web', 'ai', 'motion', 'ecommerce'];

const CLEAN_CSS_BLOCK = `
    /* ── PURE ANIMATION-ONLY OVERRIDES (NO TEXTS OR TITLES) ── */
    .panel-left, .status-bar, .v-rule, .h-rule, .ghost-B, .ghost-W, .ghost-S, .ghost-A, .ghost-M, .counter, .ghost-text, .ghost-letter, .slide-counter {
      display: none !important;
    }
    .panel-right {
      width: 100% !important;
      left: 0 !important;
      background: #050505 !important;
      border: none !important;
    }
    .brand-visual, .canvas-container, .browser-frame, .network-container, .workbench, .ecommerce-container, .product-showcase {
      left: 50% !important;
      top: 50% !important;
      transform: translate(-50%, -50%) !important;
      margin: 0 !important;
    }
`;

function processFile(compName, mode) {
  const filePath = path.join(HF_BASE, compName, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  
  const hasOverride = html.includes('PURE ANIMATION-ONLY OVERRIDES');

  if (mode === 'clean') {
    if (hasOverride) {
      console.log(`ℹ️ '${compName}' is already in clean animation-only mode.`);
      return;
    }
    
    // Inject clean CSS block right before the closing </style> tag
    html = html.replace('</style>', `${CLEAN_CSS_BLOCK}</style>`);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Set '${compName}' to clean animation-only mode.`);
  } else if (mode === 'editorial') {
    if (!hasOverride) {
      console.log(`ℹ️ '${compName}' is already in full editorial mode.`);
      return;
    }

    // Remove the clean CSS block
    const regex = /\/\*\s*──\s*PURE\s*ANIMATION-ONLY\s*OVERRIDES[\s\S]*?\*\//;
    html = html.replace(regex, '');
    // Clean up empty lines or double style tags
    html = html.replace(/\s*<\/style>/, '\n  </style>');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Restored '${compName}' to full editorial mode.`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'clean'; // 'clean' or 'editorial'

  if (mode !== 'clean' && mode !== 'editorial') {
    console.error("❌ Invalid mode. Use 'clean' or 'editorial'.");
    process.exit(1);
  }

  console.log(`🎬 Toggling HyperFrames templates to: [${mode.toUpperCase()}] mode`);
  console.log(`=================================================================\n`);

  COMPOSITIONS.forEach(comp => processFile(comp, mode));
  console.log("\nDone! You can now run 'node render-all-videos.mjs' to compile this layout.");
}

main();
