/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // jsPDF and html2canvas are browser-only and use dynamic requires that
  // Turbopack cannot statically resolve. Mark them as server-external so
  // they are only bundled by the client-side bundler at runtime.
  serverExternalPackages: ['jspdf', 'html2canvas'],
}

export default nextConfig
