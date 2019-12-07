from player import Player
from game_area import draw_game_area
from enemy import Enemy
from math import pi, sin, cos
import pyglet
import os
import neat

VELOCITY = 2
ZERO_VELOCITY = 0
UP_ARROW = 65362
DOWN_ARROW = 65364
LEFT_ARROW = 65361
RIGHT_ARROW = 65363
ARROW_KEYS = [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW]
POPULATION_SIZE = 10

def main(config_path):
    keys = []
    players = [Player(100, 300) for i in range(POPULATION_SIZE)]
    # player = Player(300,300)
    enemies = [
        Enemy(275, 175, 5, 0, 8),
        Enemy(725, 225, -5, 0, 8),
        Enemy(275, 275, 5, 0, 8),
        Enemy(725, 325, -5, 0, 8),
    ]
    window = pyglet.window.Window(height = 500, width = 1000)

    config = neat.config.Config(neat.DefaultGenome, neat.DefaultReproduction,
                                neat.DefaultSpeciesSet, neat.DefaultStagnation,
                                config_path)
    p = neat.Population(config)
    p.add_reporter(neat.StdOutReporter(True))
    stats = neat.StatisticsReporter()
    p.add_reporter(stats)
    # winner = p.run(fitnessFunction, 50)
###############################################################################
    def update(self):
        window.clear()
        draw_game_area()
        for enemy in enemies:
            enemy.move(None)

        for player in players:
            player.move()
            # print(f"For enemy at y position {enemies[0].pos_y}, Colliding: {enemies[0].check_collisions(player)}")
            for enemy in enemies:
                # enemy.move()
                # enemy.draw()
                player.alive = not player.check_collisions(enemy)

                if not player.alive:
                    print(f"Collision with enemy at {enemy.pos_y}")
                    player.set(player.initial_x, player.initial_y, 0, 0, 30, False)

    @window.event
    def on_key_press(button, modifiers):
        # print("Button value:", button)
        if button in ARROW_KEYS:
            keys.append(button)
            determine_movement_vector(players[0])

    @window.event
    def on_key_release(button, modifiers):
        # print("Button value:", button)
        if button in ARROW_KEYS:
            keys.remove(button)
            determine_movement_vector(players[0])

    # Could use a bit more work. Player cant move if more than 3 buttons are being pressed
    def determine_movement_vector(player):
        length = len(keys)
        if (UP_ARROW in keys) and (DOWN_ARROW not in keys):
            player.vel_y = VELOCITY
        elif (UP_ARROW not in keys) and (DOWN_ARROW in keys):
            player.vel_y = -VELOCITY
        else:
            player.vel_y = ZERO_VELOCITY

        if (LEFT_ARROW in keys) and (RIGHT_ARROW not in keys):
            player.vel_x = -VELOCITY
        elif (LEFT_ARROW not in keys) and (RIGHT_ARROW in keys):
            player.vel_x = VELOCITY
        else:
            player.vel_x = ZERO_VELOCITY

    def determine_movement_vector_v2(vector, player):
        if vector is 0:
            player.vel_x = ZERO_VELOCITY
            player.vel_y = ZERO_VELOCITY
        elif vector is 1:
            player.vel_x = ZERO_VELOCITY
            player.vel_y = VELOCITY
        elif vector is 2:
            player.vel_x = VELOCITY
            player.vel_y = VELOCITY
        elif vector is 3:
            player.vel_x = VELOCITY
            player.vel_y = ZERO_VELOCITY
        elif vector is 4:
            player.vel_x = VELOCITY
            player.vel_y = -VELOCITY
        elif vector is 5:
            player.vel_x = ZERO_VELOCITY
            player.vel_y = -VELOCITY
        elif vector is 6:
            player.vel_x = -VELOCITY
            player.vel_y = -VELOCITY
        elif vector is 7:
            player.vel_x = -VELOCITY
            player.vel_y = ZERO_VELOCITY
        elif vector is 8:
            player.vel_x = -VELOCITY
            player.vel_y = VELOCITY



    pyglet.clock.schedule_interval(update, 0.01)
    pyglet.app.run()

if __name__ == '__main__':
    local_dir = os.path.dirname(__file__)
    config_path = os.path.join(local_dir, "config-feedforward.txt")
    main(config_path)
