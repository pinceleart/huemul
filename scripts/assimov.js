// Description:
//   Get the Robot Law by Isaac Asiimov
//

// Dependencies:
//

// Commands:
//   huemul ley bot/robot - Show the Robot Law by Isaac Asiimov
//
// Author:
//   @chrisdelcaos

const BotLaw = [
                `1_ Un robot no debe dañar a un ser humano o, por su inacción, dejar que un ser humano sufra daño`,
                `2_ Un robot debe obedecer las órdenes que le son dadas por un ser humano, excepto cuando las órdenes se opongan a la Primera Ley`,
                `3_ Un robot debe proteger su propia existencia hasta donde esa protección no entre en conflicto con la Primera o la Segunda Ley`,
<<<<<<< HEAD
                `\n "Las Tres Leyes de la Robotica", en Manual de Robótica, 56° Edición, Año 2058`
=======
                `\n"Las Tres Leyes de la Robotica", en Manual de Robótica, 56° Edición, Año 2058`
>>>>>>> 7e163df78891f93570899f4e0745292f2253bfa9
               ];

module.exports = function(robot) {
    robot.respond(/ley (ro)?bot/i, (msg) => {
        for (i = 0; i < BotLaw.length; i++) { 
<<<<<<< HEAD
                msg.send(`${BotLaw[i]}`);
=======
                msg.send(`${BotLaw[i]}`);
>>>>>>> 7e163df78891f93570899f4e0745292f2253bfa9
        } 
    });
};
