from math import pi, sin, cos, sqrt, pow
from pyglet.gl import *

class Enemy:
    def __init__(self, pos_x, pos_y, vel_x, vel_y, radius):
        self.set(pos_x, pos_y, vel_x, vel_y, radius, False)

    def draw(self):
        # print(f"Drawing enemy at position: ({self.pos_x}, {self.pos_y})")
        iterations = int(2 * self.radius * pi)
        s = sin(2 * pi / iterations)
        c = cos(2 * pi / iterations)

        dx, dy = self.radius, 0

        glBegin(GL_TRIANGLE_FAN)
        glVertex2f(self.pos_x, self.pos_y)
        for i in range(iterations + 1):
            glVertex2f(self.pos_x + dx, self.pos_y + dy)
            dx, dy = (dx * c - dy * s), (dy * c + dx * s)
        glEnd()

    def set(self, pos_x, pos_y, vel_x, vel_y, radius, colliding):
        self.pos_x = pos_x
        self.pos_y = pos_y
        self.vel_x = vel_x
        self.vel_y = vel_y
        self.radius = radius
        self.colliding = colliding

    def move(self, player):
        # print(f"Current position {self.pos_x}")
        if self.pos_x < 275 or self.pos_x > 725:
            self.vel_x *= -1

        self.set(
            self.pos_x + self.vel_x,
            self.pos_y + self.vel_y,
            self.vel_x,
            self.vel_y,
            self.radius,
            self.check_collisions(player)
        )
        self.draw()

    def check_collisions(self, player):
        player_left_x = player.pos_x
        player_right_x = player.pos_x + player.width
        player_top_y = player.pos_y + player.width
        player_bottom_y = player.pos_y

        if ((self.pos_x < player_left_x) and (self.pos_y > player_top_y)
        and sqrt(pow(self.pos_x - player_left_x, 2) + pow(self.pos_y - player_top_y, 2)) < self.radius):
            # Top Left quadrant
            print("Top left collision")
            return True

        # left center quadrant
        if ((self.pos_x < player_left_x) and (self.pos_y < player_top_y)
        and (self.pos_y > player_bottom_y) and (player_left_x - self.pos_x) < self.radius):
            # Left Center quadrant
            print("Center left collision")
            return True

        if ((self.pos_x < player.pos_x) and (self.pos_y < player.pos_y)
        and sqrt(pow(self.pos_x - player_left_x,2) + pow(self.pos_y - player_bottom_y,2)) < self.radius):
            print("Bottom left collision")
            # Bottom Left quadrant
            return True

        if ((self.pos_x < player_right_x) and (self.pos_y > player_top_y)
        and sqrt(pow(self.pos_x - player_right_x, 2) + pow(self.pos_y - player_top_y, 2)) < self.radius):
            # Top Right quadrant
            print("Top right collision")
            return True

        # right center quadrant
        if ((self.pos_x < player_right_x) and (self.pos_y < player_top_y)
        and (self.pos_y > player_bottom_y) and (player_right_x - self.pos_x) < self.radius):
            # Right Center quadrant
            print("Center right collision")
            return True

        if ((self.pos_x < player.pos_x) and (self.pos_y < player.pos_y)
        and sqrt(pow(self.pos_x - player_right_x,2) + pow(self.pos_y - player_bottom_y,2)) < self.radius):
            print("Bottom right collision")
            # Bottom Right quadrant
            return True

        if ((self.pos_x > player_left_x and self.pos_x < player_right_x)
        and sqrt(pow(self.pos_y - player_top_y, 2)) < self.radius):
            print("Top center collision")
            # Top Center quadrant
            return True

        if ((self.pos_x > player_left_x and self.pos_x < player_right_x)
        and sqrt(pow(self.pos_y - player_bottom_y, 2)) < self.radius):
            print("Bottom center collision")
            # Top Center quadrant
            return True
        return False
