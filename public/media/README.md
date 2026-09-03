# Hero media

`hero.mp4` and `hero-poster.jpg` are **generated locally** — no stock footage, no
generation service, no licensing. `scripts/generate-hero-video.mjs` renders the
same volumetric field the WebGL background uses and encodes it with ffmpeg:

```bash
node scripts/generate-hero-video.mjs --seconds 8 --fps 25
```

The clip is never played. GSAP ScrollTrigger drives `video.currentTime` from the
scroll position, so scrolling through the hero moves the camera through the
haze. The encode forces a keyframe every 5 frames, which is what makes seeking
feel instant.

## Using your own footage instead

Drop any `hero.mp4` in this folder — the hero picks it up automatically. Encode
it the same way so scrubbing stays smooth:

```bash
ffmpeg -i source.mov -an \
  -vf "scale=1920:-2,fps=25" \
  -c:v libx264 -profile:v high -crf 26 \
  -g 5 -keyint_min 5 -sc_threshold 0 \
  -movflags +faststart \
  hero.mp4
```

Keep it under ~10 s and a few megabytes. If the file is missing the hero falls
back to the live WebGL field, so the page never breaks.
