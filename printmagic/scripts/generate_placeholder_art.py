import os
from PIL import Image, ImageDraw, ImageFilter
import random

random.seed(7)

OUT_DIR = "/home/claude/printmagic/public"
os.makedirs(os.path.join(OUT_DIR, "gallery"), exist_ok=True)

# Brand palette (matches tailwind.config.js)
PALETTE = {
    "magenta": (214, 23, 124),
    "deep_magenta": (142, 30, 122),
    "teal": (0, 169, 154),
    "sky": (31, 167, 224),
    "navy": (23, 58, 99),
    "red": (216, 31, 53),
    "coral": (240, 82, 107),
    "orange": (244, 144, 30),
    "amber": (250, 199, 42),
    "lime": (168, 204, 44),
    "olive": (125, 174, 43),
}


def blob_layer(size, blobs, blur_radius):
    """blobs: list of (cx, cy, r, color, alpha)"""
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for cx, cy, r, color, alpha in blobs:
        draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            fill=(color[0], color[1], color[2], alpha),
        )
    return layer.filter(ImageFilter.GaussianBlur(blur_radius))


def make_hero_bg():
    size = (1920, 1080)
    base = Image.new("RGBA", size, (255, 255, 255, 255))

    # Keep the strongest color concentrated toward the edges/corners,
    # leaving the center calmer so the glass text panel stays legible.
    blobs = [
        (120, 150, 360, PALETTE["magenta"], 130),
        (300, 850, 320, PALETTE["coral"], 110),
        (1750, 200, 380, PALETTE["teal"], 130),
        (1650, 900, 340, PALETTE["sky"], 110),
        (980, 80, 260, PALETTE["amber"], 100),
        (1150, 1000, 300, PALETTE["orange"], 100),
        (60, 980, 260, PALETTE["lime"], 90),
        (1850, 600, 260, PALETTE["deep_magenta"], 90),
    ]
    layer = blob_layer(size, blobs, blur_radius=140)
    base.alpha_composite(layer)

    # Soft white vignette so the centre (where the hero panel sits)
    # stays calm and legible.
    vignette = Image.new("L", size, 0)
    vd = ImageDraw.Draw(vignette)
    vd.ellipse([size[0] * 0.10, -size[1] * 0.35, size[0] * 0.90, size[1] * 1.15], fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(160))
    white = Image.new("RGBA", size, (255, 255, 255, 255))
    base = Image.composite(white, base, vignette.point(lambda p: int(p * 0.55)))

    base.convert("RGB").save(os.path.join(OUT_DIR, "hero-bg.jpg"), quality=87)
    print("wrote hero-bg.jpg")


def make_gallery_tile(name, color_a, color_b, seed_extra=0):
    random.seed(seed_extra + 11)
    size = (1000, 1000)
    base = Image.new("RGBA", size, (255, 255, 255, 255))

    blobs = []
    for i in range(5):
        cx = random.randint(150, 850)
        cy = random.randint(150, 850)
        r = random.randint(220, 420)
        color = color_a if i % 2 == 0 else color_b
        alpha = random.randint(120, 190)
        blobs.append((cx, cy, r, color, alpha))

    layer = blob_layer(size, blobs, blur_radius=90)
    base.alpha_composite(layer)

    # A few crisp faceted triangles, echoing the PrintMagic hexagon mark,
    # scattered with low opacity for texture.
    facet_layer = Image.new("RGBA", size, (0, 0, 0, 0))
    fd = ImageDraw.Draw(facet_layer)
    for i in range(6):
        cx = random.randint(100, 900)
        cy = random.randint(100, 900)
        s = random.randint(60, 140)
        color = random.choice([color_a, color_b])
        pts = [
            (cx, cy - s),
            (cx + s, cy + s * 0.6),
            (cx - s, cy + s * 0.6),
        ]
        fd.polygon(pts, fill=(color[0], color[1], color[2], 60))
    base.alpha_composite(facet_layer)

    base.convert("RGB").save(
        os.path.join(OUT_DIR, "gallery", f"{name}.jpg"), quality=87
    )
    print(f"wrote gallery/{name}.jpg")


make_hero_bg()

make_gallery_tile("rakhis", PALETTE["coral"], PALETTE["magenta"], 1)
make_gallery_tile("phone-covers", PALETTE["teal"], PALETTE["sky"], 2)
make_gallery_tile("keychains", PALETTE["orange"], PALETTE["amber"], 3)
make_gallery_tile("laser-items", PALETTE["sky"], PALETTE["navy"], 4)
make_gallery_tile("customization", PALETTE["magenta"], PALETTE["orange"], 5)
