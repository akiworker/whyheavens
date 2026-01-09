<script>
  import { createEventDispatcher } from 'svelte';
  
  let visible = true;
  let fadeOut = false;
  let ready = false;
  
  const dispatch = createEventDispatcher();
  
  // Show "click to enter" after brief loading
  setTimeout(() => {
    ready = true;
  }, 800);
  
  function handleEnter() {
    if (!ready) return;
    fadeOut = true;
    dispatch('enter');
    setTimeout(() => { 
      visible = false;
      document.body.style.overflow = '';
    }, 500);
  }
</script>

{#if visible}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="loader" class:fadeOut on:click={handleEnter}>
    {#if !ready}
      <div class="ispinner">
        {#each Array(8) as _}
          <div class="ispinner-blade"></div>
        {/each}
      </div>
    {:else}
      <div class="enter-prompt" class:show={ready}>
        <span class="enter-text">click to enter</span>
        <div class="enter-ring"></div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .loader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    opacity: 1;
    transition: opacity 0.5s ease;
    cursor: pointer;
  }
  
  .loader.fadeOut {
    opacity: 0;
    pointer-events: none;
  }
  
  .ispinner {
    position: relative;
    width: 20px;
    height: 20px;
  }
  
  .ispinner-blade {
    position: absolute;
    width: 2px;
    height: 5px;
    background: #8e8e93;
    left: 50%;
    top: 50%;
    margin-left: -1px;
    margin-top: -8px;
    border-radius: 1px;
    transform-origin: center 8px;
    animation: blade 1s linear infinite;
  }
  
  .ispinner-blade:nth-child(1) { transform: rotate(0deg); animation-delay: -0.875s; }
  .ispinner-blade:nth-child(2) { transform: rotate(45deg); animation-delay: -0.75s; }
  .ispinner-blade:nth-child(3) { transform: rotate(90deg); animation-delay: -0.625s; }
  .ispinner-blade:nth-child(4) { transform: rotate(135deg); animation-delay: -0.5s; }
  .ispinner-blade:nth-child(5) { transform: rotate(180deg); animation-delay: -0.375s; }
  .ispinner-blade:nth-child(6) { transform: rotate(225deg); animation-delay: -0.25s; }
  .ispinner-blade:nth-child(7) { transform: rotate(270deg); animation-delay: -0.125s; }
  .ispinner-blade:nth-child(8) { transform: rotate(315deg); animation-delay: 0s; }
  
  @keyframes blade {
    0% { opacity: 1; }
    100% { opacity: 0.15; }
  }
  
  .enter-prompt {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    opacity: 0;
    transform: scale(0.9);
    animation: fadeInPrompt 0.5s ease forwards;
  }
  
  @keyframes fadeInPrompt {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .enter-text {
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .enter-ring {
    width: 60px;
    height: 60px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    position: relative;
    animation: pulse 2s ease-in-out infinite;
  }
  
  .enter-ring::before {
    content: '';
    position: absolute;
    inset: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
  }
  
  .enter-ring::after {
    content: '';
    position: absolute;
    inset: 18px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
</style>
