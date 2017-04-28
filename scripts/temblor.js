// Description:
//   Muestra los últimos temblores significativos en Chile.
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot temblores <Chile|Mundo>
//
// Author:
//   @jorgeepunan

module.exports = robot => {
  robot.respond(/temblores (.*)/i, res => {
    const url = 'https://earthquake.usgs.gov/fdsnws/event/1/';
    const country = (res.match[1]).trim().toUpperCase();
    const minMagnitude = 6; // Con un temblor menor a 6 grados ni me muevo de la silla menos de la cama asi q este es el mínimo.
    const fetch = robot.http(`${url}query?format=geojson&minmagnitude=${minMagnitude}`);

    fetch.get()((error, response, body) => {
      if (!error && response.statusCode === 200) {
        const {features: earthquakes} = JSON.parse(body);

        // Chile o el resto del mundo
        const earthquakesFilter = earthquakes.filter(({properties: {place}}) => {
          return (country.indexOf('CHILE') > -1) ? /chile/i.test(place) : !/chile/i.test(place);
        });

        const message = earthquakesFilter.map(({properties: {place, mag, time, title, url}}) => {
          return `${title}: \n- Lugar: ${place} \n- Magnitud: ${mag} (richter) \n- Fecha/Hora: ${new Date(time).toString()} \n- Enlace: ${url}`;
        }).join('\n\n');

        if (country === 'CHILE') {
          res.send(message || `Por suerte, ningún temblor mayor a ${minMagnitude} grados recientemente en Chile.`);
        } else {
          res.send(message || `Por suerte, ningún temblor mayor a ${minMagnitude} grados fuera de Chile.`);
        }
      } else {
        robot.emit('error', error);
      }
    });
  });
};
