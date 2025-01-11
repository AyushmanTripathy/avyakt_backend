import { Request } from "express";

const ADMIN_KEY = process.env.ADMIN_KEY;
if (!ADMIN_KEY) {
  console.error("ADMIN_KEY not present");
  process.exit(1);
}

const CLIENT_KEY = process.env.CLIENT_KEY;
if (!CLIENT_KEY) {
  console.error("CLIENT_KEY not present");
  process.exit(1);
}

const CLOUDINARY_BUCKETID = process.env.CLOUDINARY_BUCKETID;
if (!CLOUDINARY_BUCKETID) {
  console.error("CLOUDINARY_BUCKETID not present");
  process.exit(1);
}

export function validateKey(req: Request) {
  if (!req.headers.cookie) return false;
  else if (req.headers.cookie.split(";").includes("key=" + ADMIN_KEY))
    return true;
  else return false;
}

export { ADMIN_KEY, CLIENT_KEY, CLOUDINARY_BUCKETID };
