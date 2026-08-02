// scratch/generate-crisp-lotties.js
import fs from "fs";
import path from "path";

const workspace = "d:\\Backup\\Download Folder\\hasanul-portfolio";
const destDir = path.join(workspace, "public", "lottie");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// ───── Premium Easing Curve Declarations ─────
// We use Premium Easing: [0.4, 0, 0.2, 1] for entrances
const premiumEase = {
  o: { x: [0.4], y: [0] },
  i: { x: [0.2], y: [1] }
};
// Snappy Ease: [0.2, 0, 0, 1]
const snappyEase = {
  o: { x: [0.2], y: [0] },
  i: { x: [0.0], y: [1] }
};
// Back Settle (Overshoot): [0.175, 0.885, 0.32, 1.275]
const bounceEase = {
  o: { x: [0.175], y: [0.885] },
  i: { x: [0.32], y: [1.275] }
};

// ───── 1. TIME.JSON (Clock with rotating hands) ─────
const timeLottie = {
  v: "5.5.7", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Clock", ddd: 0, assets: [],
  layers: [
    // Center Pin Circle
    {
      ddd: 0, ind: 1, ty: 4, nm: "Center Pin", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "el", d: 1, s: { a: 0, k: [6, 6] }, p: { a: 0, k: [0, 0] }, nm: "Pin"
        },
        {
          ty: "fl", c: { a: 0, k: [0.78, 0.66, 0.43, 1] }, o: { a: 0, k: 100 }, nm: "Fill"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Long Hand (Rotating)
    {
      ddd: 0, ind: 2, ty: 4, nm: "Long Hand", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], ...premiumEase },
            { t: 60, s: [360] }
          ]
        },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 15, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [3, 30] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 1.5 }, nm: "Hand Shape"
        },
        {
          ty: "fl", c: { a: 0, k: [0.78, 0.66, 0.43, 1] }, o: { a: 0, k: 100 }, nm: "Fill"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Short Hand (Rotating slower)
    {
      ddd: 0, ind: 3, ty: 4, nm: "Short Hand", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [45], ...premiumEase },
            { t: 60, s: [75] }
          ]
        },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 10, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [3.5, 20] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 1.5 }, nm: "Hand Shape"
        },
        {
          ty: "fl", c: { a: 0, k: [0.78, 0.66, 0.43, 0.7] }, o: { a: 0, k: 100 }, nm: "Fill"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Clock Outline
    {
      ddd: 0, ind: 4, ty: 4, nm: "Clock Rim", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0, 100], ...bounceEase },
            { t: 18, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "el", d: 1, s: { a: 0, k: [76, 76] }, p: { a: 0, k: [0, 0] }, nm: "Rim"
        },
        {
          ty: "st", c: { a: 0, k: [0.78, 0.66, 0.43, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3.5 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    }
  ]
};

// ───── 2. PROJECTS.JSON (Folder with rising cards) ─────
const projectsLottie = {
  v: "5.5.7", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Projects", ddd: 0, assets: [],
  layers: [
    // Card 3 (Back)
    {
      ddd: 0, ind: 1, ty: 4, nm: "Card 3", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 15, s: [0], ...premiumEase },
            { t: 27, s: [100] }
          ]
        },
        r: { a: 0, k: 8 },
        p: {
          a: 1,
          k: [
            { t: 15, s: [50, 68, 0], ...premiumEase },
            { t: 32, s: [50, 38, 0] }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [80, 80, 100] }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [36, 44] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 4 }, nm: "Rect"
        },
        {
          ty: "fl", c: { a: 0, k: [0.78, 0.66, 0.43, 0.4] }, o: { a: 0, k: 100 }, nm: "Fill"
        },
        {
          ty: "st", c: { a: 0, k: [0.78, 0.66, 0.43, 0.8] }, o: { a: 0, k: 100 }, w: { a: 0, k: 1.5 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Card 2 (Middle)
    {
      ddd: 0, ind: 2, ty: 4, nm: "Card 2", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 8, s: [0], ...premiumEase },
            { t: 20, s: [100] }
          ]
        },
        r: { a: 0, k: -6 },
        p: {
          a: 1,
          k: [
            { t: 8, s: [50, 68, 0], ...premiumEase },
            { t: 25, s: [50, 42, 0] }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [88, 88, 100] }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [36, 44] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 4 }, nm: "Rect"
        },
        {
          ty: "fl", c: { a: 0, k: [0.78, 0.66, 0.43, 0.6] }, o: { a: 0, k: 100 }, nm: "Fill"
        },
        {
          ty: "st", c: { a: 0, k: [0.78, 0.66, 0.43, 0.9] }, o: { a: 0, k: 100 }, w: { a: 0, k: 1.5 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Card 1 (Front)
    {
      ddd: 0, ind: 3, ty: 4, nm: "Card 1", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], ...premiumEase },
            { t: 12, s: [100] }
          ]
        },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [50, 68, 0], ...premiumEase },
            { t: 18, s: [50, 48, 0] }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [36, 44] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 4 }, nm: "Rect"
        },
        {
          ty: "fl", c: { a: 0, k: [0.78, 0.66, 0.43, 1] }, o: { a: 0, k: 100 }, nm: "Fill"
        },
        {
          ty: "st", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Front Folder Lip
    {
      ddd: 0, ind: 4, ty: 4, nm: "Folder Base", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 72, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0, 100], ...bounceEase },
            { t: 14, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [72, 24] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 3 }, nm: "Tray"
        },
        {
          ty: "st", c: { a: 0, k: [0.78, 0.66, 0.43, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    }
  ]
};

