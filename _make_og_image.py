# One-off generator for assets/og-image.png (1200x630 social share card).
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (17, 17, 16)        # gray-950
INK = (250, 250, 248)    # gray-50
MUTED = (140, 140, 134)  # gray-500
GREEN = (52, 199, 89)    # green-500 accent

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

sans_bold = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 64)
mono_bold = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 40)
mono_small = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 24)

# PixelMark: 5x5 grid, one awake green cell at (2,2)
cell, gap, ox, oy = 14, 3, 90, 90
for r in range(5):
    for c in range(5):
        x = ox + c * (cell + gap)
        y = oy + r * (cell + gap)
        color = GREEN if (r, c) == (2, 2) else (60, 60, 58)
        d.rounded_rectangle([x, y, x + cell, y + cell], radius=2, fill=color)

mark_w = 5 * cell + 4 * gap
d.text((ox + mark_w + 24, oy + mark_w / 2), "AIBOS", font=mono_bold, fill=INK, anchor="lm")

d.text((90, 300), "Software you don't operate.", font=sans_bold, fill=INK, anchor="lm")
d.text((90, 385), "Staff you don't hire.", font=sans_bold, fill=INK, anchor="lm")

d.text((90, 490), "ONE AI STAFFER RUNS YOUR POS, PAYROLL,", font=mono_small, fill=MUTED, anchor="lm")
d.text((90, 524), "OPERATIONS, AND WEBSITE. YOURS TO KEEP.", font=mono_small, fill=MUTED, anchor="lm")

d.line([(90, 570), (1110, 570)], fill=(45, 45, 43), width=1)
d.text((90, 596), "by JMB Labs - Metro Manila", font=mono_small, fill=MUTED, anchor="lm")

img.save("assets/og-image.png", optimize=True)
print("saved", img.size)
