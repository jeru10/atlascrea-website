from PIL import Image
import collections

img = Image.open('public/images/logo.png').convert('RGB')
img = img.resize((100, 50))
pixels = list(img.getdata())
counter = collections.Counter(pixels)
print('Top colors in logo:')
for color, count in counter.most_common(15):
    r, g, b = color
    print(f'  rgb({r},{g},{b})  #{r:02x}{g:02x}{b:02x}  count={count}')