// ───── 3. STANDARD.JSON (Shield/Emblem self-drawing with Star) ─────
const standardLottie = {
  v: "5.5.7", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Standard", ddd: 0, assets: [],
  layers: [
    // Center Star
    {
      ddd: 0, ind: 1, ty: 4, nm: "Center Star", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 15, s: [0], ...premiumEase },
            { t: 24, s: [100] }
          ]
        },
        r: {
          a: 1,
          k: [
            { t: 15, s: [-90], ...bounceEase },
            { t: 36, s: [0] }
          ]
        },
        p: { a: 0, k: [50, 48, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 15, s: [0, 0, 100], ...bounceEase },
            { t: 32, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        // Star custom path approximate
        {
          ty: "sr", d: 1,
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 0 },
          ir: { a: 0, k: 9 },
          is: { a: 0, k: 0 },
          or: { a: 0, k: 20 },
          os: { a: 0, k: 0 },
          pt: { a: 0, k: 5 },
          nm: "Polystar", mn: "ADBE Vector Shape - Star"
        },
        {
          ty: "fl", c: { a: 0, k: [0.78, 0.66, 0.43, 1] }, o: { a: 0, k: 100 }, nm: "Fill"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Shield Outline (Self-drawing)
    {
      ddd: 0, ind: 2, ty: 4, nm: "Shield Outline", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        // Hexagon/Shield Shape
        {
          ty: "sr", d: 1,
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 90 },
          ir: { a: 0, k: 34 },
          is: { a: 0, k: 0 },
          or: { a: 0, k: 38 },
          os: { a: 0, k: 0 },
          pt: { a: 0, k: 6 },
          nm: "Shield Base", mn: "ADBE Vector Shape - Star"
        },
        {
          ty: "st", c: { a: 0, k: [0.78, 0.66, 0.43, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3.5 }, nm: "Stroke"
        },
        // Trim Paths to self-draw
        {
          ty: "tm",
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: [
              { t: 0, s: [0], ...premiumEase },
              { t: 24, s: [100] }
            ]
          },
          o: { a: 0, k: 0 },
          m: 1,
          nm: "Trim Paths"
        }
      ],
      ip: 0, op: 60, st: 0
    }
  ]
};

// ───── 4. RATING.JSON (Star popping and rotating) ─────
const ratingLottie = {
  v: "5.5.7", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Rating", ddd: 0, assets: [],
  layers: [
    // Pulsing Star
    {
      ddd: 0, ind: 1, ty: 4, nm: "Star", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [-180], ...premiumEase },
            { t: 30, s: [0], ...premiumEase },
            { t: 60, s: [15] }
          ]
        },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0, 100], ...bounceEase },
            { t: 24, s: [115, 115, 100], ...premiumEase },
            { t: 36, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "sr", d: 1,
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 0 },
          ir: { a: 0, k: 16 },
          is: { a: 0, k: 0 },
          or: { a: 0, k: 38 },
          os: { a: 0, k: 0 },
          pt: { a: 0, k: 5 },
          nm: "Star Shape"
        },
        {
          ty: "fl", c: { a: 0, k: [0.78, 0.66, 0.43, 1] }, o: { a: 0, k: 100 }, nm: "Fill"
        },
        {
          ty: "st", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 50 }, w: { a: 0, k: 1.5 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    }
  ]
};

