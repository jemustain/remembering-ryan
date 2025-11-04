const fs = require('fs').promises;
const path = require('path');

// Map of which images to place in which stories
const STORY_IMAGE_PLACEMENTS = {
  '02-second-date': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'dogs-playing.jpg', alt: 'Dogs playing together', insertAfter: '# Second Date' },
      { filename: 'nature-walk.jpg', alt: 'Nature walk by lake', insertAfter: 'Ryan and Julie went to the same lake where they walked on their first date.' },
      { filename: 'cats.jpg', alt: 'Friendly cats', insertAfter: 'Then Julie introduced Ryan to her two cats!' }
    ]
  },
  '03-fixing-the-car-fuse': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'hardware-store.jpg', alt: 'Hardware store interior', insertAfter: 'Ryan drove to a store called a hardware store.' },
      { filename: 'fixing-car.jpg', alt: 'Person working on car', insertAfter: 'Ryan opened a special box under the steering wheel.' }
    ]
  },
  '04-dinner-surprise': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'cooking.jpg', alt: 'Cooking in kitchen', insertAfter: 'Every day, he would work hard cooking and preparing the most delicious surprise.' },
      { filename: 'dinner-table.jpg', alt: 'Dinner table setup', insertAfter: 'It was time for the grand surprise!' }
    ]
  },
  '05-wood-stove': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'wood-stove.jpg', alt: 'Cozy wood burning stove', insertAfter: 'The wood stove stood in the corner of the house, quiet and cold.' },
      { filename: 'firewood.jpg', alt: 'Stack of firewood', insertAfter: 'Ryan walked to his truck to get the special wood he had brought.' }
    ]
  },
  '06-balto-fleas': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'vet-visit.jpg', alt: 'Dog at veterinarian', insertAfter: 'Ryan called the veterinarian, which is a special doctor for animals.' },
      { filename: 'dog-bath.jpg', alt: 'Dog getting a bath', insertAfter: 'First, they needed to give Balto a special bath.' }
    ]
  },
  '07-grammys-christmas': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'christmas-tree.jpg', alt: 'Decorated Christmas tree', insertAfter: "# Grammy's Christmas" },
      { filename: 'christmas-family.jpg', alt: 'Christmas family celebration', insertAfter: 'When they arrived, the house was filled with the wonderful smell of cookies baking and pine trees.' }
    ]
  },
  '08-girlfriend-at-work': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'workplace.jpg', alt: 'Office workplace', insertAfter: '# Girlfriend at Work' }
    ]
  },
  '09-the-baby': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'announcement.jpg', alt: 'Happy pregnancy news', insertAfter: '# The baby' },
      { filename: 'baby-shoes.jpg', alt: 'Tiny baby shoes', insertAfter: "Julie and Ryan had always wanted a kid to love, but they didn't expect one so soon." }
    ]
  },
  '10-picture-day': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'photo-session.jpg', alt: 'Family taking photos', insertAfter: '# Picture Day' },
      { filename: 'photographer.jpg', alt: 'Photographer with camera', insertAfter: 'Julie called two nice photographers who specialized in taking beautiful family pictures.' }
    ]
  },
  '11-tortoises': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'tortoise.jpg', alt: 'Pet tortoise', insertAfter: 'Ryan carefully carried in four little tortoises with the most beautiful hard shells that shined like polished stones!' },
      { filename: 'tortoise-home.jpg', alt: 'Tortoise habitat', insertAfter: 'He would build the most amazing tortoise house anyone had ever seen!' }
    ]
  },
  '12-gone-for-the-weekend': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'airport.jpg', alt: 'Airport departure area', insertAfter: 'On Friday morning, when the sun was just beginning to paint the sky with golden light, Ryan drove Julie to the airport in his big green truck.' },
      { filename: 'pets-home.jpg', alt: 'Pets relaxing at home', insertAfter: 'Every single day while Julie was away, Ryan made sure to visit her house and take the very best care of all her beloved pets.' }
    ]
  },
  '13-puppies': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'puppies.jpg', alt: 'Adorable puppies', insertAfter: 'There were five wiggly, cuddly puppies with soft fur and big eyes.' },
      { filename: 'puppy-family.jpg', alt: 'Family with new puppy', insertAfter: 'Finally, Ryan and Julie found the perfect home for Chewy with a kind family who had a big yard.' }
    ]
  },
  '14-hot-water-heater': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'water-heater.jpg', alt: 'Water heater installation', insertAfter: '"Don\'t worry at all, Julie!" Ryan said with confidence and a reassuring smile.' },
      { filename: 'plumbing-tools.jpg', alt: 'Plumbing tools and equipment', insertAfter: 'The next morning, Ryan arrived bright and early, ready to tackle the important job of installing Julie\'s new water heater.' }
    ]
  },
  '15-telling-dad': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'family-call.jpg', alt: 'Family video call', insertAfter: '# Telling Dad' },
      { filename: 'happy-grandparents.jpg', alt: 'Happy grandparents', insertAfter: 'At their dad\'s house, Julie and Monica sat with their dad and stepmom at a cozy table full of yummy snacks like cookies and fruit.' }
    ]
  },
  '16-carpet-cleaning': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'carpet-cleaner.jpg', alt: 'Carpet cleaning machine', insertAfter: 'He drove his big green truck to the store and got a special machine called a wet vac.' },
      { filename: 'clean-carpet.jpg', alt: 'Clean fresh carpet', insertAfter: 'Ryan cleaned every room, even the corners where Ryu liked to hide his toys.' }
    ]
  },
  '17-screen-door': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'screen-door.jpg', alt: 'Screen door being repaired', insertAfter: '# The Screen Door' },
      { filename: 'hardware.jpg', alt: 'Hardware store supplies', insertAfter: 'At the hardware store, Ryan picked out a new screen and some special tools.' }
    ]
  },
  '18-the-rings': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'rings.jpg', alt: 'Wedding rings', insertAfter: 'After catching lots of Pokémon, they went to a sparkly jewelry store.' },
      { filename: 'mall.jpg', alt: 'Shopping mall interior', insertAfter: 'When they were done, they played more Pokémon, running around the mall and laughing as they caught more funny creatures.' }
    ]
  },
  '19-plumbing-issue': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'plumbing.jpg', alt: 'Plumber fixing pipes', insertAfter: 'Ryan grabbed his toolbox and drove his big green truck to Julie\'s house.' },
      { filename: 'indoor-camping.jpg', alt: 'Indoor camping adventure', insertAfter: 'That night, they couldn\'t wash dishes or take showers, but they made it fun.' }
    ]
  },
  '20-bathroom-repairs': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'bathroom-repair.jpg', alt: 'Bathroom being repaired', insertAfter: '# Bathroom Repairs' },
      { filename: 'tile-work.jpg', alt: 'Tile work in progress', insertAfter: 'He patched the drywall, making the walls smooth and strong.' }
    ]
  },
  '21-easter-eggs': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'easter-eggs.jpg', alt: 'Colorful dyed Easter eggs', insertAfter: '# Easter Eggs' },
      { filename: 'egg-decorating.jpg', alt: 'Decorating Easter eggs', insertAfter: 'They boiled eggs and dipped them in the dye, making funny patterns like swirls and stripes.' }
    ]
  },
  '22-birthday': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'purple-flowers.jpg', alt: 'Beautiful purple flowers', insertAfter: 'He drove his big green truck to a flower shop and picked out a big bunch of purple flowers, Julie\'s favorite color, like pretty violets and lavender.' },
      { filename: 'thai-food.jpg', alt: 'Thai food dinner', insertAfter: 'At the restaurant, Ryan and Julie sat at a table with twinkly lights.' }
    ]
  },
  '23-20-week-ultrasound': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'ultrasound.jpg', alt: 'Baby ultrasound image', insertAfter: '# 20 Week Ultrasound' },
      { filename: 'doctors-office.jpg', alt: 'Doctor office waiting room', insertAfter: 'On the day of the ultrasound, Ryan was busy fixing a fence at work and lost track of time.' }
    ]
  },
  '24-the-death': {
    import: "import StoryImage from '../../../components/StoryImage'",
    images: [
      { filename: 'stars.jpg', alt: 'Peaceful night sky with stars', insertAfter: 'But even with all their help, Ryan\'s heart got too tired. He went to a peaceful place in the stars, where he could rest and watch over everyone.' }
    ]
  }
};

