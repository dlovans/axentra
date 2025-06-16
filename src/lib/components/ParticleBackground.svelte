<script>
  import { onMount } from 'svelte';
  
  const { children } = $props();

  let streaks = $state([]);
  const streakCount = 8;
  
  onMount(() => {
    streaks = Array.from({ length: streakCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      length: Math.random() * 40 + 20,
      angle: Math.random() * 45 - 22.5,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      delay: Math.random() * 3
    }));
    
    const animate = () => {
      streaks = streaks.map(streak => ({
        ...streak,
        x: (streak.x + streak.speed * 0.1) % 120,
        y: streak.y,
        opacity: 0.3 + 0.3 * Math.sin(Date.now() / 1000 + streak.delay)
      }));
      
      requestAnimationFrame(animate);
    };
    
    animate();
  });
</script>

<div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
  <!-- Grid overlay for structure -->
  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwTDYwIDBIMFY2MHoiIGZpbGw9IiNmMGYwZjAiIGZpbGwtb3BhY2l0eT0iLjMiLz48L2c+PC9zdmc+')] opacity-20"></div>
  
  <!-- Speed streaks representing rapid development -->
  {#each streaks as streak}
    <div 
      class="fixed pointer-events-none"
      style="
        left: {streak.x}%; 
        top: {streak.y}%; 
        opacity: {streak.opacity};
        transform: rotate({streak.angle}deg);
        animation-delay: {streak.delay}s;
      "
    >
      <div 
        class="speed-streak"
        style="
          width: {streak.length}px;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(55, 65, 81, 0.6) 20%, 
            rgba(249, 115, 22, 0.8) 50%, 
            rgba(55, 65, 81, 0.6) 80%, 
            transparent
          );
          filter: blur(0.5px);
        "
      ></div>
    </div>
  {/each}
  
  <!-- Subtle geometric shapes for development theme -->
  <div class="absolute top-1/4 left-1/6 w-32 h-32 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 opacity-30 blur-sm animate-float"></div>
  <div class="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 opacity-25 blur-sm animate-float-delayed"></div>
  <div class="absolute top-1/2 right-1/6 w-20 h-20 rotate-45 bg-gradient-to-br from-gray-200 to-gray-300 opacity-20 blur-sm animate-float-slow"></div>
  
  <!-- Light accent lines -->
  <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent"></div>
  <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300/30 to-transparent"></div>
  
  <!-- Content -->
  <div class="relative">
    {@render children()}
  </div>
</div>

<style>
  .speed-streak {
    border-radius: 1px;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-2deg); }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(45deg); }
    50% { transform: translateY(-8px) rotate(47deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
    animation-delay: 2s;
  }
  
  .animate-float-slow {
    animation: float-slow 10s ease-in-out infinite;
    animation-delay: 4s;
  }
</style>