import './globals.css'

export const metadata = {
  title: 'Lalitaditya Divakarla — Robotics Researcher & Autonomous Systems Engineer',
  description: 'PhD Researcher in Computer Science specializing in Autonomous Vehicles, Digital Twins, C-V2X Systems, Swarm Robotics, Teleoperation, and XR Simulation. University of Minnesota.',
  keywords: 'Lalitaditya Divakarla, robotics, autonomous vehicles, digital twins, C-V2X, swarm robotics, teleoperation, XR simulation, PhD researcher, University of Minnesota',
  authors: [{ name: 'Lalitaditya Divakarla' }],
  openGraph: {
    title: 'Lalitaditya Divakarla — Robotics & Autonomous Systems',
    description: 'PhD Researcher building the future of intelligent autonomous systems.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