async function addImagesToStory(storySlug, config) {
  const mdxPath = path.join(process.cwd(), 'app', 'stories', storySlug, 'page.mdx');
  
  try {
    let content = await fs.readFile(mdxPath, 'utf-8');
    
    // Check if import already exists
    if (!content.includes("import StoryImage")) {
      content = config.import + '\n\n' + content;
    }
    
    // Add each image
    for (const img of config.images) {
      const imageComponent = `\n\n<StoryImage src="/images/stories/${storySlug}/${img.filename}" alt="${img.alt}" />\n\n`;
      
      // Only add if not already present
      if (!content.includes(img.filename)) {
        content = content.replace(
          img.insertAfter,
          img.insertAfter + imageComponent
        );
      }
    }
    
    await fs.writeFile(mdxPath, content);
    console.log(`✅ Updated: ${storySlug}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${storySlug}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('📚 Adding images to story files...\n');
  
  let success = 0;
  let total = Object.keys(STORY_IMAGE_PLACEMENTS).length;
  
  for (const [storySlug, config] of Object.entries(STORY_IMAGE_PLACEMENTS)) {
    const result = await addImagesToStory(storySlug, config);
    if (result) success++;
  }
  
  console.log(`\n🎉 Complete! Successfully updated ${success}/${total} stories`);
}

main();
