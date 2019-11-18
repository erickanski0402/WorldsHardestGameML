from pyglet.gl import *

# [Line1 x, line1 y, line2 x, line2 y]
GAME_BOUNDARY_FRAME = [
    [50, 400, 50, 100],
    [50, 100, 300, 100],
    [300, 100, 300, 150],
    [300, 150, 750, 150],
    [750, 150, 750, 350],
    [750, 350, 800, 350],
    [800, 350, 800, 100],
    [800, 100, 950, 100],
    [950, 100, 950, 400],
    [950, 400, 700, 400],
    [700, 400, 700, 350],
    [700, 350, 250, 350],
    [250, 350, 250, 150],
    [250, 150, 200, 150],
    [200, 150, 200, 400],
    [200, 400, 50, 400],
]

# [Bottom Left x, Bottom Left y, Width, Height]
# WHY IS IT GOING BY THE TOP RIGHT CORNER???
GAME_COLLISION_BOUNDARIES = [
    [170, 120, 80, 320],
    [200, 320, 500, 120],
    [670, 370, 330, 80],
    [920, 20, 100, 400],
    [720, 20, 300, 80],
    [720, 20, 80, 330],
    [270, 20, 500, 130],
    [-30, 0, 350, 100],
    [-30, -30, 80, 500],
    [-30, 370, 300, 80]
]

def draw_game_area():
    glClear(GL_COLOR_BUFFER_BIT)

    for line in GAME_BOUNDARY_FRAME:
        glBegin(GL_LINES)
        glVertex2i(line[0], line[1])
        glVertex2i(line[2], line[3])
        glEnd()

def will_collide(x, y):
    # Collision between x-axis seems to be working. But collision on the y-axis seems funky

    for boundary in GAME_COLLISION_BOUNDARIES:
        boundaryX1 = boundary[0]
        boundaryX2 = boundary[0] + boundary[2]
        boundaryY1 = boundary[1]
        boundaryY2 = boundary[1] + boundary[3]
        if (x > boundaryX1 and x < boundaryX2) and (y > boundaryY1 and y < boundaryY2):
            return True

    return False