// ───── 5. DISCOVERY.JSON (Chat bubble + active pulse lines) ─────
const discoveryLottie = {
  v: "5.5.7", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Discovery", ddd: 0, assets: [],
  layers: [
    // Pulse Circle 2
    {
      ddd: 0, ind: 1, ty: 4, nm: "Pulse 2", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 15, s: [100], ...premiumEase },
            { t: 45, s: [0] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 46, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 15, s: [70, 70, 100], ...premiumEase },
            { t: 45, s: [170, 170, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "el", d: 1, s: { a: 0, k: [30, 30] }, p: { a: 0, k: [0, 0] }, nm: "Circle"
        },
        {
          ty: "st", c: { a: 0, k: [1.0, 0.3, 0.0, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Pulse Circle 1
    {
      ddd: 0, ind: 2, ty: 4, nm: "Pulse 1", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [100], ...premiumEase },
            { t: 30, s: [0] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 46, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [70, 70, 100], ...premiumEase },
            { t: 30, s: [170, 170, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "el", d: 1, s: { a: 0, k: [30, 30] }, p: { a: 0, k: [0, 0] }, nm: "Circle"
        },
        {
          ty: "st", c: { a: 0, k: [1.0, 0.3, 0.0, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Chat Bubble Body
    {
      ddd: 0, ind: 3, ty: 4, nm: "Bubble", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 46, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0, 100], ...bounceEase },
            { t: 15, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        // Rounded bubble body
        {
          ty: "rc", d: 1, s: { a: 0, k: [56, 40] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 8 }, nm: "Body"
        },
        {
          ty: "fl", c: { a: 0, k: [1.0, 0.3, 0.0, 1] }, o: { a: 0, k: 100 }, nm: "Fill"
        },
        {
          ty: "st", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2.5 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Chat Bubble Tail
    {
      ddd: 0, ind: 4, ty: 4, nm: "Tail", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 45 },
        p: { a: 0, k: [42, 66, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 4, s: [0, 0, 100], ...bounceEase },
            { t: 18, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [12, 12] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 2 }, nm: "Tail Shape"
        },
        {
          ty: "fl", c: { a: 0, k: [1.0, 0.3, 0.0, 1] }, o: { a: 0, k: 100 }, nm: "Fill"
        },
        {
          ty: "st", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2.5 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    }
  ]
};

// ───── 6. PROPOSAL.JSON (Document self-drawing with lines) ─────
const proposalLottie = {
  v: "5.5.7", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Proposal", ddd: 0, assets: [],
  layers: [
    // Text Line 3 (Bottom)
    {
      ddd: 0, ind: 1, ty: 4, nm: "Line 3", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 18, s: [0], ...premiumEase },
            { t: 26, s: [100] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 62, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 18, s: [0, 100, 100], ...premiumEase },
            { t: 32, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [32, 3] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 0.5 }, nm: "Line"
        },
        {
          ty: "fl", c: { a: 0, k: [1.0, 0.3, 0.0, 0.7] }, o: { a: 0, k: 100 }, nm: "Fill"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Text Line 2 (Middle)
    {
      ddd: 0, ind: 2, ty: 4, nm: "Line 2", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 12, s: [0], ...premiumEase },
            { t: 20, s: [100] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 12, s: [0, 100, 100], ...premiumEase },
            { t: 26, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [40, 3] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 0.5 }, nm: "Line"
        },
        {
          ty: "fl", c: { a: 0, k: [1.0, 0.3, 0.0, 0.7] }, o: { a: 0, k: 100 }, nm: "Fill"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Text Line 1 (Top / Bold Header)
    {
      ddd: 0, ind: 3, ty: 4, nm: "Line 1", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 6, s: [0], ...premiumEase },
            { t: 14, s: [100] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [44, 38, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 6, s: [0, 100, 100], ...premiumEase },
            { t: 20, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [28, 4.5] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 0.5 }, nm: "Line"
        },
        {
          ty: "fl", c: { a: 0, k: [1.0, 0.3, 0.0, 1] }, o: { a: 0, k: 100 }, nm: "Fill"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Paper Outline
    {
      ddd: 0, ind: 4, ty: 4, nm: "Paper Base", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "rc", d: 1, s: { a: 0, k: [52, 66] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 4 }, nm: "Outline"
        },
        {
          ty: "st", c: { a: 0, k: [1.0, 0.3, 0.0, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3.5 }, nm: "Stroke"
        },
        // Trim Paths to self-draw
        {
          ty: "tm",
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: [
              { t: 0, s: [0], ...premiumEase },
              { t: 22, s: [100] }
            ]
          },
          o: { a: 0, k: 0 },
          m: 1,
          nm: "Trim Paths"
        }
      ],
      ip: 0, op: 60, st: 0
    }
  ]
};

// ───── 7. DESIGN.JSON (Geometric square/circle morphing) ─────
const designLottie = {
  v: "5.5.7", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Design", ddd: 0, assets: [],
  layers: [
    // Morphing Shape
    {
      ddd: 0, ind: 1, ty: 4, nm: "Morpher", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], ...premiumEase },
            { t: 30, s: [90], ...premiumEase },
            { t: 60, s: [180] }
          ]
        },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100, 100], ...bounceEase },
            { t: 30, s: [75, 75, 100], ...bounceEase },
            { t: 60, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "rc", d: 1,
          s: { a: 0, k: [52, 52] },
          p: { a: 0, k: [0, 0] },
          r: {
            a: 1,
            k: [
              { t: 0, s: [4], ...premiumEase },
              { t: 30, s: [26], ...premiumEase }, // round corner morphs to circle!
              { t: 60, s: [4] }
            ]
          },
          nm: "Morphing Box"
        },
        {
          ty: "st", c: { a: 0, k: [1.0, 0.3, 0.0, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3.5 }, nm: "Stroke"
        },
        {
          ty: "fl", c: { a: 0, k: [1.0, 0.3, 0.0, 0.15] }, o: { a: 0, k: 100 }, nm: "Fill"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Outer dashed target ring
    {
      ddd: 0, ind: 2, ty: 4, nm: "Dashed Ring", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], ...premiumEase },
            { t: 60, s: [-60] }
          ]
        },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "el", d: 1, s: { a: 0, k: [82, 82] }, p: { a: 0, k: [0, 0] }, nm: "Ring"
        },
        {
          ty: "st", c: { a: 0, k: [1.0, 0.3, 0.0, 0.4] }, o: { a: 0, k: 100 }, w: { a: 0, k: 1.5 }, nm: "Stroke"
        }
      ],
      ip: 0, op: 60, st: 0
    }
  ]
};

