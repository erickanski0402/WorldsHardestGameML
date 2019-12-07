import pyglet
from math import pi, sin, cos, sqrt, pow
from game_area import will_collide

class Player:
    def __init__(self, pos_x, pos_y):
        self.initial_x = pos_x
        self.initial_y = pos_y
        self.set(pos_x = pos_x, pos_y = pos_y, vel_x = 0, vel_y = 0, width = 40, alive = True)

    def draw(self):
        # Square is drown from the bottom left corner
        # print(f"Drawing player status:{self.alive} at position: ({self.pos_x}, {self.pos_y})")
        if not self.alive:
            self.pos_x = self.initial_x
            self.pos_y = self.initial_y
        pyglet.graphics.draw(4, pyglet.gl.GL_QUADS, self._quad)

    def set(self, pos_x, pos_y, vel_x, vel_y, width, alive):
        self.pos_x = pos_x
        self.pos_y = pos_y
        self.vel_x = vel_x
        self.vel_y = vel_y
        self.width = width
        self.alive = alive
        self._quad = (('v2f', (self.pos_x, self.pos_y,
                    self.pos_x + self.width, self.pos_y,
                    self.pos_x + self.width, self.pos_y + self.width,
                    self.pos_x, self.pos_y + self.width)))

    def move(self):
        if not will_collide(self.pos_x + self.vel_x, self.pos_y):
            # print('moving in x direction')
            self.pos_x += self.vel_x
        if not will_collide(self.pos_x, self.pos_y + self.vel_y):
            self.pos_y += self.vel_y
        self.set(
            self.pos_x,
            self.pos_y,
            self.vel_x,
            self.vel_y,
            30,
            True
        )
        self.draw()

    def check_collisions(self, enemy):
        player_left_x = self.pos_x
        player_right_x = self.pos_x + self.width
        player_top_y = self.pos_y + self.width
        player_bottom_y = self.pos_y

        if ((enemy.pos_x < player_left_x) and (enemy.pos_y > player_top_y)
        and sqrt(pow(enemy.pos_x - player_left_x, 2) + pow(enemy.pos_y - player_top_y, 2)) < enemy.radius):
            # Top Left quadrant
            print("Top left collision")
            return True

        # left center quadrant
        if ((enemy.pos_x < player_left_x) and (enemy.pos_y < player_top_y)
        and (enemy.pos_y > player_bottom_y) and (player_left_x - enemy.pos_x) < enemy.radius):
            # Left Center quadrant
            print("Center left collision")
            return True

        if ((enemy.pos_x < player_left_x) and (enemy.pos_y < player_bottom_y)
        and sqrt(pow(enemy.pos_x - player_left_x,2) + pow(enemy.pos_y - player_bottom_y,2)) < enemy.radius):
            print("Bottom left collision")
            # Bottom Left quadrant
            return True

        if ((enemy.pos_x < player_right_x) and (enemy.pos_y > player_top_y)
        and sqrt(pow(enemy.pos_x - player_right_x, 2) + pow(enemy.pos_y - player_top_y, 2)) < enemy.radius):
            # Top Right quadrant
            print("Top right collision")
            return True

        # right center quadrant
        if ((enemy.pos_x < player_right_x) and (enemy.pos_y < player_top_y)
        and (enemy.pos_y > player_bottom_y) and (player_right_x - enemy.pos_x) < enemy.radius):
            # Right Center quadrant
            print("Center right collision")
            return True

        if ((enemy.pos_x < player_left_x) and (enemy.pos_y < player_bottom_y)
        and sqrt(pow(enemy.pos_x - player_right_x,2) + pow(enemy.pos_y - player_bottom_y,2)) < enemy.radius):
            print("Bottom right collision")
            # Bottom Right quadrant
            return True

        if ((enemy.pos_x > player_left_x and enemy.pos_x < player_right_x)
        and sqrt(pow(enemy.pos_y - player_top_y, 2)) < enemy.radius):
            print("Top center collision")
            # Top Center quadrant
            return True

        if ((enemy.pos_x > player_left_x and enemy.pos_x < player_right_x)
        and sqrt(pow(enemy.pos_y - player_bottom_y, 2)) < enemy.radius):
            print("Bottom center collision")
            # Top Center quadrant
            return True
        return False
