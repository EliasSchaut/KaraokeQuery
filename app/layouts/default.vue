<template>
  <Body
    class="font-geist text-secondary-900 bg-second-50 selection:bg-prime-100 dark:bg-second-950 dark:selection:bg-prime-900 dark:text-white"
  />
  <div class="flex h-screen flex-col justify-between">
    <LayoutNav />
    <main class="mb-auto">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
