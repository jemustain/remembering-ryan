#!/usr/bin/env python3
"""
Generate a photo mosaic for Remembering Ryan.
Uses story images as tiles, with limits on repetition.
Excludes ryans-eye.jpg from tile pool.
Uses quadrant-based color matching for better portrait fidelity.
"""

import os
import sys
import numpy as np
from PIL import Image
from pathlib import Path

# Config
TILE_SIZE = 48  # Each tile in pixels
OUTPUT_SIZE = 2400  # Final image 2400x2400
GRID_SIZE = OUTPUT_SIZE // TILE_SIZE  # 50x50 grid = 2500 tiles
MAX_REPEATS = 40  # Max times any single tile can appear
TINT_STRENGTH = 0.20  # How much to tint tiles toward target (0=none, 1=full)
EXCLUDED_FILENAMES = {'ryans-eye.jpg'}
ADJACENCY_PENALTY = 50.0  # Penalty for placing same tile next to itself

PROJECT_ROOT = Path(__file__).parent.parent
IMAGES_DIR = PROJECT_ROOT / 'public' / 'images'
STORIES_DIR = IMAGES_DIR / 'stories'
TARGET_IMAGE = IMAGES_DIR / 'ryan-portraits' / 'ryan_pnw_4.jpg'
OUTPUT_PATH = IMAGES_DIR / 'mosaic' / 'mosaic-hero.jpg'


def collect_tile_images():
    """Collect all usable tile images."""
    tiles = []
    for root, dirs, files in os.walk(STORIES_DIR):
        for f in files:
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                if f.lower() not in EXCLUDED_FILENAMES:
                    tiles.append(os.path.join(root, f))
    
    for d in ['hero', 'ryan-portraits']:
        dirpath = IMAGES_DIR / d
        if dirpath.exists():
            for f in os.listdir(dirpath):
                if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                    tiles.append(str(dirpath / f))
    
    author = IMAGES_DIR / 'julie-author.jpg'
    if author.exists():
        tiles.append(str(author))
    
    print(f"Found {len(tiles)} tile images (excluded: {EXCLUDED_FILENAMES})")
    return tiles


def load_and_resize(path, size):
    img = Image.open(path).convert('RGB')
    img = img.resize((size, size), Image.LANCZOS)
    return img


def quadrant_colors(arr):
    """Get average colors for 4 quadrants of an image array. Returns shape (12,)."""
    h, w = arr.shape[:2]
    mh, mw = h // 2, w // 2
    q1 = arr[:mh, :mw].mean(axis=(0, 1))
    q2 = arr[:mh, mw:].mean(axis=(0, 1))
    q3 = arr[mh:, :mw].mean(axis=(0, 1))
    q4 = arr[mh:, mw:].mean(axis=(0, 1))
    return np.concatenate([q1, q2, q3, q4])


def generate_mosaic():
    print("Loading target image...")
    target = load_and_resize(str(TARGET_IMAGE), OUTPUT_SIZE)
    target_arr = np.array(target)
    
    print("Loading tile images...")
    tile_paths = collect_tile_images()
    if not tile_paths:
        print("ERROR: No tile images found!")
        sys.exit(1)
    
    tile_images = []
    tile_features = []  # Quadrant-based features
    for p in tile_paths:
        try:
            img = load_and_resize(p, TILE_SIZE)
            tile_images.append(img)
            tile_features.append(quadrant_colors(np.array(img, dtype=np.float64)))
        except Exception as e:
            print(f"  Warning: skipping {p}: {e}")
    
    tile_features = np.array(tile_features)  # Shape: (N, 12)
    n_tiles = len(tile_images)
    print(f"Loaded {n_tiles} tiles")
    
    usage_count = np.zeros(n_tiles, dtype=int)
    
    # Build placement grid (row-major, so we can check neighbors)
    grid = np.full((GRID_SIZE, GRID_SIZE), -1, dtype=int)
    
    print(f"Building {GRID_SIZE}x{GRID_SIZE} mosaic ({GRID_SIZE*GRID_SIZE} cells)...")
    mosaic = Image.new('RGB', (OUTPUT_SIZE, OUTPUT_SIZE))
    
    # Process in raster order for neighbor checking
    count = 0
    for r in range(GRID_SIZE):
        for c in range(GRID_SIZE):
            y1 = r * TILE_SIZE
            y2 = y1 + TILE_SIZE
            x1 = c * TILE_SIZE
            x2 = x1 + TILE_SIZE
            
            region = target_arr[y1:y2, x1:x2].astype(np.float64)
            region_feat = quadrant_colors(region)
            
            # Distance based on quadrant matching
            distances = np.sqrt(((tile_features - region_feat) ** 2).sum(axis=1))
            
            # Penalty for overuse
            penalties = np.where(usage_count >= MAX_REPEATS, 1e9, usage_count * 1.5)
            
            # Adjacency penalty - avoid same tile next to current cell
            adj_penalty = np.zeros(n_tiles)
            for dr, dc in [(-1, 0), (0, -1), (-1, -1), (-1, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < GRID_SIZE and 0 <= nc < GRID_SIZE and grid[nr, nc] >= 0:
                    adj_penalty[grid[nr, nc]] += ADJACENCY_PENALTY
            
            adjusted = distances + penalties + adj_penalty
            best_idx = np.argmin(adjusted)
            
            mosaic.paste(tile_images[best_idx], (x1, y1))
            grid[r, c] = best_idx
            usage_count[best_idx] += 1
            count += 1
            
            if count % 500 == 0:
                print(f"  Placed {count}/{GRID_SIZE*GRID_SIZE} tiles...")
    
    # Usage stats
    print("\nTile usage stats (top 10):")
    for i in np.argsort(-usage_count)[:10]:
        print(f"  {os.path.basename(tile_paths[i])}: {usage_count[i]} times")
    print(f"  Unique tiles used: {(usage_count > 0).sum()}/{n_tiles}")
    
    # Tint tiles toward target for portrait clarity
    print(f"Applying {TINT_STRENGTH*100:.0f}% color tinting...")
    mosaic_arr = np.array(mosaic, dtype=np.float64)
    blended = mosaic_arr * (1 - TINT_STRENGTH) + target_arr.astype(np.float64) * TINT_STRENGTH
    mosaic = Image.fromarray(np.clip(blended, 0, 255).astype(np.uint8))
    
    # Save
    os.makedirs(OUTPUT_PATH.parent, exist_ok=True)
    mosaic.save(str(OUTPUT_PATH), 'JPEG', quality=92)
    print(f"\nSaved mosaic to {OUTPUT_PATH}")
    print(f"Size: {os.path.getsize(OUTPUT_PATH) / 1024:.0f} KB")


if __name__ == '__main__':
    generate_mosaic()
