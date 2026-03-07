<script setup lang="ts"></script>
<template>
  <Title>KaraokeQuery</Title>
  <Meta
    name="description"
    content="A simple web frontend for meilisearch that disblays available karaoke songs downloaded with usdb_syncer"
  />
  <Meta
    name="keywords"
    content="Karaoke,Songs,List,Query,MelodyMania,Ultrastar"
  />
  <Meta name="og:title" content="KaraokeQuery" />
  <Meta
    name="og:description"
    content="A simple web frontend for meilisearch that disblays available karaoke songs downloaded with usdb_syncer"
  />
  <Meta name="og:image" content="/og.png" />
  <Meta name="theme-color" content="#8b5cf6" />
  <Link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/favicon/apple-touch-icon.png"
  />
  <Link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="/favicon/favicon-32x32.png"
  />
  <Link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="/favicon/favicon-16x16.png"
  />
  <Link rel="icon" href="/favicon/favicon.ico" />
  <Link rel="manifest" href="/site.webmanifest" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
