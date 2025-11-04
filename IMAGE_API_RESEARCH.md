# Image API Options for Story Illustrations

## Free APIs with Child-Friendly Content

### 1. **Unsplash API** (Recommended)
- **URL**: https://unsplash.com/developers
- **Pros**: High-quality photos, good search capabilities, completely free
- **Cons**: Real photos only (no illustrations), may need careful filtering
- **Good for**: Backgrounds, trucks, animals, nature scenes
- **Example**: Search for "green truck", "golden retriever", "lake sunset"

### 2. **Pixabay API**
- **URL**: https://pixabay.com/api/docs/
- **Pros**: Mix of photos and illustrations, free tier, family-friendly content
- **Cons**: Limited requests on free tier (5,000/month)
- **Good for**: Simple illustrations, cartoon-style images

### 3. **Pexels API**
- **URL**: https://www.pexels.com/api/
- **Pros**: High-quality stock photos, free, good search
- **Cons**: Real photos only, smaller library than Unsplash
- **Good for**: Real-world scenes that match story events

## AI-Generated Image APIs

### 4. **DALL-E 3 via OpenAI API** (Most Suitable for Stories)
- **URL**: https://platform.openai.com/docs/guides/images
- **Pros**: Custom illustrations, perfect for children's book style, consistent characters
- **Cons**: Costs money (~$0.040 per image), requires API key
- **Perfect for**: Custom story illustrations with consistent Ryan character
- **Example prompts**: 
  - "Children's book illustration of a tall blonde man fixing a car tire, warm colors, friendly style"
  - "Simple cartoon illustration of a green F350 truck, children's book style"

### 5. **Stable Diffusion (via Stability AI)**
- **URL**: https://platform.stability.ai/docs/api-reference
- **Pros**: Good quality, cheaper than DALL-E
- **Cons**: Still costs money, may need more prompt engineering
- **Good for**: Cartoon-style illustrations

### 6. **Midjourney API** (Limited Access)
- **URL**: Currently invitation-only
- **Pros**: Excellent quality, artistic style
- **Cons**: Expensive, limited access, may be too artistic for children's stories

## Free Illustration Libraries (No API)

### 7. **unDraw**
- **URL**: https://undraw.co/
- **Pros**: Consistent style, customizable colors, completely free
- **Cons**: No API, limited characters, need to manually select
- **Good for**: Simple, modern illustrations

### 8. **Storyset (by Freepik)**
- **URL**: https://storyset.com/
- **Pros**: Animated illustrations, story-focused, customizable
- **Cons**: Attribution required on free plan, no API
- **Good for**: Dynamic story scenes

## Implementation Recommendation

### Option A: Automated with AI (Best Long-term)
```javascript
// Example implementation with DALL-E
const generateStoryImage = async (storySlug, scene) => {
  const prompts = {
    'truck': 'Children\'s book illustration of a green F350 pickup truck, simple and friendly style, warm colors',
    'ryan-fixing': 'Children\'s book illustration of a tall blonde man fixing something, wearing work clothes, friendly expression, warm colors',
    'animals': 'Children\'s book illustration of a golden retriever and a small dog playing together, children\'s book style'
  }
  
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompts[scene],
    size: "1024x1024",
    style: "natural",
    quality: "standard"
  })
  
  return response.data[0].url
}
```

### Option B: Curated Free Images (Best for Now)
```javascript
// Example implementation with Unsplash
const getStoryImage = async (searchTerm) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${UNSPLASH_KEY}&per_page=1&orientation=landscape`
  )
  const data = await response.json()
  return data.results[0]?.urls?.regular
}
```

## Cost Analysis

### Free Options (0-100 images/month)
- Unsplash: Completely free
- Pixabay: 5,000 requests/month free
- Pexels: Completely free

### Paid Options (for custom illustrations)
- DALL-E 3: ~$1 per story (2-3 images)
- Stable Diffusion: ~$0.50 per story
- Midjourney: ~$2 per story

## Recommendation for Your Stories

**Phase 1: Start with Unsplash/Pexels**
- Implement free photo APIs first
- Search terms: "green truck", "golden retriever", "lake", "tools", "home repair"
- Filter for family-friendly, bright, warm images

**Phase 2: Add AI Generation Later**
- Once you're happy with the automated system, add DALL-E for custom illustrations
- Create consistent character designs for Ryan, Julie, animals
- Generate specific scenes that match your story content

**Implementation Priority:**
1. Create image insertion system in MDX
2. Connect to Unsplash API for real photos
3. Add fallback images for when API fails
4. Later: Add DALL-E for custom illustrations

Would you like me to implement any of these options?
