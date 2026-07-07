import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    // 1. Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: 'Cloudinary is not configured on the server. Please set Cloudinary environment variables.' },
        { status: 500 }
      );
    }

    // 2. Parse form dataa
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided in the request form-data. Please upload a file with the key "file".' },
        { status: 400 }
      );
    }

    // 3. Validation: file type (MIME type check)
    const validMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: "${file.type}". Only JPEG, PNG, GIF, WEBP, and SVG are allowed.` },
        { status: 400 }
      );
    }

    // Max file size: 10MB
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json(
        { error: `File is too large (${(file.size / (1024 * 1024)).toFixed(2)} MB). Max limit is 10 MB.` },
        { status: 400 }
      );
    }

    // 4. Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Upload stream to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'dev-events',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error: any) {
    console.error('Error uploading file to Cloudinary:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image. Internal server error.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // 1. Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: 'Cloudinary is not configured on the server. Please set Cloudinary environment variables.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('public_id');

    if (publicId) {
      // Retrieve details of a single resource
      try {
        const resource = await cloudinary.api.resource(publicId);
        return NextResponse.json(resource);
      } catch (err: any) {
        if (err.status === 404 || (err.error && err.error.http_code === 404)) {
          return NextResponse.json({ error: `Resource not found for public_id: ${publicId}` }, { status: 404 });
        }
        throw err;
      }
    }

    // Otherwise, list resources under the 'dev-events' folder
    const resourcesResult = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'dev-events/',
      max_results: 30,
    });

    return NextResponse.json({
      resources: resourcesResult.resources.map((r: any) => ({
        public_id: r.public_id,
        secure_url: r.secure_url,
        format: r.format,
        width: r.width,
        height: r.height,
        created_at: r.created_at,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching resources from Cloudinary:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve images. Internal server error.' },
      { status: 500 }
    );
  }
}