// ───── 8. DELIVERY.JSON (Circle outline drawing + checkmark popping) ─────
const deliveryLottie = {
  v: "5.5.7", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Delivery", ddd: 0, assets: [],
  layers: [
    // Checkmark Layer
    {
      ddd: 0, ind: 1, ty: 4, nm: "Checkmark", sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 12, s: [0], ...premiumEase },
            { t: 20, s: [100] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [46, 51, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 12, s: [0, 0, 100], ...bounceEase },
            { t: 28, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        // Vector path for checkmark [ \_ ]
        {
          ty: "sh",
          ks: {
            a: 0,
            k: {
              i: [[0, 0], [0, 0], [0, 0]],
              o: [[0, 0], [0, 0], [0, 0]],
              v: [[-12, -2], [-3, 7], [14, -10]],
              c: false
            }
          },
          nm: "Path"
        },
        {
          ty: "st", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 4.5 }, nm: "Stroke"
        },
        // Trim paths to draw checkmark
        {
          ty: "tm",
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: [
              { t: 12, s: [0], ...premiumEase },
              { t: 30, s: [100] }
            ]
          },
          o: { a: 0, k: 0 },
          m: 1,
          nm: "Trim Paths"
        }
      ],
      ip: 0, op: 60, st: 0
    },
    // Circle Outer Rim
    {
      ddd: 0, ind: 2, ty: 4, nm: "Outer Rim", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "el", d: 1, s: { a: 0, k: [76, 76] }, p: { a: 0, k: [0, 0] }, nm: "Rim"
        },
        {
          ty: "st", c: { a: 0, k: [1.0, 0.3, 0.0, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3.5 }, nm: "Stroke"
        },
        {
          ty: "fl", c: { a: 0, k: [1.0, 0.3, 0.0, 0.15] }, o: { a: 0, k: 100 }, nm: "Fill"
        },
        // Trim Paths to self-draw
        {
          ty: "tm",
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: [
              { t: 0, s: [0], ...premiumEase },
              { t: 20, s: [100] }
            ]
          },
          o: { a: 0, k: 0 },
          m: 1,
          nm: "Trim Paths"
        }
      ],
      ip: 0, op: 60, st: 0
    }
  ]
};

// Write out all premium generated Lottie JSONs
const syncAll = () => {
  console.log("=== Premium Lottie JSON Generation Suite ===");
  
  const files = {
    "time.json": timeLottie,
    "projects.json": projectsLottie,
    "standard.json": standardLottie,
    "rating.json": ratingLottie,
    "discovery.json": discoveryLottie,
    "proposal.json": proposalLottie,
    "design.json": designLottie,
    "delivery.json": deliveryLottie
  };

  for (const [filename, lottieData] of Object.entries(files)) {
    const destPath = path.join(destDir, filename);
    fs.writeFileSync(destPath, JSON.stringify(lottieData, null, 2));
    console.log(`[Generated] High-fidelity custom Lottie: ${filename} (Size: ${fs.statSync(destPath).size} bytes)`);
  }

  console.log("=== All high-fidelity custom Lottie icons deployed! ===");
};

syncAll();
