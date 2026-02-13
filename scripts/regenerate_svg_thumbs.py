import os
import re

# Video filenames (match yang ada di folder videos)
video_files = [
    "01.mp4","010.mp4","011.mp4","012.mp4","013.mp4","014.mp4","015.mp4","016.mp4","017.mp4","018.mp4","019.mp4",
    "02.mp4","020.mp4","021.mp4","022.mp4","023.mp4","024.mp4","025.mp4","026.mp4","027.mp4","028.mp4","029.mp4",
    "03.mp4","030.mp4","031.mp4","032.mp4","04.mp4","05.mp4","06.mp4","07.mp4","08.mp4","09.mp4","33.mp4","34.mp4"
]

OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'images')
os.makedirs(OUT_DIR, exist_ok=True)

TEMPLATE = '''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
  <rect width="100%" height="100%" fill="#1f2937" rx="8" ry="8" />
  <g transform="translate(0,0)">
    <circle cx="300" cy="200" r="70" fill="rgba(255,255,255,0.06)" />
    <polygon points="280,180 280,220 325,200" fill="#ffffff" opacity="0.95" />
  </g>
  <text x="50%" y="86%" fill="#ffffff" font-size="28" font-family="Arial, Helvetica, sans-serif" dominant-baseline="middle" text-anchor="middle">Video {label}</text>
</svg>
'''

def extract_number(name):
    m = re.search(r"(\d+)", name)
    return int(m.group(1)) if m else None

for vf in video_files:
    base = os.path.splitext(vf)[0]
    num = extract_number(base)
    label = num if num is not None else base
    out_path = os.path.join(OUT_DIR, f"{base}-thumb.svg")
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(TEMPLATE.format(label=label))

print(f"Regenerated {len(video_files)} SVG thumbnails in {OUT_DIR}")
