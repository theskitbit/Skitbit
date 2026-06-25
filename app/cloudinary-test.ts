#!/usr/bin/env npx tsx
import { v2 as cloudinary } from 'cloudinary';

// SECURITY NOTE: To ensure this is never deployed with your production code,
// make sure to delete this file or add it to your .gitignore before pushing to GitHub/Vercel.
cloudinary.config({
  cloud_name: 'dxp4sh8tx',
  api_key: '228278735718588',
  api_secret: 'PVqIxCROktuNo8FL-nsuantNEDA' 
});

async function runOnboarding() {
  try {
    console.log("Starting Cloudinary onboarding...");

    // 2. Upload an image from Cloudinary's demo domain
    const sampleImage = 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg';
    const uploadResult = await cloudinary.uploader.upload(sampleImage, {
      public_id: 'onboarding_sample'
    });

    console.log("=== Upload Success ===");
    console.log(`Secure URL: ${uploadResult.secure_url}`);
    console.log(`Public ID: ${uploadResult.public_id}`);

    // 3. Get image details
    const details = await cloudinary.api.resource(uploadResult.public_id);
    console.log("\n=== Image Details ===");
    console.log(`Width: ${details.width}px`);
    console.log(`Height: ${details.height}px`);
    console.log(`Format: ${details.format}`);
    console.log(`File Size: ${details.bytes} bytes`);

    // 4. Transform the image
    // fetch_format: 'auto' (f_auto) -> automatically delivers the best format (WebP/AVIF) based on the browser
    // quality: 'auto' (q_auto) -> automatically compresses the image to the optimal balance of quality and file size
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
      secure: true
    });

    console.log("\nDone! Click link below to see optimized version of the image. Check the size and the format.");
    console.log(`Transformed URL: ${transformedUrl}`);

  } catch (error) {
    console.error("Error during execution:", error);
  }
}

runOnboarding();