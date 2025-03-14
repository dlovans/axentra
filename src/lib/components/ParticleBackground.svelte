<script>
  import { onMount } from 'svelte';
  
  const { children } = $props();

  let particles = $state([]);
  let dustParticles = $state([]);
  const particleCount = 20;
  const dustParticleCount = 30;
  
  // Soft color palettes for particles
  const softColors = [
    { hue: 5, sat: 80, light: 75 },     // Soft red
    { hue: 30, sat: 80, light: 75 },    // Soft orange
    { hue: 60, sat: 70, light: 75 },    // Soft yellow
    { hue: 120, sat: 70, light: 75 },   // Soft green
    { hue: 150, sat: 70, light: 75 },   // Soft teal
    { hue: 180, sat: 70, light: 75 },   // Soft cyan
    { hue: 210, sat: 80, light: 75 },   // Soft blue
    { hue: 240, sat: 70, light: 75 },   // Soft indigo
    { hue: 270, sat: 70, light: 75 }    // Soft purple
  ];
  
  // Initialize particles on mount
  onMount(() => {
    // Create particles with speed properties
    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1, // Smaller size range (1-4px instead of 2-8px)
      opacity: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.04, // Add speed for X direction
      speedY: (Math.random() - 0.5) * 0.04, // Add speed for Y direction
      pulse: Math.random() * 2 + 1, // Add pulse rate for opacity variation
      ...softColors[Math.floor(Math.random() * softColors.length)]
    }));
    
    // Create dust particles with speed properties
    dustParticles = Array.from({ length: dustParticleCount }, () => {
      // Select a random color from our palette but make it more subtle
      const baseColor = softColors[Math.floor(Math.random() * softColors.length)];
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1 + 0.3, // Even smaller dust particles (0.3-1.3px)
        opacity: Math.random() * 0.3 + 0.1,
        speedX: (Math.random() - 0.5) * 0.015, // Add speed for X direction (slower)
        speedY: (Math.random() - 0.5) * 0.015, // Add speed for Y direction (slower)
        hue: baseColor.hue + (Math.random() * 20 - 10), // Slight hue variation
        sat: baseColor.sat * 0.5, // Lower saturation for dust
        light: baseColor.light + 10 // Slightly lighter
      };
    });
    
    // Animation function
    const animate = () => {
      // Update main particles
      particles = particles.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100, // Move and wrap around
        y: (p.y + p.speedY + 100) % 100, // Move and wrap around
        opacity: p.opacity * (0.95 + 0.05 * Math.sin(Date.now() / (1000 * p.pulse))) // Pulsate opacity
      }));
      
      // Update dust particles
      dustParticles = dustParticles.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100, // Move and wrap around
        y: (p.y + p.speedY + 100) % 100  // Move and wrap around
      }));
      
      // Slow down the animation by requesting the next frame less frequently
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 30); // Add a small delay between frames
    };
    
    // Start the animation
    animate();
  });
</script>

<div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
  <!-- Grid overlay -->
  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwTDYwIDBIMFY2MHoiIGZpbGw9IiMxYTFhMWEiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
  
  <!-- Animated gradient orbs -->
  <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-10 blur-3xl animate-pulse"></div>
  <div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-10 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
  <div class="absolute top-3/4 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 opacity-10 blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
  
  <!-- Upside-down effect (Stranger Things inspired) -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
  
  <!-- Glowing accent line at top only -->
  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
  
  <!-- Fixed Background Elements -->
  <div class="fixed inset-0 -z-10">
    <!-- Grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwTDYwIDBIMFY2MHoiIGZpbGw9IiMxYTFhMWEiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
    
    <!-- Animated gradient orbs -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-10 blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-10 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    <div class="absolute top-3/4 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 opacity-10 blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    
    <!-- Upside-down effect (Stranger Things inspired) -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
    
    <!-- Glowing accent line at top only -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
  </div>
  
  <!-- Main particles (with soft red, green, blue colors) -->
  {#each particles as particle}
    <div 
      class="fixed rounded-full animate-flicker pointer-events-none"
      style="
        left: {particle.x}%; 
        top: {particle.y}%; 
        width: {particle.size}px; 
        height: {particle.size}px; 
        opacity: {particle.opacity};
        background-color: hsl({particle.hue}, {particle.sat}%, {particle.light}%);
        box-shadow: 0 0 {particle.size * 4}px {particle.size * 2.5}px hsl({particle.hue}, {particle.sat + 10}%, {particle.light + 15}%, 0.7);
        filter: blur(0.5px);
        animation-delay: {Math.random() * 5}s;
      "
    ></div>
  {/each}
  
  <!-- Dust particles (with soft colors) -->
  {#each dustParticles as particle}
    <div 
      class="fixed rounded-full pointer-events-none"
      style="
        left: {particle.x}%; 
        top: {particle.y}%; 
        width: {particle.size}px; 
        height: {particle.size}px; 
        opacity: {particle.opacity};
        background-color: hsl({particle.hue}, {particle.sat}%, {particle.light}%);
        box-shadow: 0 0 {particle.size * 3}px {particle.size * 1.5}px hsl({particle.hue}, {particle.sat + 5}%, {particle.light + 20}%, 0.5);
        filter: blur(0.3px);
      "
    ></div>
  {/each}
  
  <!-- Render children (Svelte slot) -->
  <div class="relative">
    {@render children()}
  </div>
</div>

<style>
  @keyframes pulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.2; }
  }
  
  .animate-pulse {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes flicker {
    0%, 100% { opacity: var(--opacity, 0.7); }
    50% { opacity: calc(var(--opacity, 0.7) * 0.6); }
  }
  
  .animate-flicker {
    animation: flicker 3s ease-in-out infinite;
    animation-duration: calc(2s + (var(--delay, 0) * 3s));
  }
</style> 