# Image Generation for Stories

## Quick Setup

1. **Get free Unsplash API key** (takes 2 minutes):
   - Go to https://unsplash.com/developers
   - Create account/login
   - Create new app
   - Copy your "Access Key"

2. **Edit the script**:
   - Open `scripts/generate-story-images.js`
   - Replace `YOUR_UNSPLASH_ACCESS_KEY` with your actual key

3. **Run the script**:
   ```bash
   node scripts/generate-story-images.js
   ```

## What This Does

✅ **Downloads images once** - they become part of your codebase
✅ **No runtime API calls** - website works offline after generation
✅ **Completely free** - Unsplash has no usage limits
✅ **High quality** - curated, professional photos
✅ **Proper attribution** - generates attribution file automatically

## Generated Structure

```
public/images/stories/
├── 01-first-date/
│   ├── truck.jpg
│   ├── restaurant.jpg
│   └── lake.jpg
├── 02-second-date/
│   ├── dogs-playing.jpg
│   ├── nature-walk.jpg
│   └── cats.jpg
└── attributions.json
```

## Usage in Stories

After running the script, add images to your MDX files like this:

```mdx
# First Date

<img src="/images/stories/01-first-date/truck.jpg" alt="Green pickup truck" className="story-image" />

Once upon a time, there was a man named Ryan...
```

## Customization

Edit `STORY_IMAGES` in the script to:
- Change search terms
- Add more images per story
- Modify filenames
- Update alt text

## Advanced Options

```bash
# Just download images
node scripts/generate-story-images.js

# Download images AND automatically update MDX files
node scripts/generate-story-images.js --update-mdx
```

## CSS for Story Images

Add to your `globals.css`:

```css
.story-image {
  width: 100%;
  max-width: 600px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
```

## Benefits of This Approach

1. **Static Generation**: Images are downloaded once, become part of your repo
2. **No Runtime Dependencies**: Website works even if Unsplash goes down
3. **Fast Loading**: Images are served from your domain
4. **Version Control**: Images are tracked in git
5. **Offline Development**: No internet needed after initial generation
6. **Cost**: Completely free forever

This is much better than runtime API calls because your website is self-contained and doesn't depend on external services.
