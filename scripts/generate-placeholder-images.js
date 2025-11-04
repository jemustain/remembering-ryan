#!/usr/bin/env node
/**
 * Placeholder Image Generator
 * Creates placeholder images for stories using Picsum (no API key needed)
 * This is a quick solution while you set up Unsplash
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Story image configuration - simplified for placeholders
const STORY_IMAGES = {
  '01-first-date': [
    { filename: 'truck.jpg', alt: 'Green pickup truck', seed: 101 },
    { filename: 'restaurant.jpg', alt: 'Restaurant interior', seed: 102 },
    { filename: 'lake.jpg', alt: 'Beautiful lake with ducks', seed: 103 }
  ],
  '02-second-date': [
    { filename: 'dogs-playing.jpg', alt: 'Dogs playing together', seed: 201 },
    { filename: 'nature-walk.jpg', alt: 'Nature walk by lake', seed: 202 }
  ],
  '03-fixing-the-car-fuse': [
    { filename: 'hardware-store.jpg', alt: 'Hardware store interior', seed: 301 },
    { filename: 'fixing-car.jpg', alt: 'Person working on car', seed: 302 }
  ],
  '04-dinner-surprise': [
    { filename: 'dinner-table.jpg', alt: 'Dinner table setup', seed: 401 },
    { filename: 'cooking.jpg', alt: 'Cooking in kitchen', seed: 402 }
  ],
  '05-wood-stove': [
    { filename: 'wood-stove.jpg', alt: 'Cozy wood burning stove', seed: 501 },
    { filename: 'firewood.jpg', alt: 'Stack of firewood', seed: 502 }
  ],
  '06-balto-fleas': [
    { filename: 'vet-visit.jpg', alt: 'Dog at veterinarian', seed: 601 },
    { filename: 'dog-bath.jpg', alt: 'Dog getting a bath', seed: 602 }
  ],
  '07-grammys-christmas': [
    { filename: 'christmas-family.jpg', alt: 'Christmas family celebration', seed: 701 },
    { filename: 'christmas-tree.jpg', alt: 'Decorated Christmas tree', seed: 702 }
  ],
  '08-girlfriend-at-work': [
    { filename: 'workplace.jpg', alt: 'Office workplace', seed: 801 }
  ],
  '09-the-baby': [
    { filename: 'announcement.jpg', alt: 'Happy pregnancy news', seed: 901 }
  ],
  '10-picture-day': [
    { filename: 'photo-session.jpg', alt: 'Family taking photos', seed: 1001 }
  ],
  '11-tortoises': [
    { filename: 'tortoise.jpg', alt: 'Pet tortoise', seed: 1101 }
  ],
  '12-gone-for-the-weekend': [
    { filename: 'airport.jpg', alt: 'Airport departure area', seed: 1201 }
  ],
  '13-puppies': [
    { filename: 'puppies.jpg', alt: 'Adorable puppies', seed: 1301 }
  ],
  '14-hot-water-heater': [
    { filename: 'water-heater.jpg', alt: 'Water heater installation', seed: 1401 }
  ],
  '15-telling-dad': [
    { filename: 'family-call.jpg', alt: 'Family video call', seed: 1501 }
  ],
  '16-carpet-cleaning': [
    { filename: 'carpet-cleaner.jpg', alt: 'Carpet cleaning machine', seed: 1601 }
  ],
  '17-screen-door': [
    { filename: 'screen-door.jpg', alt: 'Screen door being repaired', seed: 1701 }
  ],
  '18-the-rings': [
    { filename: 'rings.jpg', alt: 'Wedding rings', seed: 1801 }
  ],
  '19-plumbing-issue': [
    { filename: 'plumbing.jpg', alt: 'Plumber fixing pipes', seed: 1901 }
  ],
  '20-bathroom-repairs': [
    { filename: 'bathroom-repair.jpg', alt: 'Bathroom being repaired', seed: 2001 }
  ],
  '21-easter-eggs': [
    { filename: 'easter-eggs.jpg', alt: 'Colorful dyed Easter eggs', seed: 2101 }
  ],
  '22-birthday': [
    { filename: 'purple-flowers.jpg', alt: 'Beautiful purple flowers', seed: 2201 }
  ],
  '23-20-week-ultrasound': [
    { filename: 'ultrasound.jpg', alt: 'Baby ultrasound image', seed: 2301 }
  ],
  '24-the-death': [
    { filename: 'stars.jpg', alt: 'Peaceful night sky with stars', seed: 2401 }
  ]
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = require('fs').createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${path.basename(filepath)}`);
          resolve(true);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function generatePlaceholderImages() {
  console.log('🖼️  Generating placeholder images...\n');
  console.log('📝 Note: Using Lorem Picsum for placeholders');
  console.log('💡 Later, you can replace these with Unsplash images\n');

  const storiesDir = path.join(process.cwd(), 'public', 'images', 'stories');
  await fs.mkdir(storiesDir, { recursive: true });

  let totalImages = 0;
  let successfulDownloads = 0;

  for (const [storySlug, images] of Object.entries(STORY_IMAGES)) {
    console.log(`📚 Processing story: ${storySlug}`);
    
    const storyDir = path.join(storiesDir, storySlug);
    await fs.mkdir(storyDir, { recursive: true });

    for (const imageConfig of images) {
      totalImages++;
      const filepath = path.join(storyDir, imageConfig.filename);
      
      // Skip if file already exists
      try {
        await fs.access(filepath);
        console.log(`⏭️  Already exists: ${imageConfig.filename}`);
        successfulDownloads++;
        continue;
      } catch (e) {
        // File doesn't exist, proceed with download
      }

      // Use Picsum with seed for consistent images
      const url = `https://picsum.photos/seed/${imageConfig.seed}/800/600`;
      
      try {
        await downloadImage(url, filepath);
        successfulDownloads++;
        await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
      } catch (error) {
        console.error(`❌ Failed to download ${imageConfig.filename}:`, error.message);
      }
    }
    
    console.log('');
  }

  console.log(`\n🎉 Image generation complete!`);
  console.log(`✅ Successfully downloaded: ${successfulDownloads}/${totalImages} images`);
  console.log(`📁 Images saved to: ${storiesDir}`);
}

// Main execution
async function main() {
  try {
    await generatePlaceholderImages();
    console.log('\n✨ Done! You can now add images to your stories.');
    console.log('💡 To use real photos later, set up the Unsplash script with an API key.');
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
