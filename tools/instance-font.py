# Cut a static Big Shoulders Display Black (wght 900) TTF from the variable web font. It is a build input only:
# src/lib/outline.ts reads it to draw the hero name and the wordmark as outlines (fontkitten cannot instance a
# variable WOFF2). Not shipped to browsers. Rerun only if public/fonts/big-shoulders.woff2 changes:
#   py tools/instance-font.py
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

font = instancer.instantiateVariableFont(TTFont('public/fonts/big-shoulders.woff2'), {'wght': 900})
font.flavor = None
font.save('src/assets/big-shoulders-black.ttf')
print('src/assets/big-shoulders-black.ttf')
