const fs = require('fs').promises;
const path = require('path');

// Map each story to its hero image
const STORY_HERO_IMAGES = {
  '01-first-date': { filename: 'lake.jpg', alt: 'Beautiful lake view' },
  '02-second-date': { filename: 'dogs-playing.jpg', alt: 'Dogs playing together' },
  '03-fixing-the-car-fuse': { filename: 'car-fuse.jpg', alt: 'Car fuse box' },
  '04-dinner-surprise': { filename: 'cooking.jpg', alt: 'Cooking a special dinner' },
  '05-wood-stove': { filename: 'wood-stove.jpg', alt: 'Cozy wood burning stove' },
  '06-balto-fleas': { filename: 'dog-bath.jpg', alt: 'Giving a dog a bath' },
  '07-grammys-christmas': { filename: 'christmas-tree.jpg', alt: 'Decorated Christmas tree' },
  '08-girlfriend-at-work': { filename: 'workplace.jpg', alt: 'Workplace scene' },
  '09-the-baby': { filename: 'announcement.jpg', alt: 'Special announcement' },
  '10-picture-day': { filename: 'photo-session.jpg', alt: 'Photo session' },
  '11-tortoises': { filename: 'tortoise.jpg', alt: 'Pet tortoise' },
  '12-gone-for-the-weekend': { filename: 'airport.jpg', alt: 'Airport departure' },
  '13-puppies': { filename: 'puppies.jpg', alt: 'Adorable puppies' },
  '14-hot-water-heater': { filename: 'water-heater.jpg', alt: 'Water heater' },
  '15-telling-dad': { filename: 'family-call.jpg', alt: 'Family phone call' },
  '16-carpet-cleaning': { filename: 'carpet-cleaner.jpg', alt: 'Carpet cleaning' },
  '17-screen-door': { filename: 'screen-door.jpg', alt: 'Screen door' },
  '18-the-rings': { filename: 'rings.jpg', alt: 'Wedding rings' },
  '19-plumbing-issue': { filename: 'plumbing.jpg', alt: 'Plumbing work' },
  '20-bathroom-repairs': { filename: 'bathroom-repair.jpg', alt: 'Bathroom repairs' },
  '21-easter-eggs': { filename: 'easter-eggs.jpg', alt: 'Colorful Easter eggs' },
  '22-birthday': { filename: 'purple-flowers.jpg', alt: 'Beautiful purple flowers' },
  '23-20-week-ultrasound': { filename: 'ultrasound.jpg', alt: 'Ultrasound image' },
  '24-the-death': { filename: 'stars.jpg', alt: 'Peaceful starry night' },
};

const IMPORT_STATEMENT = "import HeroImage from '../../../components/HeroImage'";

async function addHeroImageToStory(storySlug) {
  const storyPath = path.join(__dirname, '..', 'app', 'stories', storySlug, 'page.mdx');
  
  try {
    let content = await fs.readFile(storyPath, 'utf-8');
    
    // Check if HeroImage import already exists
    if (content.includes('HeroImage')) {
      console.log(`⏭️  Skipped: ${storySlug} (already has HeroImage)`);
      return false;
    }
    
    const heroImage = STORY_HERO_IMAGES[storySlug];
    if (!heroImage) {
      console.log(`⚠️  No hero image defined for: ${storySlug}`);
      return false;
    }
    
    // Find the first heading (title)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (!titleMatch) {
      console.log(`⚠️  No title found in: ${storySlug}`);
      return false;
    }
    
    const titleLine = titleMatch[0];
    const titleIndex = content.indexOf(titleLine);
    
    // Add import at the top if not already there
    if (!content.includes(IMPORT_STATEMENT)) {
      // Find where to insert import (after any existing imports or at the top)
      const lastImportMatch = content.match(/^import .+ from .+$/gm);
      if (lastImportMatch) {
        const lastImport = lastImportMatch[lastImportMatch.length - 1];
        const lastImportIndex = content.lastIndexOf(lastImport);
        const insertPos = lastImportIndex + lastImport.length;
        content = content.slice(0, insertPos) + '\n' + IMPORT_STATEMENT + content.slice(insertPos);
      } else {
        content = IMPORT_STATEMENT + '\n\n' + content;
      }
    }
    
    // Re-find title position after potential import insertion
    const newTitleIndex = content.indexOf(titleLine);
    const afterTitlePos = newTitleIndex + titleLine.length;
    
    // Create hero image component
    const imagePath = `/images/stories/${storySlug}/${heroImage.filename}`;
    const heroImageComponent = `\n\n<HeroImage src="${imagePath}" alt="${heroImage.alt}" />\n`;
    
    // Insert hero image right after the title
    content = content.slice(0, afterTitlePos) + heroImageComponent + content.slice(afterTitlePos);
    
    // Write back to file
    await fs.writeFile(storyPath, content, 'utf-8');
    console.log(`✅ Updated: ${storySlug}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error processing ${storySlug}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('📸 Adding hero images to stories...\n');
  
  const storyKeys = Object.keys(STORY_HERO_IMAGES);
  let updated = 0;
  
  for (const storySlug of storyKeys) {
    const success = await addHeroImageToStory(storySlug);
    if (success) updated++;
  }
  
  console.log(`\n🎉 Complete! Successfully updated ${updated}/${storyKeys.length} stories`);
}

main().catch(console.error);
